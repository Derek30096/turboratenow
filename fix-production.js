#!/usr/bin/env node

// Quick fix for production deployment - serve the built files correctly
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

console.log('Starting production server...');
console.log('Serving from:', path.join(__dirname, 'dist/public'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Production server running', mode: 'production' });
});

// Disable API routes
app.use('/api/*', (req, res) => {
  console.log(`API call blocked: ${req.method} ${req.url}`);
  res.json({ success: false, disabled: true, message: 'All tracking disabled' });
});

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public'), {
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Serve React app for all other routes
app.get('*', (req, res) => {
  console.log(`Serving React app for: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Production server running on port ${port}`);
  console.log(`🎯 turboratenow.net should now serve the React app correctly`);
});