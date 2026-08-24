const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const config = {
  host: '147.93.99.92',
  port: 65002,
  username: 'u686584126',
  password: 'KirsNode@24'
};

const localZipPath = path.join(__dirname, '../deploy.zip');
const remoteZipPath = 'domains/kirs.co.in/public_html/deploy.zip';

const conn = new Client();

console.log('Connecting to Hostinger SSH/SFTP server...');
conn.on('ready', () => {
  console.log('SSH Connection Successful!');
  
  // Start SFTP upload
  conn.sftp((err, sftp) => {
    if (err) {
      console.error('SFTP connection error:', err);
      conn.end();
      return;
    }
    
    console.log(`Uploading deploy.zip to ${remoteZipPath}...`);
    
    const readStream = fs.createReadStream(localZipPath);
    const writeStream = sftp.createWriteStream(remoteZipPath);
    
    writeStream.on('close', () => {
      console.log('SFTP Upload Finished successfully!');
      
      // Execute commands on remote server via SSH
      console.log('Executing deployment commands on the server...');
      
      const cmd = [
        'echo "Navigating to public_html..."',
        'cd domains/kirs.co.in/public_html',
        'echo "Cleaning up obsolete next files..."',
        'rm -rf .next .next-old* 2>/dev/null',
        'echo "Unzipping latest deploy.zip into public_html..."',
        'unzip -o deploy.zip; echo "Unzip finished with status $?"',
        'echo "Setting permissions..."',
        'chmod -R 755 . index.html .htaccess backend api 2>/dev/null',
        'echo "Cleaning up deploy.zip on remote..."',
        'rm -f deploy.zip',
        'echo "Installing/verifying backend dependencies..."',
        'if [ -d "backend" ]; then cd backend && (/opt/alt/alt-nodejs22/root/usr/bin/npm install --production || npm install --production) && cd ..; fi',
        'echo "Touching restart.txt for Passenger reload..."',
        'mkdir -p tmp backend/tmp && touch tmp/restart.txt backend/tmp/restart.txt',
        'echo "Deployment completed successfully!"'
      ].join('; ');
      
      conn.exec(cmd, (err, stream) => {
        if (err) {
          console.error('SSH execution error:', err);
          conn.end();
          return;
        }
        
        stream.on('close', (code, signal) => {
          console.log(`SSH commands closed with code: ${code}`);
          conn.end();
        }).on('data', (data) => {
          process.stdout.write(data.toString());
        }).stderr.on('data', (data) => {
          process.stderr.write(data.toString());
        });
      });
      
    });
    
    writeStream.on('error', (err) => {
      console.error('SFTP write error:', err);
      conn.end();
    });
    
    readStream.pipe(writeStream);
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect(config);
