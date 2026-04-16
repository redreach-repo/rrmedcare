import { PatientLayout } from "@/components/patient-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Building2, Stethoscope, Plane, FileCheck, HeartPulse, Headphones,
  TrendingDown, Star, MapPin, Quote
} from "lucide-react";

const stats = [
  { value: "50+", label: "Partner Hospitals" },
  { value: "4", label: "Major Cities" },
  { value: "10,000+", label: "Patients Served" },
  { value: "40-80%", label: "Cost Savings" },
];

const services = [
  { icon: Building2, title: "Hospital Coordination", desc: "We connect you with the right hospital and specialist for your specific condition." },
  { icon: Stethoscope, title: "Treatment Planning", desc: "End-to-end treatment planning with detailed cost estimates and timelines." },
  { icon: Plane, title: "Travel & Accommodation", desc: "Complete travel support including flights, hotel, and airport transfers." },
  { icon: FileCheck, title: "Visa Assistance", desc: "Hassle-free medical visa processing and documentation support." },
  { icon: HeartPulse, title: "Post-Treatment Follow-Up", desc: "Continued care coordination after you return home." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock assistance from our dedicated patient coordinators." },
];

const cities = [
  { name: "Chennai", desc: "Known as India's healthcare capital with world-renowned cardiac and multi-specialty hospitals." },
  { name: "Kochi", desc: "Combines excellent medical facilities with Kerala's therapeutic natural environment for recovery." },
  { name: "Bangalore", desc: "India's tech hub with cutting-edge robotic surgery and high-volume cardiac centers." },
  { name: "Hyderabad", desc: "Emerging medical destination with Asia's leading gastroenterology and liver transplant programs." },
];

const testimonials = [
  { name: "Khalid M.", country: "UAE", quote: "RRmedcare made my heart surgery journey seamless. The hospital in Chennai was world-class, and I saved over 70% compared to prices at home.", rating: 5 },
  { name: "Amina R.", country: "Oman", quote: "After years of struggling with knee pain, I got a total knee replacement in Bangalore. The care was exceptional, and the team handled everything from visa to recovery.", rating: 5 },
  { name: "James O.", country: "Nigeria", quote: "I was nervous about travelling abroad for treatment, but the RRmedcare team made it feel like home. The IVF clinic in Kochi was outstanding.", rating: 5 },
];

const cityColors = [
  "from-primary/20 to-primary/5",
  "from-teal-400/20 to-teal-200/5",
  "from-emerald-400/20 to-emerald-200/5",
  "from-cyan-400/20 to-cyan-200/5",
];

export default function Home() {
  return (
    <PatientLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-teal-50 dark:from-primary/5 dark:via-background dark:to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-coral/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
                <HeartPulse className="h-3.5 w-3.5" />
                Trusted Medical Tourism Partner
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" data-testid="text-hero-heading">
                Your Journey to World-Class Healthcare Starts Here
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                RRmedcare connects patients from around the world with top-accredited hospitals across India — delivering exceptional care at a fraction of the cost.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/estimate">
                  <Button size="lg" className="bg-coral hover:bg-coral/90 text-coral-foreground" data-testid="button-get-estimate">
                    Get Free Estimate
                  </Button>
                </Link>
                <Link href="/hospitals">
                  <Button size="lg" variant="outline" data-testid="button-explore-hospitals">
                    Explore Hospitals
                  </Button>
                </Link>
              </div>
            </div>
            {/* Hero visual — SVG illustration of connected care */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Large circle */}
                <div className="absolute inset-0 rounded-full bg-primary/8 border border-primary/10" />
                {/* Inner circle */}
                <div className="absolute inset-8 rounded-full bg-primary/5 border border-primary/8" />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                      <HeartPulse className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary">World-Class Care</span>
                  </div>
                </div>
                {/* Floating cards */}
                <div className="absolute -top-2 right-4 bg-card border border-border rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Star className="h-3 w-3 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">JCI Accredited</div>
                      <div className="text-[10px] text-muted-foreground">Global standards</div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 -left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-coral/10 flex items-center justify-center">
                      <TrendingDown className="h-3 w-3 text-coral" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Save 40-80%</div>
                      <div className="text-[10px] text-muted-foreground">vs US/UK prices</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">50+ Hospitals</div>
                      <div className="text-[10px] text-muted-foreground">4 cities in India</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="text-center" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Services</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Everything you need for a smooth and successful medical journey abroad.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <Card key={s.title} className="group hover:shadow-md transition-shadow" data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose India */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl mb-4">Why Choose India for Healthcare?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                India has become the world's leading destination for medical tourism, offering internationally accredited hospitals, highly experienced doctors trained at top global institutions, and costs that are 40-80% lower than the US, UK, and Canada.
              </p>
              <div className="space-y-4">
                {[
                  { icon: TrendingDown, text: "Save 40-80% on treatments vs. Western countries" },
                  { icon: Star, text: "JCI & NABH accredited hospitals with global standards" },
                  { icon: Stethoscope, text: "Doctors trained at Mayo Clinic, Johns Hopkins, Cleveland Clinic" },
                  { icon: HeartPulse, text: "Zero wait times — treatment starts within days" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-primary/5 border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Heart Bypass</div>
                <div className="text-lg font-bold text-primary">$5,500</div>
                <div className="text-xs text-muted-foreground">vs $123,000 in US</div>
              </Card>
              <Card className="p-4 text-center bg-primary/5 border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Knee Replacement</div>
                <div className="text-lg font-bold text-primary">$4,500</div>
                <div className="text-xs text-muted-foreground">vs $50,000 in US</div>
              </Card>
              <Card className="p-4 text-center bg-primary/5 border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">IVF Treatment</div>
                <div className="text-lg font-bold text-primary">$3,000</div>
                <div className="text-xs text-muted-foreground">vs $23,000 in US</div>
              </Card>
              <Card className="p-4 text-center bg-primary/5 border-primary/10">
                <div className="text-sm text-muted-foreground mb-1">Dental Implant</div>
                <div className="text-lg font-bold text-primary">$600</div>
                <div className="text-xs text-muted-foreground">vs $5,000 in US</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partner Cities */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Partner Cities</h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">World-class healthcare across four of India's most vibrant cities.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city, i) => (
            <Card key={city.name} className="overflow-hidden group hover:shadow-md transition-shadow" data-testid={`card-city-${city.name.toLowerCase()}`}>
              <div className={`h-32 bg-gradient-to-br ${cityColors[i]} flex items-center justify-center`}>
                <MapPin className="h-10 w-10 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">{city.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{city.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold sm:text-3xl">What Our Patients Say</h2>
            <p className="mt-2 text-muted-foreground">Real stories from patients who trusted us with their care.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map(t => (
              <Card key={t.name} className="relative" data-testid={`card-testimonial-${t.name.toLowerCase().replace(/\s/g, '-')}`}>
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-primary/20 mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.quote}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{t.name}</span>
                    <span className="text-xs text-muted-foreground">— {t.country}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-teal-700 dark:from-primary dark:to-teal-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl" data-testid="text-cta-heading">
            Ready to Start Your Health Journey?
          </h2>
          <p className="mt-3 text-teal-100 max-w-lg mx-auto">
            Get a free, no-obligation cost estimate and let us plan your path to world-class care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/estimate">
              <Button size="lg" className="bg-white text-primary hover:bg-teal-50" data-testid="button-cta-estimate">
                Get Free Estimate
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10" data-testid="button-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PatientLayout>
  );
}
