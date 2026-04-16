import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/logo";
import { Link } from "wouter";
import {
  LayoutDashboard, Users, BarChart3, ArrowLeft, Sun, Moon,
  TrendingUp, Clock, CheckCircle, XCircle, Phone
} from "lucide-react";
import type { Inquiry } from "@shared/schema";

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Contacted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Qualified: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Converted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Lost: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

interface Stats {
  totalInquiries: number;
  newToday: number;
  pendingFollowUps: number;
  conversionRate: number;
  byTreatment: { treatment: string; count: number }[];
  byCity: { city: string; count: number }[];
  byCountry: { country: string; count: number }[];
}

export default function Admin() {
  const { theme, toggle } = useTheme();
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({ queryKey: ["/api/stats"] });
  const { data: inquiries, isLoading: inqLoading } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="p-4 border-b border-sidebar-border">
          <div className="text-primary">
            <Logo className="h-7 w-auto" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <div className="px-3 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </div>
          <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Inquiries
          </div>
          <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </div>
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link href="/">
            <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors cursor-pointer" data-testid="link-back-to-site">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-border px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden text-primary">
              <Logo className="h-6 w-auto" />
            </Link>
            <h1 className="text-lg font-semibold" data-testid="text-admin-heading">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggle} data-testid="button-admin-theme-toggle">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </header>

        <main className="flex-1 p-6 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="inquiries" data-testid="tab-inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* === OVERVIEW === */}
            <TabsContent value="overview">
              {statsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
                </div>
              ) : stats && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Total Inquiries" value={stats.totalInquiries} />
                    <StatCard icon={TrendingUp} label="New Today" value={stats.newToday} accent />
                    <StatCard icon={Clock} label="Pending Follow-Ups" value={stats.pendingFollowUps} />
                    <StatCard icon={CheckCircle} label="Conversion Rate" value={`${stats.conversionRate}%`} />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">Recent Inquiries</CardTitle></CardHeader>
                      <CardContent>
                        {inqLoading ? <Skeleton className="h-32" /> : (
                          <div className="space-y-3">
                            {inquiries?.slice(0, 5).map(inq => (
                              <div key={inq.id} className="flex items-center justify-between text-sm">
                                <div>
                                  <span className="font-medium">{inq.fullName}</span>
                                  <span className="text-muted-foreground ml-2">— {inq.treatmentInterest}</span>
                                </div>
                                <Badge className={`text-xs ${statusColors[inq.status] || ""}`}>{inq.status}</Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader><CardTitle className="text-base">Top Source Countries</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {stats.byCountry.sort((a, b) => b.count - a.count).slice(0, 5).map(c => (
                            <div key={c.country} className="flex items-center justify-between text-sm">
                              <span>{c.country}</span>
                              <span className="font-medium">{c.count} inquiries</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            {/* === INQUIRIES === */}
            <TabsContent value="inquiries">
              <InquiriesTable inquiries={inquiries} isLoading={inqLoading} />
            </TabsContent>

            {/* === ANALYTICS === */}
            <TabsContent value="analytics">
              {statsLoading ? <Skeleton className="h-64" /> : stats && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader><CardTitle className="text-base">By Treatment Type</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stats.byTreatment.sort((a, b) => b.count - a.count).map(t => (
                          <div key={t.treatment} className="flex items-center justify-between text-sm">
                            <span>{t.treatment}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-2 bg-primary/20 rounded-full w-20">
                                <div className="h-2 bg-primary rounded-full" style={{ width: `${(t.count / Math.max(...stats.byTreatment.map(x => x.count))) * 100}%` }} />
                              </div>
                              <span className="font-medium w-6 text-right">{t.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">By City Preference</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stats.byCity.sort((a, b) => b.count - a.count).map(c => (
                          <div key={c.city} className="flex items-center justify-between text-sm">
                            <span>{c.city}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-2 bg-primary/20 rounded-full w-20">
                                <div className="h-2 bg-primary rounded-full" style={{ width: `${(c.count / Math.max(...stats.byCity.map(x => x.count))) * 100}%` }} />
                              </div>
                              <span className="font-medium w-6 text-right">{c.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">By Source Country</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {stats.byCountry.sort((a, b) => b.count - a.count).map(c => (
                          <div key={c.country} className="flex items-center justify-between text-sm">
                            <span>{c.country}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-2 bg-primary/20 rounded-full w-20">
                                <div className="h-2 bg-primary rounded-full" style={{ width: `${(c.count / Math.max(...stats.byCountry.map(x => x.count))) * 100}%` }} />
                              </div>
                              <span className="font-medium w-6 text-right">{c.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string | number; accent?: boolean }) {
  return (
    <Card data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
          <Icon className={`h-4 w-4 ${accent ? "text-coral" : "text-muted-foreground"}`} />
        </div>
        <div className={`text-2xl font-bold ${accent ? "text-coral" : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function InquiriesTable({ inquiries, isLoading }: { inquiries?: Inquiry[]; isLoading: boolean }) {
  const statusUpdate = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/inquiries/${id}`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-testid="table-inquiries">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium hidden sm:table-cell">Country</th>
              <th className="text-left p-3 font-medium">Treatment</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">City</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries?.map(inq => (
              <tr key={inq.id} className="border-t border-border hover:bg-muted/30 transition-colors" data-testid={`row-inquiry-${inq.id}`}>
                <td className="p-3">
                  <div className="font-medium">{inq.fullName}</div>
                  <div className="text-xs text-muted-foreground">{inq.email}</div>
                </td>
                <td className="p-3 hidden sm:table-cell text-muted-foreground">{inq.country}</td>
                <td className="p-3">{inq.treatmentInterest}</td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{inq.preferredCity || "—"}</td>
                <td className="p-3">
                  <Select
                    value={inq.status}
                    onValueChange={(status) => statusUpdate.mutate({ id: inq.id, status })}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs" data-testid={`select-status-${inq.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["New", "Contacted", "Qualified", "Converted", "Lost"].map(s => (
                        <SelectItem key={s} value={s}>
                          <Badge className={`text-xs ${statusColors[s]}`}>{s}</Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
