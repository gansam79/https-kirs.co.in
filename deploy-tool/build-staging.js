const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const deployStagingDir = path.join(rootDir, 'deploy_staging');
const zipStagingPath = path.join(rootDir, 'deploy_staging.zip');

console.log('--- STARTING STAGING BUILD FOR https://kirs.co.in/stagging/ ---');

// 1. Clean previous staging deploy folder & zip
if (fs.existsSync(deployStagingDir)) {
  fs.rmSync(deployStagingDir, { recursive: true, force: true });
}
fs.mkdirSync(deployStagingDir);

if (fs.existsSync(zipStagingPath)) {
  fs.unlinkSync(zipStagingPath);
}

// 2. Build Vite with VITE_BASE_PATH=/stagging/
console.log('Building Vite React SPA for base path /stagging/...');
execSync('npx vite build', {
  cwd: rootDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    VITE_BASE_PATH: '/stagging/'
  }
});

// 3. Copy static build files from dist/ to deploy_staging/
console.log('Copying dist/ to deploy_staging/...');
const distSrc = path.join(rootDir, 'dist');
if (fs.existsSync(distSrc)) {
  fs.cpSync(distSrc, deployStagingDir, { recursive: true });
} else {
  console.error('Error: dist folder not found after build!');
  process.exit(1);
}

// 4. Copy backend folder with Node dependencies
const backendSrc = path.join(rootDir, 'backend');
const backendDest = path.join(deployStagingDir, 'backend');
if (fs.existsSync(backendSrc)) {
  console.log('Copying backend folder to deploy_staging/backend...');
  fs.cpSync(backendSrc, backendDest, {
    recursive: true,
    filter: (source) => !source.includes('.git') && !source.includes('@types') && !source.endsWith('.d.ts'),
  });
}

// 5. Generate tailored .htaccess for Hostinger /public_html/stagging/
const htaccessContent = `# Apache Configuration for Staging (https://kirs.co.in/stagging/)
<IfModule mod_headers.c>
  <FilesMatch "^index\\.html$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /stagging/

  # Direct access to physical static files (JS, CSS, images, icons)
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Exclude API routes if proxied to backend
  RewriteCond %{REQUEST_URI} ^/api [NC,OR]
  RewriteCond %{REQUEST_URI} ^/stagging/api [NC]
  RewriteRule ^ - [L]

  # Route all React SPA client-side paths to /stagging/index.html
  RewriteRule ^ index.html [L]
</IfModule>
`;

fs.writeFileSync(path.join(deployStagingDir, '.htaccess'), htaccessContent);
console.log('Created tailored .htaccess for /stagging/ directory.');

// 6. Create Passenger restart.txt trigger files
const tmpDest = path.join(deployStagingDir, 'tmp');
if (!fs.existsSync(tmpDest)) fs.mkdirSync(tmpDest);
fs.writeFileSync(path.join(tmpDest, 'restart.txt'), 'restart');

const backendTmpDest = path.join(backendDest, 'tmp');
if (!fs.existsSync(backendTmpDest)) fs.mkdirSync(backendTmpDest);
fs.writeFileSync(path.join(backendTmpDest, 'restart.txt'), 'restart');

// 7. Pause briefly to ensure OS file handles are released before zipping
execSync('powershell -Command "Start-Sleep -Milliseconds 1000"', { cwd: rootDir });

// 8. Zip deploy_staging folder to deploy_staging.zip
console.log('Compressing deploy_staging to deploy_staging.zip...');
try {
  execSync('powershell -Command "Get-ChildItem -Path deploy_staging -Force | Compress-Archive -DestinationPath deploy_staging.zip -Force"', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('SUCCESS! deploy_staging.zip created successfully for staging environment.');
} catch (zipErr) {
  console.error('Zipping failed:', zipErr);
  process.exit(1);
}
