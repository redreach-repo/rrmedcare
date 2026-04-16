import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { seedDatabase } from "./seed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed on startup
  seedDatabase();

  // === HOSPITALS ===
  app.get("/api/hospitals", (_req, res) => {
    const city = _req.query.city as string | undefined;
    const specialization = _req.query.specialization as string | undefined;
    const result = storage.getHospitals(city, specialization);
    res.json(result);
  });

  app.get("/api/hospitals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const hospital = storage.getHospital(id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.json(hospital);
  });

  // === TREATMENTS ===
  app.get("/api/treatments", (req, res) => {
    const category = req.query.category as string | undefined;
    const result = storage.getTreatments(category);
    res.json(result);
  });

  app.get("/api/treatments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const treatment = storage.getTreatment(id);
    if (!treatment) return res.status(404).json({ message: "Treatment not found" });
    res.json(treatment);
  });

  // === INQUIRIES ===
  app.post("/api/inquiries", (req, res) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = storage.createInquiry(data);
      res.status(201).json(inquiry);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid data" });
    }
  });

  app.get("/api/inquiries", (_req, res) => {
    const result = storage.getInquiries();
    res.json(result);
  });

  app.patch("/api/inquiries/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });
    const validStatuses = ["New", "Contacted", "Qualified", "Converted", "Lost"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const inquiry = storage.updateInquiryStatus(id, status);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  });

  // === COST ESTIMATES ===
  app.post("/api/estimate", (req, res) => {
    const { treatmentId, preferredCity } = req.body;
    if (!treatmentId) return res.status(400).json({ message: "Treatment ID required" });

    const treatment = storage.getTreatment(treatmentId);
    if (!treatment) return res.status(404).json({ message: "Treatment not found" });

    // Get hospitals that offer this treatment in the preferred city (or all)
    const hospitalIds: number[] = JSON.parse(treatment.hospitalIds);
    const allHospitals = storage.getHospitals();
    let relevantHospitals = allHospitals.filter(h => hospitalIds.includes(h.id));

    if (preferredCity) {
      const cityHospitals = relevantHospitals.filter(h => h.city === preferredCity);
      if (cityHospitals.length > 0) {
        relevantHospitals = cityHospitals;
      }
    }

    // Generate cost estimates with some variation
    const estimates = relevantHospitals.map(h => {
      const variation = 0.85 + Math.random() * 0.3; // 85% to 115% of avg
      const estimatedCost = Math.round(treatment.avgCostIndia * variation);
      return {
        hospitalId: h.id,
        hospitalName: h.name,
        city: h.city,
        estimatedCost,
        rating: h.rating,
      };
    });

    res.json({
      treatment: {
        id: treatment.id,
        name: treatment.name,
        category: treatment.category,
        avgCostIndia: treatment.avgCostIndia,
        avgCostUS: treatment.avgCostUS,
        avgCostUK: treatment.avgCostUK,
        avgCostCanada: treatment.avgCostCanada,
        duration: treatment.duration,
      },
      estimates,
      savings: {
        vsUS: Math.round(((treatment.avgCostUS - treatment.avgCostIndia) / treatment.avgCostUS) * 100),
        vsUK: Math.round(((treatment.avgCostUK - treatment.avgCostIndia) / treatment.avgCostUK) * 100),
        vsCanada: Math.round(((treatment.avgCostCanada - treatment.avgCostIndia) / treatment.avgCostCanada) * 100),
      },
    });
  });

  // === STATS ===
  app.get("/api/stats", (_req, res) => {
    const stats = storage.getStats();
    res.json(stats);
  });

  return httpServer;
}
