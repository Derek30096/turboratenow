#!/usr/bin/env node

// Simple production server for deployment
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

console.log('🚀 Production server starting...');

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Production server running',
    mode: 'production',
    time: new Date().toISOString()
  });
});

// API routes disabled
app.use('/api/*', (req, res) => {
  console.log(`API blocked: ${req.method} ${req.url}`);
  res.json({ 
    success: false, 
    disabled: true, 
    message: 'All tracking disabled to prevent billing charges' 
  });
});

// Check if build exists
const buildPath = path.join(__dirname, 'dist', 'public');
console.log(`📁 Checking for build at: ${buildPath}`);

if (fs.existsSync(buildPath)) {
  console.log('✅ Build directory found, serving production files');
  
  // Serve static files
  app.use(express.static(buildPath, {
    maxAge: 0,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }));
  
  // Serve React app for all routes
  app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    console.log(`🎯 Serving React app: ${req.path}`);
    res.sendFile(indexPath);
  });
  
} else {
  console.log('❌ Build directory not found');
  app.get('*', (req, res) => {
    res.status(500).json({
      error: 'Build not found',
      message: 'Run npm run build first',
      path: buildPath
    });
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌐 Ready to serve turboratenow.net`);
});