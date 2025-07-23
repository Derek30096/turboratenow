import { 
  users, visitors, clickEvents, leads, campaigns, pageEvents, conversionFunnels,
  type User, type InsertUser, type Visitor, type InsertVisitor, 
  type ClickEvent, type InsertClickEvent, type Lead, type InsertLead,
  type Campaign, type InsertCampaign, type PageEvent, type InsertPageEvent,
  type ConversionFunnel, type InsertConversionFunnel
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql, and, gte, lte, like } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Campaign methods
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  
  // Enhanced analytics methods
  trackVisitor(visitor: InsertVisitor): Promise<Visitor>;
  trackCTAClick(clickEvent: InsertClickEvent): Promise<ClickEvent>;
  trackLead(lead: InsertLead): Promise<Lead>;
  trackPageEvent(pageEvent: InsertPageEvent): Promise<PageEvent>;
  trackConversionFunnel(funnel: InsertConversionFunnel): Promise<ConversionFunnel>;
  
  // Advanced analytics reporting
  getVisitorStats(dateFrom?: Date, dateTo?: Date, campaignId?: number): Promise<{
    totalVisitors: number;
    totalClicks: number;
    totalLeads: number;
    conversionRate: number;
    clickThroughRate: number;
    avgTimeOnPage: number;
    topCountries: Array<{ country: string; count: number }>;
    topDevices: Array<{ deviceType: string; count: number }>;
    topBrowsers: Array<{ browser: string; count: number }>;
  }>;
  
  getCampaignStats(campaignId: number): Promise<{
    visitors: number;
    clicks: number;
    leads: number;
    revenue: number;
    conversionRate: number;
    costPerClick?: number;
    roi?: number;
  }>;
  
  getConversionFunnel(campaignId?: number): Promise<Array<{
    step: number;
    stepName: string;
    visitors: number;
    conversionRate: number;
  }>>;
  
  getRecentVisitors(limit?: number, campaignId?: number): Promise<Array<Visitor & { campaign?: Campaign }>>;
  getTopCTAs(campaignId?: number): Promise<Array<{ ctaType: string; clicks: number; conversionRate: number }>>;
  getGeoData(campaignId?: number): Promise<Array<{ country: string; region: string; city: string; visitors: number; conversions: number }>>;
  getDeviceData(campaignId?: number): Promise<Array<{ deviceType: string; browser: string; os: string; visitors: number; conversionRate: number }>>;
  getHourlyStats(campaignId?: number): Promise<Array<{ hour: number; visitors: number; clicks: number; conversions: number }>>;
  
  // Real-time analytics
  getLiveVisitors(): Promise<number>;
  getTodayStats(): Promise<{
    visitors: number;
    clicks: number;
    conversions: number;
    revenue: number;
  }>;
  
  // Legacy methods for compatibility
  trackClick(clickEvent: InsertClickEvent): Promise<ClickEvent>;
  createLead(lead: InsertLead): Promise<Lead>;
  getAnalytics(): Promise<{
    totalVisitors: number;
    totalClicks: number;
    totalLeads: number;
    conversionRate: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Campaign methods
  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const [newCampaign] = await db
      .insert(campaigns)
      .values(campaign)
      .returning();
    return newCampaign;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const [updatedCampaign] = await db
      .update(campaigns)
      .set(updates)
      .where(eq(campaigns.id, id))
      .returning();
    return updatedCampaign || undefined;
  }

  // Enhanced tracking methods
  async trackVisitor(visitor: InsertVisitor): Promise<Visitor> {
    const [newVisitor] = await db
      .insert(visitors)
      .values(visitor)
      .returning();
    return newVisitor;
  }

  async trackCTAClick(clickEvent: InsertClickEvent): Promise<ClickEvent> {
    const [newClick] = await db
      .insert(clickEvents)
      .values(clickEvent)
      .returning();
    return newClick;
  }

  async trackLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values(lead)
      .returning();
    return newLead;
  }

  async trackPageEvent(pageEvent: InsertPageEvent): Promise<PageEvent> {
    const [newEvent] = await db
      .insert(pageEvents)
      .values(pageEvent)
      .returning();
    return newEvent;
  }

  async trackConversionFunnel(funnel: InsertConversionFunnel): Promise<ConversionFunnel> {
    const [newFunnel] = await db
      .insert(conversionFunnels)
      .values(funnel)
      .returning();
    return newFunnel;
  }

  // Advanced analytics
  async getVisitorStats(dateFrom?: Date, dateTo?: Date, campaignId?: number): Promise<{
    totalVisitors: number;
    totalClicks: number;
    totalLeads: number;
    conversionRate: number;
    clickThroughRate: number;
    avgTimeOnPage: number;
    topCountries: Array<{ country: string; count: number }>;
    topDevices: Array<{ deviceType: string; count: number }>;
    topBrowsers: Array<{ browser: string; count: number }>;
  }> {
    let whereConditions = [];
    
    if (dateFrom) {
      whereConditions.push(gte(visitors.visitedAt, dateFrom));
    }
    if (dateTo) {
      whereConditions.push(lte(visitors.visitedAt, dateTo));
    }
    if (campaignId) {
      whereConditions.push(eq(visitors.campaignId, campaignId));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Basic stats
    const [visitorCount] = await db
      .select({ count: count() })
      .from(visitors)
      .where(whereClause);

    const [clickCount] = await db
      .select({ count: count() })
      .from(clickEvents)
      .innerJoin(visitors, eq(clickEvents.visitorId, visitors.id))
      .where(whereClause);

    const [leadCount] = await db
      .select({ count: count() })
      .from(leads)
      .innerJoin(visitors, eq(leads.visitorId, visitors.id))
      .where(whereClause);

    // Top countries
    const topCountries = await db
      .select({
        country: visitors.country,
        count: count(),
      })
      .from(visitors)
      .where(whereClause)
      .groupBy(visitors.country)
      .orderBy(desc(count()))
      .limit(5);

    // Top devices
    const topDevices = await db
      .select({
        deviceType: visitors.deviceType,
        count: count(),
      })
      .from(visitors)
      .where(whereClause)
      .groupBy(visitors.deviceType)
      .orderBy(desc(count()))
      .limit(5);

    // Top browsers
    const topBrowsers = await db
      .select({
        browser: visitors.browser,
        count: count(),
      })
      .from(visitors)
      .where(whereClause)
      .groupBy(visitors.browser)
      .orderBy(desc(count()))
      .limit(5);

    // Average time on page (from click events)
    const [avgTimeResult] = await db
      .select({
        avgTime: sql<number>`AVG(${clickEvents.timeOnPage})`,
      })
      .from(clickEvents)
      .innerJoin(visitors, eq(clickEvents.visitorId, visitors.id))
      .where(whereClause);

    const totalVisitors = visitorCount.count;
    const totalClicks = clickCount.count;
    const totalLeads = leadCount.count;

    return {
      totalVisitors,
      totalClicks,
      totalLeads,
      conversionRate: totalVisitors > 0 ? (totalLeads / totalVisitors) * 100 : 0,
      clickThroughRate: totalVisitors > 0 ? (totalClicks / totalVisitors) * 100 : 0,
      avgTimeOnPage: avgTimeResult?.avgTime || 0,
      topCountries: topCountries.filter(c => c.country).map(c => ({ country: c.country!, count: c.count })),
      topDevices: topDevices.filter(d => d.deviceType).map(d => ({ deviceType: d.deviceType!, count: d.count })),
      topBrowsers: topBrowsers.filter(b => b.browser).map(b => ({ browser: b.browser!, count: b.count })),
    };
  }

  async getCampaignStats(campaignId: number): Promise<{
    visitors: number;
    clicks: number;
    leads: number;
    revenue: number;
    conversionRate: number;
    costPerClick?: number;
    roi?: number;
  }> {
    const whereClause = eq(visitors.campaignId, campaignId);

    const [visitorCount] = await db
      .select({ count: count() })
      .from(visitors)
      .where(whereClause);

    const [clickCount] = await db
      .select({ count: count() })
      .from(clickEvents)
      .innerJoin(visitors, eq(clickEvents.visitorId, visitors.id))
      .where(whereClause);

    const [leadStats] = await db
      .select({
        count: count(),
        revenue: sql<number>`SUM(COALESCE(${leads.payout}, 0))`,
      })
      .from(leads)
      .innerJoin(visitors, eq(leads.visitorId, visitors.id))
      .where(whereClause);

    const totalVisitors = visitorCount.count;
    const totalClicks = clickCount.count;
    const totalLeads = leadStats.count;
    const revenue = leadStats.revenue || 0;

    return {
      visitors: totalVisitors,
      clicks: totalClicks,
      leads: totalLeads,
      revenue,
      conversionRate: totalVisitors > 0 ? (totalLeads / totalVisitors) * 100 : 0,
    };
  }

  async getConversionFunnel(campaignId?: number): Promise<Array<{
    step: number;
    stepName: string;
    visitors: number;
    conversionRate: number;
  }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    const funnelData = await db
      .select({
        step: conversionFunnels.step,
        stepName: conversionFunnels.stepName,
        count: count(),
      })
      .from(conversionFunnels)
      .innerJoin(visitors, eq(conversionFunnels.visitorId, visitors.id))
      .where(whereClause)
      .groupBy(conversionFunnels.step, conversionFunnels.stepName)
      .orderBy(conversionFunnels.step);

    // Calculate conversion rates
    const totalVisitors = funnelData.find(f => f.step === 1)?.count || 1;
    
    return funnelData.map(step => ({
      step: step.step,
      stepName: step.stepName || `Step ${step.step}`,
      visitors: step.count,
      conversionRate: (step.count / totalVisitors) * 100,
    }));
  }

  async getRecentVisitors(limit = 50, campaignId?: number): Promise<Array<Visitor & { campaign?: Campaign }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    return await db
      .select({
        visitor: visitors,
        campaign: campaigns,
      })
      .from(visitors)
      .leftJoin(campaigns, eq(visitors.campaignId, campaigns.id))
      .where(whereClause)
      .orderBy(desc(visitors.visitedAt))
      .limit(limit)
      .then(results => 
        results.map(r => ({ ...r.visitor, campaign: r.campaign || undefined }))
      );
  }

  async getTopCTAs(campaignId?: number): Promise<Array<{ ctaType: string; clicks: number; conversionRate: number }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    const ctaStats = await db
      .select({
        ctaType: clickEvents.ctaType,
        clicks: count(),
      })
      .from(clickEvents)
      .innerJoin(visitors, eq(clickEvents.visitorId, visitors.id))
      .where(whereClause)
      .groupBy(clickEvents.ctaType)
      .orderBy(desc(count()));

    // Calculate conversion rates for each CTA
    const results = [];
    for (const cta of ctaStats) {
      const [conversionData] = await db
        .select({ conversions: count() })
        .from(leads)
        .innerJoin(visitors, eq(leads.visitorId, visitors.id))
        .innerJoin(clickEvents, and(
          eq(clickEvents.visitorId, visitors.id),
          eq(clickEvents.ctaType, cta.ctaType)
        ))
        .where(whereClause);

      results.push({
        ctaType: cta.ctaType,
        clicks: cta.clicks,
        conversionRate: cta.clicks > 0 ? (conversionData.conversions / cta.clicks) * 100 : 0,
      });
    }

    return results;
  }

  async getGeoData(campaignId?: number): Promise<Array<{ country: string; region: string; city: string; visitors: number; conversions: number }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    return await db
      .select({
        country: visitors.country,
        region: visitors.region,
        city: visitors.city,
        visitors: count(),
        conversions: sql<number>`COUNT(${leads.id})`,
      })
      .from(visitors)
      .leftJoin(leads, eq(leads.visitorId, visitors.id))
      .where(whereClause)
      .groupBy(visitors.country, visitors.region, visitors.city)
      .orderBy(desc(count()))
      .then(results => 
        results
          .filter(r => r.country)
          .map(r => ({
            country: r.country!,
            region: r.region || '',
            city: r.city || '',
            visitors: r.visitors,
            conversions: r.conversions,
          }))
      );
  }

  async getDeviceData(campaignId?: number): Promise<Array<{ deviceType: string; browser: string; os: string; visitors: number; conversionRate: number }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    return await db
      .select({
        deviceType: visitors.deviceType,
        browser: visitors.browser,
        os: visitors.os,
        visitors: count(),
        conversions: sql<number>`COUNT(${leads.id})`,
      })
      .from(visitors)
      .leftJoin(leads, eq(leads.visitorId, visitors.id))
      .where(whereClause)
      .groupBy(visitors.deviceType, visitors.browser, visitors.os)
      .orderBy(desc(count()))
      .then(results => 
        results
          .filter(r => r.deviceType)
          .map(r => ({
            deviceType: r.deviceType!,
            browser: r.browser || '',
            os: r.os || '',
            visitors: r.visitors,
            conversionRate: r.visitors > 0 ? (r.conversions / r.visitors) * 100 : 0,
          }))
      );
  }

  async getHourlyStats(campaignId?: number): Promise<Array<{ hour: number; visitors: number; clicks: number; conversions: number }>> {
    let whereClause = campaignId ? eq(visitors.campaignId, campaignId) : undefined;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const conditions = [
      gte(visitors.visitedAt, today),
      lte(visitors.visitedAt, tomorrow)
    ];
    if (whereClause) conditions.push(whereClause);
    const dateRange = and(...conditions);

    // This is a simplified version - in production you'd want more sophisticated hourly grouping
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visitors: 0, // Would need hour extraction from timestamp
      clicks: 0,
      conversions: 0,
    }));
  }

  async getLiveVisitors(): Promise<number> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const [result] = await db
      .select({ count: count() })
      .from(visitors)
      .where(gte(visitors.visitedAt, fiveMinutesAgo));

    return result.count;
  }

  async getTodayStats(): Promise<{
    visitors: number;
    clicks: number;
    conversions: number;
    revenue: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [visitorCount] = await db
      .select({ count: count() })
      .from(visitors)
      .where(gte(visitors.visitedAt, today));

    const [clickCount] = await db
      .select({ count: count() })
      .from(clickEvents)
      .innerJoin(visitors, eq(clickEvents.visitorId, visitors.id))
      .where(gte(visitors.visitedAt, today));

    const [leadStats] = await db
      .select({
        count: count(),
        revenue: sql<number>`SUM(COALESCE(${leads.payout}, 0))`,
      })
      .from(leads)
      .innerJoin(visitors, eq(leads.visitorId, visitors.id))
      .where(gte(visitors.visitedAt, today));

    return {
      visitors: visitorCount.count,
      clicks: clickCount.count,
      conversions: leadStats.count,
      revenue: leadStats.revenue || 0,
    };
  }

  // Legacy methods for backward compatibility
  async trackClick(clickEvent: InsertClickEvent): Promise<ClickEvent> {
    return this.trackCTAClick(clickEvent);
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    return this.trackLead(lead);
  }

  async getAnalytics(): Promise<{
    totalVisitors: number;
    totalClicks: number;
    totalLeads: number;
    conversionRate: number;
  }> {
    const stats = await this.getVisitorStats();
    return {
      totalVisitors: stats.totalVisitors,
      totalClicks: stats.totalClicks,
      totalLeads: stats.totalLeads,
      conversionRate: stats.conversionRate,
    };
  }
}

export const storage = new DatabaseStorage();