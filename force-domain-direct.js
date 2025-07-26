// Force direct domain routing bypass
import https from 'https';
import http from 'http';

console.log('=== FORCING DOMAIN BYPASS ===');

// Test if we can force the domain connection
async function testDomainBypass() {
  console.log('1. Testing turboratenow.net direct connection...');
  
  const options = {
    hostname: 'turboratenow.net',
    port: 443,
    path: '/',
    method: 'GET',
    timeout: 10000,
    headers: {
      'User-Agent': 'Domain-Test-Bypass/1.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`✅ HTTPS Status: ${res.statusCode}`);
      console.log(`✅ Headers: ${JSON.stringify(res.headers, null, 2)}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (data.includes('React app rendered successfully') || data.includes('Most Drivers Overpay')) {
          console.log('🎯 SUCCESS: Domain is serving your landing page!');
          resolve('WORKING');
        } else if (res.statusCode === 200) {
          console.log('⚠️ Domain responds but may not be serving correct content');
          console.log('Response preview:', data.substring(0, 200));
          resolve('PARTIAL');
        } else {
          console.log('❌ Domain not serving landing page correctly');
          resolve('FAILED');
        }
      });
    });

    req.on('error', (err) => {
      console.log(`❌ HTTPS Error: ${err.message}`);
      resolve('ERROR');
    });

    req.on('timeout', () => {
      console.log('❌ HTTPS Timeout');
      req.destroy();
      resolve('TIMEOUT');
    });

    req.end();
  });
}

// Test the domain status
testDomainBypass().then(result => {
  console.log(`\n=== RESULT: ${result} ===`);
  
  if (result === 'WORKING') {
    console.log('🚀 BREAKTHROUGH: Your domain is actually working!');
    console.log('🎯 Update your affiliate campaigns to use: https://turboratenow.net');
    console.log('📧 Document this success and demand Replit billing credits');
  } else {
    console.log('💔 Domain still not working after 3 days');
    console.log('⚖️ Time for escalation beyond Replit support');
    console.log('🔥 Consider legal action for service breach');
  }
});