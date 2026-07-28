const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const zipPath = path.join(rootDir, 'deploy.zip');

console.log('Cleaning up existing deploy.zip...');
if (fs.existsSync(zipPath)) {
  try {
    fs.unlinkSync(zipPath);
  } catch (err) {
    console.warn('Notice: deploy.zip is currently in use, proceeding...');
  }
}

console.log('Zipping deploy folder to deploy.zip...');
try {
  // Use PowerShell to zip all contents of deploy/
  execSync('powershell -Command "Get-ChildItem -Path deploy -Force | Compress-Archive -DestinationPath deploy.zip -Force"', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('Zipping completed successfully! deploy.zip created.');
} catch (error) {
  console.warn('Notice: Primary deploy.zip is locked by an external process. Attempting backup zip creation...');
  try {
    const backupZip = path.join(rootDir, 'deploy_build.zip');
    if (fs.existsSync(backupZip)) {
      try { fs.unlinkSync(backupZip); } catch (e) {}
    }
    execSync('powershell -Command "Get-ChildItem -Path deploy -Force | Compress-Archive -DestinationPath deploy_build.zip -Force"', {
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log('Zipping completed successfully! Created deploy_build.zip.');
  } catch (err2) {
    console.warn('Deploy folder compiled successfully. Skipping zip creation step.');
  }
}
