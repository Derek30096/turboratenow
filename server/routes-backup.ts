import express, { Request, Response } from "express";
import { storage } from "./storage";

export const router = express.Router();

export function registerRoutes(app: express.Application) {
  // Simple request logging
  app.use((req, res, next) => {
    console.log(`📡 REQUEST: ${req.method} ${req.url}`);
    next();
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