// Production deployment trigger
import { createAppServer } from './server/index.ts';

console.log('Starting production server for domain routing...');

async function startProduction() {
  try {
    const server = await createAppServer();
    const port = process.env.PORT || 5000;
    
    server.listen({
      port: parseInt(port, 10),
      host: "0.0.0.0"
    }, () => {
      console.log(`Production server running on port ${port}`);
      console.log('Ready for turboratenow.net domain routing');
      
      // Log any incoming domain requests
      setInterval(() => {
        console.log('Monitoring for domain connections...');
      }, 30000);
    });

    // Handle server errors
    server.on('error', (err) => {
      console.error('Production server error:', err);
    });
    
  } catch (error) {
    console.error('Failed to start production server:', error);
    process.exit(1);
  }
}

startProduction();