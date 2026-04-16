import { PatientLayout } from "@/components/patient-layout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowLeft, DollarSign, TrendingDown, Building2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { Treatment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const categories = ["Cardiac", "Orthopedic", "Oncology", "Fertility", "Dental", "Ophthalmology", "Cosmetic"];
const allCities = ["Chennai", "Kochi", "Bangalore", "Hyderabad"];

interface EstimateResult {
  treatment: {
    id: number;
    name: string;
    category: string;
    avgCostIndia: number;
    avgCostUS: number;
    avgCostUK: number;
    avgCostCanada: number;
    duration: string;
  };
  estimates: {
    hospitalId: number;
    hospitalName: string;
    city: string;
    estimatedCost: number;
    rating: number;
  }[];
  savings: { vsUS: number; vsUK: number; vsCanada: number };
}

export default function Estimate() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [treatmentId, setTreatmentId] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: treatments } = useQuery<Treatment[]>({
    queryKey: ["/api/treatments", category],
    queryFn: async () => {
      const url = category ? `/api/treatments?category=${category}` : "/api/treatments";
      const res = await apiRequest("GET", url);
      return res.json();
    },
    enabled: !!category,
  });

  const handleSubmit = async () => {
    if (!treatmentId) return;
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/estimate", {
        treatmentId,
        preferredCity: selectedCity || undefined,
      });
      const data = await res.json();
      setResult(data);
      setStep(5);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const canNext = () => {
    if (step === 1) return !!category;
    if (step === 2) return !!treatmentId;
    if (step === 3) return true; // city is optional
    if (step === 4) return patientName.trim().length > 0 && patientEmail.trim().length > 0;
    return false;
  };

  return (
    <PatientLayout>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-estimate-heading">Cost Estimator</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Get a personalized cost estimate in minutes. Compare prices across hospitals and see how much you could save.
          </p>
        </div>

        {/* Progress */}
        {step < 5 && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                {s < 4 && <div className={`h-px w-6 sm:w-12 ${s < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Category */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Treatment Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setTreatmentId(null); }}
                    className={`p-4 rounded-lg border text-sm font-medium transition-colors text-left ${
                      category === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 hover:bg-accent"
                    }`}
                    data-testid={`button-category-${c.toLowerCase()}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Treatment */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Procedure</CardTitle>
            </CardHeader>
            <CardContent>
              {!treatments ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                </div>
              ) : (
                <div className="space-y-2">
                  {treatments.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTreatmentId(t.id)}
                      className={`w-full p-4 rounded-lg border text-left transition-colors ${
                        treatmentId === t.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40 hover:bg-accent"
                      }`}
                      data-testid={`button-treatment-${t.id}`}
                    >
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: City */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preferred City (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedCity("")}
                  className={`p-4 rounded-lg border text-sm font-medium transition-colors ${
                    selectedCity === "" ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                  }`}
                  data-testid="button-city-all"
                >
                  Show All Cities
                </button>
                {allCities.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    className={`p-4 rounded-lg border text-sm font-medium transition-colors ${
                      selectedCity === c ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                    }`}
                    data-testid={`button-city-${c.toLowerCase()}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Patient Details */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="est-name">Full Name *</Label>
                <Input id="est-name" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Enter your name" data-testid="input-patient-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="est-email">Email *</Label>
                <Input id="est-email" type="email" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} placeholder="you@example.com" data-testid="input-patient-email" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Results */}
        {step === 5 && result && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-teal-100/30 dark:from-primary/5 dark:to-background border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-1" data-testid="text-estimate-result-heading">{result.treatment.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{result.treatment.duration}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Save vs US</div>
                    <Badge className="bg-primary text-primary-foreground text-sm">{result.savings.vsUS}%</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Save vs UK</div>
                    <Badge className="bg-primary text-primary-foreground text-sm">{result.savings.vsUK}%</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">Save vs Canada</div>
                    <Badge className="bg-primary text-primary-foreground text-sm">{result.savings.vsCanada}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* International Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  International Cost Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-cost-comparison">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-2 pr-4 font-medium">Country</th>
                        <th className="py-2 pr-4 font-medium">Average Cost</th>
                        <th className="py-2 font-medium">You Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-primary/5">
                        <td className="py-2.5 pr-4 font-medium text-primary">🇮🇳 India (avg)</td>
                        <td className="py-2.5 pr-4 font-semibold text-primary">${result.treatment.avgCostIndia.toLocaleString()}</td>
                        <td className="py-2.5 text-primary font-medium">—</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2.5 pr-4">🇺🇸 United States</td>
                        <td className="py-2.5 pr-4">${result.treatment.avgCostUS.toLocaleString()}</td>
                        <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-medium">${(result.treatment.avgCostUS - result.treatment.avgCostIndia).toLocaleString()}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2.5 pr-4">🇬🇧 United Kingdom</td>
                        <td className="py-2.5 pr-4">${result.treatment.avgCostUK.toLocaleString()}</td>
                        <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-medium">${(result.treatment.avgCostUK - result.treatment.avgCostIndia).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">🇨🇦 Canada</td>
                        <td className="py-2.5 pr-4">${result.treatment.avgCostCanada.toLocaleString()}</td>
                        <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-medium">${(result.treatment.avgCostCanada - result.treatment.avgCostIndia).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Hospital Estimates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Estimated Costs by Hospital
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.estimates.map(e => (
                    <div key={e.hospitalId} className="flex items-center justify-between p-3 rounded-lg border" data-testid={`estimate-hospital-${e.hospitalId}`}>
                      <div>
                        <div className="font-medium text-sm">{e.hospitalName}</div>
                        <div className="text-xs text-muted-foreground">{e.city} • Rating: {e.rating}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">${e.estimatedCost.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={() => { setStep(1); setResult(null); setCategory(""); setTreatmentId(null); setSelectedCity(""); }} variant="outline" data-testid="button-new-estimate">
                Get Another Estimate
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              data-testid="button-step-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                data-testid="button-step-next"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canNext() || loading} className="bg-coral hover:bg-coral/90 text-coral-foreground" data-testid="button-submit-estimate">
                {loading ? "Generating..." : "Get Estimate"}
              </Button>
            )}
          </div>
        )}
      </section>
    </PatientLayout>
  );
}
