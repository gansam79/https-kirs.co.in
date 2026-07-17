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
function copyDir(src, dest, excludePattern) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (srcPath) => {
      if (excludePattern && (srcPath.includes(excludePattern) || srcPath.replace(/\\/g, '/').includes(excludePattern))) {
        return false;
      }
      return true;
    }
  });
}

// Copy .next folder (exclude cache)
const nextSrc = path.join(rootDir, '.next');
const nextDest = path.join(deployDir, '.next');
if (fs.existsSync(nextSrc)) {
  console.log('Copying .next...');
  copyDir(nextSrc, nextDest, '.next/cache');
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

// Copy files
const filesToCopy = [
  'server.js',
  'package.json',
  'package-lock.json',
  'next.config.js',
  '.env'
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

console.log('Copy step completed successfully!');
