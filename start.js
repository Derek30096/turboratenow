// Production server with full functionality
process.env.NODE_ENV = 'production';

import { createAppServer } from './dist/index.js';

const port = process.env.PORT || 5000;

console.log('Starting production server...');

createAppServer().then(server => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`✓ Production server running on port ${port}`);
    console.log(`✓ Champion Auto Insurance Landing Page deployed`);
    console.log(`✓ TrackPro Analytics available at /admin/dashboard`);
  });
}).catch(error => {
  console.error('Failed to start production server:', error);
  process.exit(1);
});