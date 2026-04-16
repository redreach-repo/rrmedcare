import {
  type Hospital, type InsertHospital, hospitals,
  type Treatment, type InsertTreatment, treatments,
  type Inquiry, type InsertInquiry, inquiries,
  type CostEstimate, type InsertCostEstimate, costEstimates,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, like, and, sql } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

export interface IStorage {
  // Hospitals
  getHospitals(city?: string, specialization?: string): Hospital[];
  getHospital(id: number): Hospital | undefined;
  createHospital(h: InsertHospital): Hospital;
  // Treatments
  getTreatments(category?: string): Treatment[];
  getTreatment(id: number): Treatment | undefined;
  createTreatment(t: InsertTreatment): Treatment;
  // Inquiries
  getInquiries(): Inquiry[];
  getInquiry(id: number): Inquiry | undefined;
  createInquiry(i: InsertInquiry): Inquiry;
  updateInquiryStatus(id: number, status: string): Inquiry | undefined;
  // Cost Estimates
  createCostEstimate(c: InsertCostEstimate): CostEstimate;
  getCostEstimates(treatmentId: number): CostEstimate[];
  // Stats
  getStats(): {
    totalInquiries: number;
    newToday: number;
    pendingFollowUps: number;
    conversionRate: number;
    byTreatment: { treatment: string; count: number }[];
    byCity: { city: string; count: number }[];
    byCountry: { country: string; count: number }[];
  };
  // Seed check
  hospitalCount(): number;
}

export class DatabaseStorage implements IStorage {
  getHospitals(city?: string, specialization?: string): Hospital[] {
    let result = db.select().from(hospitals);
    const conditions = [];
    if (city) conditions.push(eq(hospitals.city, city));
    if (specialization) conditions.push(like(hospitals.specializations, `%${specialization}%`));
    if (conditions.length > 0) {
      return (result as any).where(and(...conditions)).all();
    }
    return result.all();
  }

  getHospital(id: number): Hospital | undefined {
    return db.select().from(hospitals).where(eq(hospitals.id, id)).get();
  }

  createHospital(h: InsertHospital): Hospital {
    return db.insert(hospitals).values(h).returning().get();
  }

  getTreatments(category?: string): Treatment[] {
    if (category) {
      return db.select().from(treatments).where(eq(treatments.category, category)).all();
    }
    return db.select().from(treatments).all();
  }

  getTreatment(id: number): Treatment | undefined {
    return db.select().from(treatments).where(eq(treatments.id, id)).get();
  }

  createTreatment(t: InsertTreatment): Treatment {
    return db.insert(treatments).values(t).returning().get();
  }

  getInquiries(): Inquiry[] {
    return db.select().from(inquiries).all();
  }

  getInquiry(id: number): Inquiry | undefined {
    return db.select().from(inquiries).where(eq(inquiries.id, id)).get();
  }

  createInquiry(i: InsertInquiry): Inquiry {
    return db.insert(inquiries).values({
      ...i,
      status: "New",
      createdAt: new Date().toISOString(),
    }).returning().get();
  }

  updateInquiryStatus(id: number, status: string): Inquiry | undefined {
    return db.update(inquiries).set({ status }).where(eq(inquiries.id, id)).returning().get();
  }

  createCostEstimate(c: InsertCostEstimate): CostEstimate {
    return db.insert(costEstimates).values({
      ...c,
      createdAt: new Date().toISOString(),
    }).returning().get();
  }

  getCostEstimates(treatmentId: number): CostEstimate[] {
    return db.select().from(costEstimates).where(eq(costEstimates.treatmentId, treatmentId)).all();
  }

  getStats() {
    const allInquiries = db.select().from(inquiries).all();
    const today = new Date().toISOString().split("T")[0];
    const newToday = allInquiries.filter(i => i.createdAt.startsWith(today)).length;
    const pendingFollowUps = allInquiries.filter(i => i.status === "Contacted").length;
    const converted = allInquiries.filter(i => i.status === "Converted").length;
    const conversionRate = allInquiries.length > 0 ? Math.round((converted / allInquiries.length) * 100) : 0;

    // Group by treatment
    const treatmentMap: Record<string, number> = {};
    allInquiries.forEach(i => {
      treatmentMap[i.treatmentInterest] = (treatmentMap[i.treatmentInterest] || 0) + 1;
    });
    const byTreatment = Object.entries(treatmentMap).map(([treatment, count]) => ({ treatment, count }));

    // Group by city
    const cityMap: Record<string, number> = {};
    allInquiries.forEach(i => {
      if (i.preferredCity) cityMap[i.preferredCity] = (cityMap[i.preferredCity] || 0) + 1;
    });
    const byCity = Object.entries(cityMap).map(([city, count]) => ({ city, count }));

    // Group by country
    const countryMap: Record<string, number> = {};
    allInquiries.forEach(i => {
      countryMap[i.country] = (countryMap[i.country] || 0) + 1;
    });
    const byCountry = Object.entries(countryMap).map(([country, count]) => ({ country, count }));

    return {
      totalInquiries: allInquiries.length,
      newToday,
      pendingFollowUps,
      conversionRate,
      byTreatment,
      byCity,
      byCountry,
    };
  }

  hospitalCount(): number {
    const result = db.select({ count: sql<number>`count(*)` }).from(hospitals).get();
    return result?.count ?? 0;
  }
}

export const storage = new DatabaseStorage();
