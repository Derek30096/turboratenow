// Simple domain connectivity test
import https from 'https';
import http from 'http';

async function testDomain() {
  console.log('=== Testing turboratenow.net Domain ===\n');
  
  // Test HTTPS
  console.log('1. Testing HTTPS connection...');
  try {
    await new Promise((resolve, reject) => {
      const req = https.get('https://turboratenow.net/', {
        timeout: 8000,
        rejectUnauthorized: false
      }, (res) => {
        console.log(`   ✅ HTTPS Status: ${res.statusCode}`);
        console.log(`   ✅ SSL Certificate: Working`);
        resolve(true);
      });
      
      req.on('error', (e) => {
        console.log(`   ❌ HTTPS Error: ${e.message}`);
        resolve(false);
      });
      
      req.on('timeout', () => {
        console.log(`   ❌ HTTPS Timeout`);
        req.destroy();
        resolve(false);
      });
    });
  } catch (e) {
    console.log(`   ❌ HTTPS Exception: ${e.message}`);
  }
  
  // Test HTTP
  console.log('\n2. Testing HTTP connection...');
  try {
    await new Promise((resolve, reject) => {
      const req = http.get('http://turboratenow.net/', {
        timeout: 8000
      }, (res) => {
        console.log(`   ✅ HTTP Status: ${res.statusCode}`);
        console.log(`   ✅ Location: ${res.headers.location || 'none'}`);
        resolve(true);
      });
      
      req.on('error', (e) => {
        console.log(`   ❌ HTTP Error: ${e.message}`);
        resolve(false);
      });
      
      req.on('timeout', () => {
        console.log(`   ❌ HTTP Timeout`);
        req.destroy();
        resolve(false);
      });
    });
  } catch (e) {
    console.log(`   ❌ HTTP Exception: ${e.message}`);
  }
  
  console.log('\n=== Summary ===');
  console.log('If both tests fail: DNS/routing issue');
  console.log('If HTTPS fails but HTTP works: SSL issue');  
  console.log('If both work: Domain should be functional');
}

testDomain();