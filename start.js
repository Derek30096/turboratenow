// Simple production server
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});