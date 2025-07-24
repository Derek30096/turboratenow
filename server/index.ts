import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

export async function createAppServer() {
  // ENHANCED DOMAIN ROUTING with logging for better debugging
  app.use((req, res, next) => {
    console.log(`📡 REQUEST: ${req.hostname} ${req.method} ${req.path} from ${req.ip} at ${new Date().toISOString()}`);
    
    const host = req.header('host') || req.hostname;
    if (host === 'turboratenow.com' || host === 'www.turboratenow.com' || host?.includes('turboratenow')) {
      console.log(`🌟 DOMAIN DIRECT: ${host} ${req.url}`);
      res.setHeader('Content-Type', 'text/html');
      return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Auto Insurance - Get Your Free Quote Now</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: white; color: black; line-height: 1.6; min-height: 100vh; }
        .container { max-width: 800px; margin: 0 auto; padding: 60px 20px; text-align: center; }
        .urgent { background: linear-gradient(135deg, #ff6b6b, #ff8e8e); color: white; padding: 15px; margin-bottom: 40px; border-radius: 8px; font-weight: bold; font-size: 16px; }
        h1 { color: #007BFF; font-size: 42px; margin-bottom: 20px; font-weight: bold; }
        .subtitle { font-size: 20px; color: #666; margin-bottom: 40px; }
        .cta-button { background: linear-gradient(135deg, #007BFF, #0056b3); color: white; padding: 18px 40px; font-size: 20px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; margin: 10px; transition: transform 0.2s; }
        .cta-button:hover { transform: translateY(-2px); }
        .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 60px 0; }
        .benefit { padding: 30px; background: #f8f9fa; border-radius: 8px; }
        .benefit h3 { color: #007BFF; margin-bottom: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="urgent">🚨 LIMITED TIME: Insurance Rates Going Up - Compare NOW! 🚨</div>
        <h1>Champion Auto Insurance</h1>
        <p class="subtitle">Save Up to 40% on Your Auto Insurance - Get Your Free Quote in 2 Minutes!</p>
        <a href="https://www.maxbounty.com/tracking/cd.php?link_id=100225" class="cta-button">Get Free Quote Now</a>
        <div class="benefits">
            <div class="benefit">
                <h3>💰 Save Up To 40%</h3>
                <p>Compare rates from top insurance companies and save hundreds on your premium.</p>
            </div>
            <div class="benefit">
                <h3>⚡ Quick & Easy</h3>
                <p>Get your personalized quote in just 2 minutes with our simple online form.</p>
            </div>
            <div class="benefit">
                <h3>🛡️ Trusted Protection</h3>
                <p>Choose from America's most trusted insurance providers with A+ ratings.</p>
            </div>
        </div>
        <a href="https://www.maxbounty.com/tracking/cd.php?link_id=100225" class="cta-button">Start Saving Today</a>
    </div>
</body>
</html>`);
    }
    next();
  });

  await registerRoutes(app);
  
  const server = createServer(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Move error handler AFTER all routes including static files
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error('Server error:', err);
    res.status(status).json({ message });
    // DON'T throw - just log
  });

  return server;
}

// Start server (both development and production)
(async () => {
  const server = await createAppServer();
  const port = parseInt(process.env.PORT || '5000', 10);
  
  // Handle port in use error
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}`);
      server.listen({
        port: port + 1,
        host: "0.0.0.0",
      }, () => {
        log(`serving on port ${port + 1}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
  
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
