// Force domain check script
const https = require('https');

console.log('Testing turboratenow.net connection...');

const options = {
  hostname: 'turboratenow.net',
  port: 443,
  path: '/',
  method: 'GET',
  timeout: 5000,
  headers: {
    'User-Agent': 'Domain-Test-Script',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  },
  // Allow self-signed certificates during verification
  rejectUnauthorized: false
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, JSON.stringify(res.headers, null, 2));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('First 200 chars:', data.substring(0, 200));
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.on('timeout', () => {
  console.error('Request timeout');
  req.destroy();
});

req.setTimeout(5000);
req.end();