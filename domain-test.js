import https from 'https';

console.log('=== COMPREHENSIVE DOMAIN TEST ===');

function testDomain(url, description) {
  return new Promise((resolve) => {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`🌐 URL: ${url}`);
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 10000,
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DomainTest/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`📊 Status: ${res.statusCode}`);
      console.log(`📦 Content-Type: ${res.headers['content-type']}`);
      
      let data = '';
      res.on('data', (chunk) => data += chunk);
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          if (data.includes('Most Drivers Overpay') || data.includes('Auto Insurance')) {
            console.log('✅ SUCCESS: Landing page working!');
            console.log('🎯 Content preview:', data.substring(0, 100) + '...');
            resolve('SUCCESS');
          } else {
            console.log('⚠️ Page loads but wrong content');
            console.log('📄 Preview:', data.substring(0, 150));
            resolve('WRONG_CONTENT');
          }
        } else {
          console.log(`❌ HTTP Error: ${res.statusCode}`);
          resolve('HTTP_ERROR');
        }
      });
    });

    req.on('error', (err) => {
      console.log(`❌ Connection Error: ${err.message}`);
      resolve('CONNECTION_ERROR');
    });

    req.on('timeout', () => {
      console.log('❌ Timeout');
      req.destroy();
      resolve('TIMEOUT');
    });

    req.end();
  });
}

async function runTests() {
  const results = {};
  
  // Test different URLs
  results.domain = await testDomain('https://turboratenow.net/', 'Main domain');
  results.www = await testDomain('https://www.turboratenow.net/', 'WWW subdomain');
  results.index = await testDomain('https://turboratenow.net/index.html', 'Direct index.html');
  
  console.log('\n=== FINAL RESULTS ===');
  console.log('Main domain:', results.domain);
  console.log('WWW subdomain:', results.www);
  console.log('Direct index:', results.index);
  
  const working = Object.values(results).some(r => r === 'SUCCESS');
  if (working) {
    console.log('\n🎉 BREAKTHROUGH: Domain is working!');
    console.log('🚀 Your CPA landing page is live at turboratenow.net');
  } else {
    console.log('\n💔 Domain still not routing correctly');
    console.log('🔧 Replit routing infrastructure remains broken');
  }
}

runTests();