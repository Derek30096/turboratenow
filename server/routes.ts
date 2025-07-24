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
  // Handle custom domain requests directly - catch all traffic
  app.use((req, res, next) => {
    const host = req.header('host');
    const userAgent = req.header('user-agent') || '';
    
    // Log domain requests for debugging
    if (host && host.includes('turboratenow')) {
      console.log(`Domain request: ${host} from ${req.ip} - ${userAgent.substring(0, 50)}`);
    }
    
    if (host === 'turboratenow.com' || host === 'www.turboratenow.com' || host?.includes('turboratenow')) {
      // Serve landing page directly for custom domain
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Auto Insurance - Get Your Free Quote Now</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: white; 
            color: black; 
            line-height: 1.6; 
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 60px 20px; 
            text-align: center; 
        }
        .urgent { 
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e); 
            color: white; 
            padding: 15px; 
            margin-bottom: 40px; 
            border-radius: 8px; 
            font-weight: bold; 
            font-size: 16px;
        }
        h1 { 
            color: #007BFF; 
            font-size: 42px; 
            margin-bottom: 20px; 
            font-weight: bold; 
        }
        .subtitle { 
            font-size: 24px; 
            color: #333; 
            margin-bottom: 40px; 
            line-height: 1.4; 
        }
        .cta { 
            background: #007BFF; 
            color: white; 
            padding: 25px 50px; 
            border: none; 
            border-radius: 12px; 
            font-size: 24px; 
            font-weight: bold; 
            cursor: pointer; 
            text-decoration: none; 
            display: inline-block; 
            box-shadow: 0 8px 20px rgba(0,123,255,0.3); 
            transition: all 0.3s ease;
            margin: 20px 0;
        }
        .cta:hover { 
            background: #0056b3; 
            transform: translateY(-2px); 
            box-shadow: 0 12px 30px rgba(0,123,255,0.4); 
        }
        .benefits { 
            margin: 60px 0; 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 30px; 
        }
        .benefit { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 12px; 
            border: 2px solid #e9ecef; 
        }
        .benefit h3 { 
            color: #007BFF; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }
        .benefit p { 
            color: #666; 
            font-size: 16px; 
        }
        .footer { 
            margin-top: 60px; 
            font-size: 14px; 
            color: #999; 
        }
        @media (max-width: 768px) {
            h1 { font-size: 32px; }
            .subtitle { font-size: 20px; }
            .cta { 
                padding: 20px 40px; 
                font-size: 20px; 
                width: 100%; 
                max-width: 320px; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="urgent">⚡ LIMITED TIME: Insurance Rates Going Up - Compare NOW!</div>
        
        <h1>Champion Auto Insurance</h1>
        <p class="subtitle">Get your free quote and compare top rates in under a minute!</p>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Get Free Quote Now</a>
        
        <div class="benefits">
            <div class="benefit">
                <h3>💰 Save Up to 40%</h3>
                <p>Compare rates from top insurance companies and save hundreds on your premium</p>
            </div>
            <div class="benefit">
                <h3>⚡ Quick & Easy</h3>
                <p>Get your quote in under 60 seconds with our streamlined process</p>
            </div>
            <div class="benefit">
                <h3>🛡️ Trusted Protection</h3>
                <p>Access coverage from A-rated insurance providers nationwide</p>
            </div>
        </div>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Start Saving Today</a>
        
        <div class="footer">
            <p>Secure • Fast • Reliable<br>Licensed insurance comparison service</p>
        </div>
    </div>
</body>
</html>`);
    }
    next();
  });

  // Simple static landing page - NO TRACKING, NO CHARGES
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Auto Insurance - Get Your Free Quote Now</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: white !important; 
            color: black !important; 
            line-height: 1.6; 
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 60px 20px; 
            text-align: center; 
        }
        .urgent { 
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e); 
            color: white; 
            padding: 15px; 
            margin-bottom: 40px; 
            border-radius: 8px; 
            font-weight: bold; 
            font-size: 16px;
        }
        h1 { 
            color: #007BFF !important; 
            font-size: 42px; 
            margin-bottom: 20px; 
            font-weight: bold; 
        }
        .subtitle { 
            font-size: 24px; 
            color: #333 !important; 
            margin-bottom: 40px; 
            line-height: 1.4; 
        }
        .cta { 
            background: #007BFF !important; 
            color: white !important; 
            padding: 25px 50px; 
            border: none; 
            border-radius: 12px; 
            font-size: 24px; 
            font-weight: bold; 
            cursor: pointer; 
            text-decoration: none !important; 
            display: inline-block; 
            box-shadow: 0 8px 20px rgba(0,123,255,0.3); 
            transition: all 0.3s ease;
            margin: 20px 0;
        }
        .cta:hover { 
            background: #0056b3 !important; 
            transform: translateY(-2px); 
            box-shadow: 0 12px 30px rgba(0,123,255,0.4); 
        }
        .benefits { 
            margin: 60px 0; 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 30px; 
        }
        .benefit { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 12px; 
            border: 2px solid #e9ecef; 
        }
        .benefit h3 { 
            color: #007BFF; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }
        .benefit p { 
            color: #666; 
            font-size: 16px; 
        }
        .footer { 
            margin-top: 60px; 
            font-size: 14px; 
            color: #999; 
        }
        @media (max-width: 768px) {
            h1 { font-size: 32px; }
            .subtitle { font-size: 20px; }
            .cta { 
                padding: 20px 40px; 
                font-size: 20px; 
                width: 100%; 
                max-width: 320px; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="urgent">⚡ LIMITED TIME: Insurance Rates Going Up - Compare NOW!</div>
        
        <h1>Champion Auto Insurance</h1>
        <p class="subtitle">Get your free quote and compare top rates in under a minute!</p>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Get Free Quote Now</a>
        
        <div class="benefits">
            <div class="benefit">
                <h3>💰 Save Up to 40%</h3>
                <p>Compare rates from top insurance companies and save hundreds on your premium</p>
            </div>
            <div class="benefit">
                <h3>⚡ Quick & Easy</h3>
                <p>Get your quote in under 60 seconds with our streamlined process</p>
            </div>
            <div class="benefit">
                <h3>🛡️ Trusted Protection</h3>
                <p>Access coverage from A-rated insurance providers nationwide</p>
            </div>
        </div>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Start Saving Today</a>
        
        <div class="footer">
            <p>Secure • Fast • Reliable<br>Licensed insurance comparison service</p>
        </div>
    </div>
</body>
</html>`);
  });

  // Backup simple route
  app.get('/simple', (req, res) => {
    res.redirect('/');
  });

  // Static landing page route for direct access
  app.get('/landing', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Champion Auto Insurance - Get Your Free Quote Now</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            background: white; 
            color: black; 
            line-height: 1.6; 
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 60px 20px; 
            text-align: center; 
        }
        .urgent { 
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e); 
            color: white; 
            padding: 15px; 
            margin-bottom: 40px; 
            border-radius: 8px; 
            font-weight: bold; 
            font-size: 16px;
        }
        h1 { 
            color: #007BFF; 
            font-size: 42px; 
            margin-bottom: 20px; 
            font-weight: bold; 
        }
        .subtitle { 
            font-size: 24px; 
            color: #333; 
            margin-bottom: 40px; 
            line-height: 1.4; 
        }
        .cta { 
            background: #007BFF; 
            color: white; 
            padding: 25px 50px; 
            border: none; 
            border-radius: 12px; 
            font-size: 24px; 
            font-weight: bold; 
            cursor: pointer; 
            text-decoration: none; 
            display: inline-block; 
            box-shadow: 0 8px 20px rgba(0,123,255,0.3); 
            transition: all 0.3s ease;
            margin: 20px 0;
        }
        .cta:hover { 
            background: #0056b3; 
            transform: translateY(-2px); 
            box-shadow: 0 12px 30px rgba(0,123,255,0.4); 
        }
        .benefits { 
            margin: 60px 0; 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 30px; 
        }
        .benefit { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 12px; 
            border: 2px solid #e9ecef; 
        }
        .benefit h3 { 
            color: #007BFF; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }
        .benefit p { 
            color: #666; 
            font-size: 16px; 
        }
        .footer { 
            margin-top: 60px; 
            font-size: 14px; 
            color: #999; 
        }
        @media (max-width: 768px) {
            h1 { font-size: 32px; }
            .subtitle { font-size: 20px; }
            .cta { 
                padding: 20px 40px; 
                font-size: 20px; 
                width: 100%; 
                max-width: 320px; 
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="urgent">⚡ LIMITED TIME: Insurance Rates Going Up - Compare NOW!</div>
        
        <h1>Champion Auto Insurance</h1>
        <p class="subtitle">Get your free quote and compare top rates in under a minute!</p>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Get Free Quote Now</a>
        
        <div class="benefits">
            <div class="benefit">
                <h3>💰 Save Up to 40%</h3>
                <p>Compare rates from top insurance companies and save hundreds on your premium</p>
            </div>
            <div class="benefit">
                <h3>⚡ Quick & Easy</h3>
                <p>Get your quote in under 60 seconds with our streamlined process</p>
            </div>
            <div class="benefit">
                <h3>🛡️ Trusted Protection</h3>
                <p>Access coverage from A-rated insurance providers nationwide</p>
            </div>
        </div>
        
        <a href="https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980" class="cta">Start Saving Today</a>
        
        <div class="footer">
            <p>Secure • Fast • Reliable<br>Licensed insurance comparison service</p>
        </div>
    </div>
</body>
</html>`);
  });

  // Health check endpoint for Replit (only for production health checks)
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });
  
  // DISABLED: All API tracking routes removed to prevent charges
  // app.use('/api', router);
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