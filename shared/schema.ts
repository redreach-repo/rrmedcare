import { z } from "zod";

// === Types ===
export interface Hospital {
  id: number;
  name: string;
  city: string;
  address: string;
  specializations: string; // JSON array
  rating: number;
  accreditations: string; // JSON array
  description: string;
  imageUrl: string | null;
  bedCount: number;
  established: number;
}

export interface Treatment {
  id: number;
  name: string;
  category: string;
  description: string;
  avgCostIndia: number;
  avgCostUS: number;
  avgCostUK: number;
  avgCostCanada: number;
  duration: string;
  hospitalIds: string; // JSON array of IDs
}

export interface Inquiry {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  treatmentInterest: string;
  message: string | null;
  status: string;
  preferredCity: string | null;
  createdAt: string;
}

export interface CostEstimate {
  id: number;
  inquiryId: number | null;
  treatmentId: number;
  estimatedCost: number;
  hospitalId: number | null;
  notes: string | null;
  createdAt: string;
}

// === Insert schemas (for validation) ===
export const insertHospitalSchema = z.object({
  name: z.string(),
  city: z.string(),
  address: z.string(),
  specializations: z.string(),
  rating: z.number(),
  accreditations: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable().optional(),
  bedCount: z.number(),
  established: z.number(),
});

export const insertTreatmentSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  avgCostIndia: z.number(),
  avgCostUS: z.number(),
  avgCostUK: z.number(),
  avgCostCanada: z.number(),
  duration: z.string(),
  hospitalIds: z.string(),
});

export const insertInquirySchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
  treatmentInterest: z.string(),
  message: z.string().nullable().optional(),
  preferredCity: z.string().nullable().optional(),
});

export const insertCostEstimateSchema = z.object({
  inquiryId: z.number().nullable().optional(),
  treatmentId: z.number(),
  estimatedCost: z.number(),
  hospitalId: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
});

// === Insert types ===
export type InsertHospital = z.infer<typeof insertHospitalSchema>;
export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertCostEstimate = z.infer<typeof insertCostEstimateSchema>;
