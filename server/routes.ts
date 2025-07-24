import express, { Request, Response } from "express";
import { storage } from "./storage";
import { 
  insertVisitorSchema, 
  insertClickEventSchema, 
  insertLeadSchema,
  insertCampaignSchema,
  insertPageEventSchema,
  insertConversionFunnelSchema
} from "@shared/schema";

export const router = express.Router();

export function registerRoutes(app: express.Application) {
  // Health check endpoint for Replit
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });
  
  app.use('/api', router);
}

// Enhanced visitor tracking with device detection and geo data
router.post("/track/visitor", async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).sessionID || `session_${Date.now()}_${Math.random()}`;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    
    // Extract device info from user agent
    const deviceType = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'mobile' : 
                      /iPad/.test(userAgent) ? 'tablet' : 'desktop';
    
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Unknown';
    
    const os = userAgent.includes('Windows') ? 'Windows' :
              userAgent.includes('Mac') ? 'macOS' :
              userAgent.includes('Linux') ? 'Linux' :
              userAgent.includes('Android') ? 'Android' :
              userAgent.includes('iOS') ? 'iOS' : 'Unknown';

    // Extract UTM parameters
    const utmSource = req.query.utm_source as string;
    const utmMedium = req.query.utm_medium as string;
    const utmCampaign = req.query.utm_campaign as string;
    const utmTerm = req.query.utm_term as string;
    const utmContent = req.query.utm_content as string;

    const visitorData = {
      sessionId,
      ipAddress: ip,
      userAgent,
      referrer: req.headers.referer || req.headers.referrer || null,
      landingPage: req.body.landingPage || req.url,
      deviceType,
      browser,
      os,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      // Geo data would be populated by a GeoIP service in production
      country: 'Unknown', // Would be populated by GeoIP lookup
      region: 'Unknown',
      city: 'Unknown',
      campaignId: req.body.campaignId || null
    };

    const validatedData = insertVisitorSchema.parse(visitorData);
    const visitor = await storage.trackVisitor(validatedData);

    // Track conversion funnel step 1 (landing)
    await storage.trackConversionFunnel({
      visitorId: visitor.id,
      sessionId,
      step: 1,
      stepName: 'Landing Page View'
    });

    res.json({ success: true, visitor });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(400).json({ error: 'Failed to track visitor' });
  }
});

// Enhanced CTA click tracking with coordinates and timing
router.post("/track/cta-click", async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).sessionID || req.body.sessionId;
    const startTime = Date.now();
    
    const clickData = {
      visitorId: req.body.visitorId,
      sessionId,
      ctaType: req.body.ctaType,
      ctaText: req.body.ctaText,
      elementId: req.body.elementId || null,
      pageUrl: req.body.pageUrl || req.headers.referer || '',
      xPosition: req.body.xPosition || null,
      yPosition: req.body.yPosition || null,
      timeOnPage: req.body.timeOnPage || 0
    };

    const validatedData = insertClickEventSchema.parse(clickData);
    const clickEvent = await storage.trackCTAClick(validatedData);

    // Track conversion funnel step 2 (CTA click)
    await storage.trackConversionFunnel({
      visitorId: req.body.visitorId,
      sessionId,
      step: 2,
      stepName: 'CTA Click'
    });

    res.json({ success: true, clickEvent });
  } catch (error) {
    console.error('Error tracking CTA click:', error);
    res.status(400).json({ error: 'Failed to track CTA click' });
  }
});

// Enhanced lead tracking with affiliate network data
router.post("/track/lead", async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).sessionID || req.body.sessionId;
    
    const leadData = {
      visitorId: req.body.visitorId,
      sessionId,
      email: req.body.email || null,
      zipCode: req.body.zipCode || null,
      converted: true,
      conversionValue: req.body.conversionValue || "25.00", // Default CPA payout
      conversionType: req.body.conversionType || 'click',
      affiliateNetwork: req.body.affiliateNetwork || 'MaxBounty',
      payout: req.body.payout || "25.00"
    };

    const validatedData = insertLeadSchema.parse(leadData);
    const lead = await storage.trackLead(validatedData);

    // Track conversion funnel step 4 (conversion)
    await storage.trackConversionFunnel({
      visitorId: req.body.visitorId,
      sessionId,
      step: 4,
      stepName: 'Conversion'
    });

    res.json({ success: true, lead });
  } catch (error) {
    console.error('Error tracking lead:', error);
    res.status(400).json({ error: 'Failed to track lead' });
  }
});

// Page event tracking for detailed user journey
router.post("/track/page-event", async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).sessionID || req.body.sessionId;
    
    const eventData = {
      visitorId: req.body.visitorId,
      sessionId,
      eventType: req.body.eventType, // scroll, hover, exit, etc.
      page: req.body.page || req.headers.referer || '',
      element: req.body.element || null,
      data: req.body.data || null
    };

    const validatedData = insertPageEventSchema.parse(eventData);
    const pageEvent = await storage.trackPageEvent(validatedData);

    res.json({ success: true, pageEvent });
  } catch (error) {
    console.error('Error tracking page event:', error);
    res.status(400).json({ error: 'Failed to track page event' });
  }
});

// Campaign management endpoints
router.post("/campaigns", async (req: Request, res: Response) => {
  try {
    const campaignData = insertCampaignSchema.parse(req.body);
    const campaign = await storage.createCampaign(campaignData);
    res.json({ success: true, campaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(400).json({ error: 'Failed to create campaign' });
  }
});

router.get("/campaigns", async (req: Request, res: Response) => {
  try {
    const campaigns = await storage.getCampaigns();
    res.json({ success: true, campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

router.get("/campaigns/:id", async (req: Request, res: Response) => {
  try {
    const campaignId = parseInt(req.params.id);
    const campaign = await storage.getCampaign(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json({ success: true, campaign });
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

router.put("/campaigns/:id", async (req: Request, res: Response) => {
  try {
    const campaignId = parseInt(req.params.id);
    const updates = req.body;
    const campaign = await storage.updateCampaign(campaignId, updates);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json({ success: true, campaign });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(400).json({ error: 'Failed to update campaign' });
  }
});

// Advanced analytics endpoints
router.get("/analytics/overview", async (req: Request, res: Response) => {
  try {
    const dateFrom = req.query.dateFrom ? new Date(req.query.dateFrom as string) : undefined;
    const dateTo = req.query.dateTo ? new Date(req.query.dateTo as string) : undefined;
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;

    const stats = await storage.getVisitorStats(dateFrom, dateTo, campaignId);
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching overview analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

router.get("/analytics/campaigns/:id", async (req: Request, res: Response) => {
  try {
    const campaignId = parseInt(req.params.id);
    const stats = await storage.getCampaignStats(campaignId);
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching campaign analytics:', error);
    res.status(500).json({ error: 'Failed to fetch campaign analytics' });
  }
});

router.get("/analytics/funnel", async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    const funnel = await storage.getConversionFunnel(campaignId);
    res.json({ success: true, funnel });
  } catch (error) {
    console.error('Error fetching conversion funnel:', error);
    res.status(500).json({ error: 'Failed to fetch conversion funnel' });
  }
});

router.get("/analytics/visitors", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    
    const visitors = await storage.getRecentVisitors(limit, campaignId);
    res.json({ success: true, visitors });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

router.get("/analytics/ctas", async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    const ctas = await storage.getTopCTAs(campaignId);
    res.json({ success: true, ctas });
  } catch (error) {
    console.error('Error fetching CTA analytics:', error);
    res.status(500).json({ error: 'Failed to fetch CTA analytics' });
  }
});

router.get("/analytics/geo", async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    const geoData = await storage.getGeoData(campaignId);
    res.json({ success: true, geoData });
  } catch (error) {
    console.error('Error fetching geo analytics:', error);
    res.status(500).json({ error: 'Failed to fetch geo analytics' });
  }
});

router.get("/analytics/devices", async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    const deviceData = await storage.getDeviceData(campaignId);
    res.json({ success: true, deviceData });
  } catch (error) {
    console.error('Error fetching device analytics:', error);
    res.status(500).json({ error: 'Failed to fetch device analytics' });
  }
});

router.get("/analytics/hourly", async (req: Request, res: Response) => {
  try {
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    const hourlyStats = await storage.getHourlyStats(campaignId);
    res.json({ success: true, hourlyStats });
  } catch (error) {
    console.error('Error fetching hourly analytics:', error);
    res.status(500).json({ error: 'Failed to fetch hourly analytics' });
  }
});

// Real-time analytics
router.get("/analytics/live", async (req: Request, res: Response) => {
  try {
    const liveVisitors = await storage.getLiveVisitors();
    const todayStats = await storage.getTodayStats();
    
    res.json({ 
      success: true, 
      live: {
        visitors: liveVisitors,
        today: todayStats
      }
    });
  } catch (error) {
    console.error('Error fetching live analytics:', error);
    res.status(500).json({ error: 'Failed to fetch live analytics' });
  }
});

// Legacy analytics endpoint for backward compatibility
router.get("/analytics", async (req: Request, res: Response) => {
  try {
    const analytics = await storage.getAnalytics();
    res.json({ success: true, analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Redirect tracking endpoint
router.post("/track/redirect", async (req: Request, res: Response) => {
  try {
    const sessionId = (req as any).sessionID || req.body.sessionId;
    
    // Track conversion funnel step 3 (redirect)
    await storage.trackConversionFunnel({
      visitorId: req.body.visitorId,
      sessionId,
      step: 3,
      stepName: 'Affiliate Redirect'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking redirect:', error);
    res.status(400).json({ error: 'Failed to track redirect' });
  }
});

export default router;