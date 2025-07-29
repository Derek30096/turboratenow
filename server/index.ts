import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logging for API calls only
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    console.log(`📡 API: ${req.method} ${req.path}`);
  }
  next();
});

export async function createAppServer() {
  await registerRoutes(app);
  
  const server = createServer(app);

  // Check if we should serve production build for domain
  const shouldServeProduction = process.env.NODE_ENV === "production" || process.env.SERVE_PRODUCTION === "true";
  
  // For production, check if dist/public exists and serve it
  if (shouldServeProduction) {
    console.log("🚀 Starting production mode");
    
    // Import required modules for production
    const fs = await import("fs");
    const path = await import("path");
    
    const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
    console.log(`📁 Looking for build files at: ${distPath}`);
    
    if (fs.existsSync(distPath)) {
      console.log("✅ Found build directory, serving static files");
      
      // Serve static files
      app.use(express.static(distPath, {
        maxAge: 0,
        setHeaders: (res) => {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }));
      
      // Serve React app for all other routes
      app.use("*", (_req, res) => {
        console.log(`🎯 Serving React app from: ${path.resolve(distPath, "index.html")}`);
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    } else {
      console.log("❌ Build directory not found, falling back to development mode");
      await setupVite(app, server);
    }
  } else {
    console.log("🔧 Starting development mode");
    await setupVite(app, server);
  }

  return server;
}

// Start server (both development and production)
(async () => {
  const server = await createAppServer();
  const port = parseInt(process.env.PORT || '5000', 10);
  
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();
