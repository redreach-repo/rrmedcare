import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hospitals = sqliteTable("hospitals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  specializations: text("specializations").notNull(), // JSON array
  rating: real("rating").notNull(),
  accreditations: text("accreditations").notNull(), // JSON array
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  bedCount: integer("bed_count").notNull(),
  established: integer("established").notNull(),
});

export const treatments = sqliteTable("treatments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  avgCostIndia: integer("avg_cost_india").notNull(),
  avgCostUS: integer("avg_cost_us").notNull(),
  avgCostUK: integer("avg_cost_uk").notNull(),
  avgCostCanada: integer("avg_cost_canada").notNull(),
  duration: text("duration").notNull(),
  hospitalIds: text("hospital_ids").notNull(), // JSON array of IDs
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  country: text("country").notNull(),
  treatmentInterest: text("treatment_interest").notNull(),
  message: text("message"),
  status: text("status").notNull().default("New"),
  preferredCity: text("preferred_city"),
  createdAt: text("created_at").notNull(),
});

export const costEstimates = sqliteTable("cost_estimates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  inquiryId: integer("inquiry_id"),
  treatmentId: integer("treatment_id").notNull(),
  estimatedCost: integer("estimated_cost").notNull(),
  hospitalId: integer("hospital_id"),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

// Insert schemas
export const insertHospitalSchema = createInsertSchema(hospitals).omit({ id: true });
export const insertTreatmentSchema = createInsertSchema(treatments).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, status: true, createdAt: true });
export const insertCostEstimateSchema = createInsertSchema(costEstimates).omit({ id: true, createdAt: true });

// Types
export type Hospital = typeof hospitals.$inferSelect;
export type InsertHospital = z.infer<typeof insertHospitalSchema>;
export type Treatment = typeof treatments.$inferSelect;
export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type CostEstimate = typeof costEstimates.$inferSelect;
export type InsertCostEstimate = z.infer<typeof insertCostEstimateSchema>;
