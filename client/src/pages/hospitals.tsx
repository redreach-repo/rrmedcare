import { PatientLayout } from "@/components/patient-layout";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Building2, Award, Bed, Calendar } from "lucide-react";
import { useState } from "react";
import type { Hospital } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const cities = ["All Cities", "Chennai", "Kochi", "Bangalore", "Hyderabad"];
const specializations = ["All Specializations", "Cardiac Sciences", "Orthopedics", "Oncology", "Fertility", "Dental", "Ophthalmology", "Cosmetic Surgery", "Neurosciences"];

export default function Hospitals() {
  const [city, setCity] = useState("All Cities");
  const [spec, setSpec] = useState("All Specializations");

  const { data: hospitals, isLoading } = useQuery<Hospital[]>({
    queryKey: ["/api/hospitals", city, spec],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (city !== "All Cities") params.set("city", city);
      if (spec !== "All Specializations") params.set("specialization", spec);
      const url = `/api/hospitals${params.toString() ? `?${params}` : ""}`;
      const res = await apiRequest("GET", url);
      return res.json();
    },
  });

  return (
    <PatientLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl" data-testid="text-hospitals-heading">Our Partner Hospitals</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Explore our network of JCI and NABH accredited hospitals across India's leading medical hubs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-48" data-testid="select-city-filter">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={spec} onValueChange={setSpec}>
            <SelectTrigger className="w-56" data-testid="select-spec-filter">
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hospital Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-8 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals?.map(h => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
            {hospitals?.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">No hospitals match your filters.</p>
            )}
          </div>
        )}
      </section>
    </PatientLayout>
  );
}

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const specs: string[] = JSON.parse(hospital.specializations);
  const accreditations: string[] = JSON.parse(hospital.accreditations);

  return (
    <Card className="group flex flex-col hover:shadow-md transition-shadow" data-testid={`card-hospital-${hospital.id}`}>
      {/* Colored header */}
      <div className="h-28 bg-gradient-to-br from-primary/15 to-teal-300/10 dark:from-primary/10 dark:to-teal-800/10 flex items-center justify-center">
        <Building2 className="h-10 w-10 text-primary/30" />
      </div>
      <CardContent className="flex-1 p-5 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm leading-snug">{hospital.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{hospital.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3" />
          {hospital.city}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {specs.slice(0, 3).map(s => (
            <Badge key={s} variant="secondary" className="text-xs font-normal">{s}</Badge>
          ))}
          {specs.length > 3 && <Badge variant="secondary" className="text-xs font-normal">+{specs.length - 3}</Badge>}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {accreditations.map(a => (
            <span key={a} className="inline-flex items-center gap-0.5 text-xs text-primary font-medium">
              <Award className="h-3 w-3" />{a}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-hospital-${hospital.id}`}>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{hospital.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />{hospital.address}
                </div>
                <p className="text-sm leading-relaxed">{hospital.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{hospital.bedCount} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Est. {hospital.established}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{hospital.rating} Rating</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {specs.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Accreditations</h4>
                  <div className="flex flex-wrap gap-2">
                    {accreditations.map(a => (
                      <span key={a} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        <Award className="h-3 w-3" />{a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
