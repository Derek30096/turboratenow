import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVisitorSchema, insertClickEventSchema, insertLeadSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analytics routes for CPA landing page tracking
  
  // Track visitor sessions
  app.post("/api/track/visitor", async (req, res) => {
    try {
      const visitorData = insertVisitorSchema.parse(req.body);
      const visitor = await storage.trackVisitor(visitorData);
      res.json({ success: true, visitor });
    } catch (error) {
      console.error("Error tracking visitor:", error);
      res.status(400).json({ error: "Invalid visitor data" });
    }
  });

  // Track CTA clicks
  app.post("/api/track/click", async (req, res) => {
    try {
      const clickData = insertClickEventSchema.parse(req.body);
      const click = await storage.trackClick(clickData);
      res.json({ success: true, click });
    } catch (error) {
      console.error("Error tracking click:", error);
      res.status(400).json({ error: "Invalid click data" });
    }
  });

  // Track lead conversions
  app.post("/api/track/lead", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.json({ success: true, lead });
    } catch (error) {
      console.error("Error tracking lead:", error);
      res.status(400).json({ error: "Invalid lead data" });
    }
  });

  // Get analytics dashboard data
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
