#!/usr/bin/env node

// Simple production server script to test deployment
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from dist/public
app.use(express.static(path.join(__dirname, 'dist/public'), {
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Production server running' });
});

// Disable API routes
app.use('/api/*', (req, res) => {
  res.json({ success: false, disabled: true, message: 'All tracking disabled' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
});