// Emergency domain connection script
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Force turboratenow.com to redirect to working Replit URL
app.use((req, res, next) => {
  const host = req.get('host');
  console.log(`Incoming request for: ${host}`);
  
  if (host === 'turboratenow.com' || host === 'www.turboratenow.com') {
    console.log('REDIRECTING DOMAIN TO WORKING URL');
    return res.redirect(301, 'https://cpa-bridge-booster-binghamderek.replit.app' + req.path);
  }
  next();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Domain redirect server running on port ${PORT}`);
});