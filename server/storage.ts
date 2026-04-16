import {
  type Hospital, type InsertHospital,
  type Treatment, type InsertTreatment,
  type Inquiry, type InsertInquiry,
  type CostEstimate, type InsertCostEstimate,
} from "@shared/schema";

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

export class MemoryStorage implements IStorage {
  private hospitals: Hospital[] = [];
  private treatments: Treatment[] = [];
  private inquiries: Inquiry[] = [];
  private costEstimates: CostEstimate[] = [];
  private nextHospitalId = 1;
  private nextTreatmentId = 1;
  private nextInquiryId = 1;
  private nextCostEstimateId = 1;

  getHospitals(city?: string, specialization?: string): Hospital[] {
    let result = [...this.hospitals];
    if (city) result = result.filter(h => h.city === city);
    if (specialization) result = result.filter(h => h.specializations.includes(specialization));
    return result;
  }

  getHospital(id: number): Hospital | undefined {
    return this.hospitals.find(h => h.id === id);
  }

  createHospital(h: InsertHospital): Hospital {
    const hospital: Hospital = { ...h, id: this.nextHospitalId++, imageUrl: h.imageUrl ?? null };
    this.hospitals.push(hospital);
    return hospital;
  }

  getTreatments(category?: string): Treatment[] {
    if (category) return this.treatments.filter(t => t.category === category);
    return [...this.treatments];
  }

  getTreatment(id: number): Treatment | undefined {
    return this.treatments.find(t => t.id === id);
  }

  createTreatment(t: InsertTreatment): Treatment {
    const treatment: Treatment = { ...t, id: this.nextTreatmentId++ };
    this.treatments.push(treatment);
    return treatment;
  }

  getInquiries(): Inquiry[] {
    return [...this.inquiries];
  }

  getInquiry(id: number): Inquiry | undefined {
    return this.inquiries.find(i => i.id === id);
  }

  createInquiry(i: InsertInquiry): Inquiry {
    const inquiry: Inquiry = {
      ...i,
      id: this.nextInquiryId++,
      status: "New",
      createdAt: new Date().toISOString(),
      message: i.message ?? null,
      preferredCity: i.preferredCity ?? null,
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }

  updateInquiryStatus(id: number, status: string): Inquiry | undefined {
    const inquiry = this.inquiries.find(i => i.id === id);
    if (inquiry) inquiry.status = status;
    return inquiry;
  }

  createCostEstimate(c: InsertCostEstimate): CostEstimate {
    const estimate: CostEstimate = {
      ...c,
      id: this.nextCostEstimateId++,
      createdAt: new Date().toISOString(),
      inquiryId: c.inquiryId ?? null,
      hospitalId: c.hospitalId ?? null,
      notes: c.notes ?? null,
    };
    this.costEstimates.push(estimate);
    return estimate;
  }

  getCostEstimates(treatmentId: number): CostEstimate[] {
    return this.costEstimates.filter(c => c.treatmentId === treatmentId);
  }

  getStats() {
    const allInquiries = this.inquiries;
    const today = new Date().toISOString().split("T")[0];
    const newToday = allInquiries.filter(i => i.createdAt.startsWith(today)).length;
    const pendingFollowUps = allInquiries.filter(i => i.status === "Contacted").length;
    const converted = allInquiries.filter(i => i.status === "Converted").length;
    const conversionRate = allInquiries.length > 0 ? Math.round((converted / allInquiries.length) * 100) : 0;

    const treatmentMap: Record<string, number> = {};
    allInquiries.forEach(i => {
      treatmentMap[i.treatmentInterest] = (treatmentMap[i.treatmentInterest] || 0) + 1;
    });
    const byTreatment = Object.entries(treatmentMap).map(([treatment, count]) => ({ treatment, count }));

    const cityMap: Record<string, number> = {};
    allInquiries.forEach(i => {
      if (i.preferredCity) cityMap[i.preferredCity] = (cityMap[i.preferredCity] || 0) + 1;
    });
    const byCity = Object.entries(cityMap).map(([city, count]) => ({ city, count }));

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
    return this.hospitals.length;
  }

  // Direct insert for seeding with specific status/date
  insertInquiryDirect(data: Omit<Inquiry, "id">): Inquiry {
    const inquiry: Inquiry = { ...data, id: this.nextInquiryId++ };
    this.inquiries.push(inquiry);
    return inquiry;
  }
}

export const storage = new MemoryStorage();
