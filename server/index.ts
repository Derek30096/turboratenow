import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
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
  // Only serve public directory (not dist/public in dev mode)
  app.use(express.static("public"));

  // EMERGENCY DOMAIN FIX: Direct routing for turboratenow.com
  app.use((req, res, next) => {
    const hostname = req.get('host') || req.hostname;
    console.log(`📡 REQUEST: ${req.method} ${req.path} [Host: ${hostname}]`);
    
    // If request is for turboratenow domains, serve the React app immediately
    if (hostname === 'turboratenow.com' || hostname === 'www.turboratenow.com' ||
        hostname === 'turboratenow.net' || hostname === 'www.turboratenow.net') {
      console.log(`🎯 DOMAIN MATCH: Serving React app for ${hostname}`);
      // Force headers for domain requests
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
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
