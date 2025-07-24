// Production server with full functionality
import { createAppServer } from './dist/index.js';

const port = process.env.PORT || 5000;

createAppServer().then(server => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`Production server running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to start production server:', error);
  process.exit(1);
});