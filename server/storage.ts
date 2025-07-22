import { 
  users, 
  visitors, 
  clickEvents, 
  leads,
  type User, 
  type InsertUser,
  type Visitor,
  type InsertVisitor,
  type ClickEvent,
  type InsertClickEvent,
  type Lead,
  type InsertLead
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface for user management and analytics
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Analytics methods
  trackVisitor(visitor: InsertVisitor): Promise<Visitor>;
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

  async trackVisitor(visitor: InsertVisitor): Promise<Visitor> {
    const [newVisitor] = await db
      .insert(visitors)
      .values(visitor)
      .returning();
    return newVisitor;
  }

  async trackClick(clickEvent: InsertClickEvent): Promise<ClickEvent> {
    const [newClick] = await db
      .insert(clickEvents)
      .values(clickEvent)
      .returning();
    return newClick;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values(lead)
      .returning();
    return newLead;
  }

  async getAnalytics() {
    const [visitorCount] = await db.select({ count: visitors.id }).from(visitors);
    const [clickCount] = await db.select({ count: clickEvents.id }).from(clickEvents);
    const [leadCount] = await db.select({ count: leads.id }).from(leads);
    
    const totalVisitors = Number(visitorCount?.count) || 0;
    const totalClicks = Number(clickCount?.count) || 0;
    const totalLeads = Number(leadCount?.count) || 0;
    const conversionRate = totalVisitors > 0 ? (totalLeads / totalVisitors) * 100 : 0;

    return {
      totalVisitors,
      totalClicks,
      totalLeads,
      conversionRate,
    };
  }
}

export const storage = new DatabaseStorage();
