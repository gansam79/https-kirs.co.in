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
        'echo "Killing any active node processes to release file locks..."',
        'killall -9 node 2>/dev/null',
        'killall -9 next-router-worker 2>/dev/null',
        'sleep 1',
        'cd domains/kirs.co.in/public_html',
        'echo "Force cleaning up old backup directories and the broken .next folder..."',
        'rm -rf .next-old .next-old-2 .next-old-3 .next-old-4 .next-old-5 .next_new .next_prod_1784047500 .next_prod_1784047600 stagging.zip',
        'mv .next .next-old-delete 2>/dev/null',
        'rm -rf .next .next-old-delete public server.js package.json package-lock.json next.config.ts next.config.js',
        'echo "Unzipping deploy.zip into public_html..."',
        'unzip -o deploy.zip; echo "Unzip completed with status $?"',
        'echo "Fixing file and directory permissions recursively to 755 to prevent 500 Server Errors..."',
        'chmod -R 755 .next public server.js package.json next.config.ts',
        'echo "Cleaning up ZIP archive..."',
        'rm -f deploy.zip',
        'echo "Running npm install via Node 22..."',
        '/opt/alt/alt-nodejs22/root/usr/bin/npm install --production',
        'echo "Touch restart.txt to reload Passenger..."',
        'mkdir -p tmp && touch tmp/restart.txt',
        'echo "Deployment complete!"'
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
