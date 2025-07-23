import { pgTable, text, serial, integer, boolean, timestamp, varchar, decimal, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enhanced campaigns table for tracking different traffic sources
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  source: varchar("source", { length: 100 }), // facebook, google, email, etc.
  medium: varchar("medium", { length: 100 }), // cpc, organic, social, etc.
  campaignId: varchar("campaign_id", { length: 255 }), // external campaign ID
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enhanced visitors table with geo and device data
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  campaignId: integer("campaign_id").references(() => campaigns.id),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  landingPage: text("landing_page").notNull(),
  // Geo data
  country: varchar("country", { length: 100 }),
  region: varchar("region", { length: 100 }),
  city: varchar("city", { length: 100 }),
  // Device data
  deviceType: varchar("device_type", { length: 50 }), // desktop, mobile, tablet
  browser: varchar("browser", { length: 100 }),
  os: varchar("os", { length: 100 }),
  // UTM parameters
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

// Enhanced click events with more detailed tracking
export const clickEvents = pgTable("click_events", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  ctaType: varchar("cta_type", { length: 100 }).notNull(),
  ctaText: text("cta_text").notNull(),
  elementId: varchar("element_id", { length: 100 }), // DOM element ID
  pageUrl: varchar("page_url", { length: 500 }),
  xPosition: integer("x_position"), // click coordinates
  yPosition: integer("y_position"),
  timeOnPage: integer("time_on_page"), // seconds before click
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

// Enhanced leads with conversion tracking
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  zipCode: varchar("zip_code", { length: 10 }),
  converted: boolean("converted").default(false),
  conversionValue: decimal("conversion_value", { precision: 10, scale: 2 }),
  conversionType: varchar("conversion_type", { length: 50 }), // click, form_submit, phone_call
  affiliateNetwork: varchar("affiliate_network", { length: 100 }),
  payout: decimal("payout", { precision: 10, scale: 2 }),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Page events for detailed user journey tracking
export const pageEvents = pgTable("page_events", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // page_view, scroll, hover, exit
  page: varchar("page", { length: 255 }),
  element: varchar("element", { length: 255 }),
  data: json("data"), // additional event data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Conversion funnels for tracking user flow
export const conversionFunnels = pgTable("conversion_funnels", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  step: integer("step").notNull(), // 1=landing, 2=click, 3=redirect, 4=conversion
  stepName: varchar("step_name", { length: 100 }),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Relations
export const campaignsRelations = relations(campaigns, ({ many }) => ({
  visitors: many(visitors),
}));

export const visitorsRelations = relations(visitors, ({ many, one }) => ({
  clickEvents: many(clickEvents),
  leads: many(leads),
  pageEvents: many(pageEvents),
  conversionFunnels: many(conversionFunnels),
  campaign: one(campaigns, {
    fields: [visitors.campaignId],
    references: [campaigns.id],
  }),
}));

export const clickEventsRelations = relations(clickEvents, ({ one }) => ({
  visitor: one(visitors, {
    fields: [clickEvents.visitorId],
    references: [visitors.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  visitor: one(visitors, {
    fields: [leads.visitorId],
    references: [visitors.id],
  }),
}));

export const pageEventsRelations = relations(pageEvents, ({ one }) => ({
  visitor: one(visitors, {
    fields: [pageEvents.visitorId],
    references: [visitors.id],
  }),
}));

export const conversionFunnelsRelations = relations(conversionFunnels, ({ one }) => ({
  visitor: one(visitors, {
    fields: [conversionFunnels.visitorId],
    references: [visitors.id],
  }),
}));

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
  visitedAt: true,
});

export const insertClickEventSchema = createInsertSchema(clickEvents).omit({
  id: true,
  clickedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  submittedAt: true,
});

export const insertPageEventSchema = createInsertSchema(pageEvents).omit({
  id: true,
  timestamp: true,
});

export const insertConversionFunnelSchema = createInsertSchema(conversionFunnels).omit({
  id: true,
  completedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Visitor = typeof visitors.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type ClickEvent = typeof clickEvents.$inferSelect;
export type InsertClickEvent = z.infer<typeof insertClickEventSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type PageEvent = typeof pageEvents.$inferSelect;
export type InsertPageEvent = z.infer<typeof insertPageEventSchema>;
export type ConversionFunnel = typeof conversionFunnels.$inferSelect;
export type InsertConversionFunnel = z.infer<typeof insertConversionFunnelSchema>;