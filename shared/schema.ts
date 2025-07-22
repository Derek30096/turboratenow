import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Landing page analytics and visitor tracking
export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  landingPage: text("landing_page").notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

// Track CTA clicks and conversions
export const clickEvents = pgTable("click_events", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  ctaType: varchar("cta_type", { length: 100 }).notNull(), // 'hero_cta', 'secondary_cta', 'urgency_cta'
  ctaText: text("cta_text").notNull(),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});

// Track form submissions or quote requests
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  visitorId: integer("visitor_id").references(() => visitors.id),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  zipCode: varchar("zip_code", { length: 10 }),
  converted: boolean("converted").default(false),
  conversionValue: integer("conversion_value"), // potential commission value
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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

export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type InsertClickEvent = z.infer<typeof insertClickEventSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Visitor = typeof visitors.$inferSelect;
export type ClickEvent = typeof clickEvents.$inferSelect;
export type Lead = typeof leads.$inferSelect;
