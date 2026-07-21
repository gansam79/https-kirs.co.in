const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const deployDir = path.join(rootDir, 'deploy');

console.log('Cleaning up deploy folder...');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir);

console.log('Copying static React SPA build files from dist/...');

// Helper to copy recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (source) => !source.includes('node_modules') && !source.includes('.git'),
  });
}

// Copy Vite static build output (dist/*) directly into deploy root
const distSrc = path.join(rootDir, 'dist');
if (fs.existsSync(distSrc)) {
  console.log('Copying dist/ to deploy/...');
  copyDir(distSrc, deployDir);
} else {
  console.error('Error: dist folder not found! Run vite build first.');
  process.exit(1);
}

// Copy backend folder with production node_modules
const backendSrc = path.join(rootDir, 'backend');
const backendDest = path.join(deployDir, 'backend');
if (fs.existsSync(backendSrc)) {
  console.log('Copying backend folder & dependencies to deploy/backend...');
  fs.cpSync(backendSrc, backendDest, {
    recursive: true,
    filter: (source) => !source.includes('.git') && !source.includes('@types') && !source.endsWith('.d.ts'),
  });
}

// Copy .htaccess
const htaccessSrc = path.join(rootDir, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  console.log('Copying .htaccess...');
  fs.copyFileSync(htaccessSrc, path.join(deployDir, '.htaccess'));
}

// Create tmp/restart.txt inside deploy & backend folders for Passenger auto-restart
const tmpDest = path.join(deployDir, 'tmp');
if (!fs.existsSync(tmpDest)) fs.mkdirSync(tmpDest);
fs.writeFileSync(path.join(tmpDest, 'restart.txt'), 'restart');

const backendTmpDest = path.join(backendDest, 'tmp');
if (!fs.existsSync(backendTmpDest)) fs.mkdirSync(backendTmpDest);
fs.writeFileSync(path.join(backendTmpDest, 'restart.txt'), 'restart');
console.log('Created tmp/restart.txt inside deploy & backend folders.');

console.log('React SPA deployment copy step completed successfully!');

// Run zipping
require('./zip.js');
