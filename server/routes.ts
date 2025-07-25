import express, { Request, Response } from "express";
import { storage } from "./storage";

export const router = express.Router();

export function registerRoutes(app: express.Application) {
  // DOMAIN FIX: Direct route handler for turboratenow.com
  app.get('/', (req, res, next) => {
    const hostname = req.get('host') || req.hostname;
    
    if (hostname === 'turboratenow.com' || hostname === 'www.turboratenow.com') {
      console.log(`🎯 SERVING DOMAIN: ${hostname} -> React App`);
      
      // Force no caching for domain requests
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // Let the static/Vite handler serve the React app
      next();
    } else {
      // Regular replit domain handling
      next();
    }
  });

  // Health check endpoint for Replit
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });
  
  // Completely disable all tracking API routes to prevent any billing charges
  app.use('/api/*', (req, res) => {
    console.log(`API call blocked: ${req.method} ${req.url}`);
    res.json({ success: false, disabled: true, message: 'All tracking disabled to prevent billing charges' });
  });
}