import https from 'https';

console.log('=== TESTING DOMAIN STATUS ===');

// Test domain with detailed SSL info
const options = {
  hostname: 'turboratenow.net',
  port: 443,
  path: '/',
  method: 'GET',
  timeout: 15000,
  rejectUnauthorized: false, // Bypass SSL cert issues
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; DomainTest/1.0)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Cache-Control': 'no-cache'
  }
};

const req = https.request(options, (res) => {
  console.log(`✅ Status: ${res.statusCode}`);
  console.log(`✅ Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => data += chunk);
  
  res.on('end', () => {
    if (data.includes('React app') || data.includes('Most Drivers')) {
      console.log('🎯 SUCCESS: Domain serving your landing page!');
    } else if (res.statusCode === 200) {
      console.log('⚠️ Domain responds but content may be wrong');
      console.log('Preview:', data.substring(0, 300));
    } else {
      console.log('❌ Domain not working correctly');
    }
  });
});

req.on('error', (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log('🔧 This confirms SSL/routing issues');
});

req.on('timeout', () => {
  console.log('❌ Timeout - domain not responding');
  req.destroy();
});

req.end();