import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from dist/public
app.use(express.static(join(__dirname, 'dist/public')));

// Basic API endpoint for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/public/index.html'));
});

const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen({
  port,
  host: '0.0.0.0',
}, () => {
  console.log(`Production server running on port ${port}`);
});