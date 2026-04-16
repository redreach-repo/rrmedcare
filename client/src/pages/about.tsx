import { PatientLayout } from "@/components/patient-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Users, Award } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Transparency", desc: "We provide clear, upfront pricing with no hidden costs. Every hospital in our network is accredited and verified." },
  { icon: Globe, title: "Global Access", desc: "We serve patients from the Middle East, Africa, and beyond — bridging the gap between world-class care and affordability." },
  { icon: Users, title: "Patient-First Care", desc: "Our dedicated coordinators support you from first inquiry through treatment and post-care follow-up." },
  { icon: Award, title: "Proven Excellence", desc: "Over 10,000 patients served with partnerships across 50+ JCI and NABH accredited hospitals." },
];

export default function About() {
  return (
    <PatientLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-about-heading">About RRmedcare</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            RRmedcare is the medical tourism division of <strong>Red Reach Middle East FZE</strong>, headquartered in Dubai, UAE. We connect patients from across the Middle East, Africa, and beyond with India's finest hospitals — offering world-class treatments at a fraction of the cost.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our mission is simple: make quality healthcare accessible to everyone. Through our carefully curated network of 50+ partner hospitals in Chennai, Kochi, Bangalore, and Hyderabad, we ensure every patient receives exceptional medical care, personalized attention, and comprehensive travel support.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-16">
          {values.map(v => (
            <Card key={v.title} data-testid={`card-value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-8 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">Our Parent Company</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Red Reach Middle East FZE</strong> is a diversified business services company based in Dubai, UAE. With deep expertise in cross-border trade and service coordination, Red Reach established RRmedcare to address the growing demand for affordable, high-quality healthcare options for patients in the region.
          </p>
        </div>
      </section>
    </PatientLayout>
  );
}
