const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const zipPath = path.join(rootDir, 'deploy.zip');

console.log('Cleaning up existing deploy.zip...');
if (fs.existsSync(zipPath)) {
  try {
    fs.unlinkSync(zipPath);
  } catch (e) {
    console.warn('Notice: Existing deploy.zip was locked, Compress-Archive will overwrite.');
  }
}

console.log('Zipping deploy folder to deploy.zip...');
try {
  // Use PowerShell to zip all contents of deploy/ including hidden files like .next and .env
  execSync('powershell -Command "Get-ChildItem -Path deploy -Force | Compress-Archive -DestinationPath deploy.zip -Force"', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('Zipping completed successfully! deploy.zip created.');
} catch (error) {
  console.error('Error zipping deploy folder:', error);
  process.exit(1);
}
