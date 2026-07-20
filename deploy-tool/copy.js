const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const deployDir = path.join(rootDir, 'deploy');

console.log('Cleaning up deploy folder...');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir);

console.log('Copying files for deployment...');

// Helper to copy with filter
function copyDir(src, dest) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (srcPath) => {
      const normalizedPath = srcPath.replace(/\\/g, '/');
      // Exclude development dev folder and cache folders at any level
      if (
        normalizedPath.includes('/cache/') || 
        normalizedPath.endsWith('/cache') ||
        normalizedPath.includes('/dev/') || 
        normalizedPath.endsWith('/dev')
      ) {
        return false;
      }
      return true;
    }
  });
}

// Copy .next folder (exclude cache and dev)
const nextSrc = path.join(rootDir, '.next');
const nextDest = path.join(deployDir, '.next');
if (fs.existsSync(nextSrc)) {
  console.log('Copying .next...');
  copyDir(nextSrc, nextDest);
} else {
  console.error('Error: .next folder not found! Run next build first.');
  process.exit(1);
}

// Copy public folder
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(deployDir, 'public');
if (fs.existsSync(publicSrc)) {
  console.log('Copying public...');
  copyDir(publicSrc, publicDest);
}

// Copy .next/static to public/_next/static for Passenger static file serving
const nextStaticSrc = path.join(rootDir, '.next', 'static');
const nextStaticDest = path.join(deployDir, 'public', '_next', 'static');
if (fs.existsSync(nextStaticSrc)) {
  console.log('Copying .next/static to public/_next/static...');
  if (!fs.existsSync(path.join(deployDir, 'public', '_next'))) {
    fs.mkdirSync(path.join(deployDir, 'public', '_next'), { recursive: true });
  }
  copyDir(nextStaticSrc, nextStaticDest);
}

// Copy files
const filesToCopy = [
  'server.js',
  'package.json',
  'package-lock.json',
  'next.config.js',
  '.env',
  '.htaccess'
];

filesToCopy.forEach(file => {
  const srcPath = path.join(rootDir, file);
  const destPath = path.join(deployDir, file);
  if (fs.existsSync(srcPath)) {
    console.log(`Copying ${file}...`);
    fs.copyFileSync(srcPath, destPath);
  } else {
    console.log(`Warning: ${file} not found locally.`);
  }
});

// Create tmp folder and restart.txt inside deploy folder to auto-restart Passenger on extraction
const tmpDest = path.join(deployDir, 'tmp');
if (!fs.existsSync(tmpDest)) {
  fs.mkdirSync(tmpDest);
}
fs.writeFileSync(path.join(tmpDest, 'restart.txt'), 'restart');
console.log('Created tmp/restart.txt inside deploy folder.');

console.log('Copy step completed successfully!');
