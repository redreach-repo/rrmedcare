import { PatientLayout } from "@/components/patient-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, ArrowRight, FileSearch, Stethoscope, Calendar, HeartPulse } from "lucide-react";
import { useState } from "react";

const treatmentOptions = ["Cardiac", "Orthopedic", "Oncology", "Fertility", "Dental", "Ophthalmology", "Cosmetic", "Other"];

const processSteps = [
  { icon: FileSearch, title: "Free Consultation", desc: "We review your medical reports and understand your needs." },
  { icon: Stethoscope, title: "Hospital Matching", desc: "We recommend the best hospitals and doctors for your condition." },
  { icon: Calendar, title: "Planning & Travel", desc: "We coordinate appointments, visa, travel, and accommodation." },
  { icon: HeartPulse, title: "Treatment & Care", desc: "We support you throughout your treatment and recovery in India." },
];

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    treatmentInterest: "",
    message: "",
    preferredCity: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/inquiries", form);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Inquiry Submitted!", description: "Our team will contact you within 24 hours." });
      setForm({ fullName: "", email: "", phone: "", country: "", treatmentInterest: "", message: "", preferredCity: "" });
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.country || !form.treatmentInterest) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    mutation.mutate();
  };

  const updateField = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <PatientLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-contact-heading">Get in Touch</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Ready to explore your treatment options? Fill out the form below and our patient coordinator will reach out within 24 hours.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" value={form.fullName} onChange={e => updateField("fullName", e.target.value)} placeholder="John Doe" data-testid="input-fullname" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => updateField("email", e.target.value)} placeholder="you@example.com" data-testid="input-email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" value={form.phone} onChange={e => updateField("phone", e.target.value)} placeholder="+971-50-XXX-XXXX" data-testid="input-phone" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" value={form.country} onChange={e => updateField("country", e.target.value)} placeholder="United Arab Emirates" data-testid="input-country" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Treatment Interest *</Label>
                    <Select value={form.treatmentInterest} onValueChange={v => updateField("treatmentInterest", v)}>
                      <SelectTrigger data-testid="select-treatment-interest">
                        <SelectValue placeholder="Select treatment area" />
                      </SelectTrigger>
                      <SelectContent>
                        {treatmentOptions.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred City (Optional)</Label>
                    <Select value={form.preferredCity} onValueChange={v => updateField("preferredCity", v)}>
                      <SelectTrigger data-testid="select-preferred-city">
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No preference</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Kochi">Kochi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={form.message} onChange={e => updateField("message", e.target.value)} placeholder="Tell us about your condition or any questions you have..." rows={4} data-testid="input-message" />
                  </div>
                  <Button type="submit" className="w-full bg-coral hover:bg-coral/90 text-coral-foreground" disabled={mutation.isPending} data-testid="button-submit-contact">
                    {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Office Address</div>
                    <div className="text-muted-foreground">Red Reach Middle East FZE<br />Dubai, United Arab Emirates</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">+971-4-XXX-XXXX</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@rrmedcare.com</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processSteps.map((ps, i) => (
                    <div key={ps.title} className="flex gap-3" data-testid={`process-step-${i + 1}`}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{ps.title}</div>
                        <div className="text-xs text-muted-foreground">{ps.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PatientLayout>
  );
}
