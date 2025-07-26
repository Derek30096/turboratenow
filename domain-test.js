// Test domain connectivity
const https = require('https');
const http = require('http');

console.log('Testing turboratenow.net connectivity...');

// Test HTTP
const httpOptions = {
  hostname: 'turboratenow.net',
  port: 80,
  path: '/',
  method: 'GET',
  headers: {
    'Host': 'turboratenow.net',
    'User-Agent': 'Domain-Test/1.0'
  }
};

console.log('Testing HTTP...');
const httpReq = http.request(httpOptions, (res) => {
  console.log(`HTTP Status: ${res.statusCode}`);
  console.log(`HTTP Headers:`, res.headers);
  res.on('data', (chunk) => {
    console.log(`HTTP Body: ${chunk.toString().substring(0, 100)}...`);
  });
});

httpReq.on('error', (err) => {
  console.log(`HTTP Error: ${err.message}`);
});

httpReq.end();

// Test HTTPS
setTimeout(() => {
  console.log('\nTesting HTTPS...');
  const httpsOptions = {
    hostname: 'turboratenow.net',
    port: 443,
    path: '/',
    method: 'GET',
    rejectUnauthorized: false,
    headers: {
      'Host': 'turboratenow.net',
      'User-Agent': 'Domain-Test/1.0'
    }
  };

  const httpsReq = https.request(httpsOptions, (res) => {
    console.log(`HTTPS Status: ${res.statusCode}`);
    console.log(`HTTPS Headers:`, res.headers);
    res.on('data', (chunk) => {
      console.log(`HTTPS Body: ${chunk.toString().substring(0, 100)}...`);
    });
  });

  httpsReq.on('error', (err) => {
    console.log(`HTTPS Error: ${err.message}`);
  });

  httpsReq.end();
}, 2000);