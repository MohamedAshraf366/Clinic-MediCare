import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CalendarCheck2,
  FileClock,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader, StatusPill } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import {
  appointmentTypes,
  appointments,
  kpis,
  patients,
  weeklyVisits,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_app/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { t, lang } = useI18n();

  const kpiCards = [
    {
      label: t("dash.kpi.patients"),
      value: kpis.totalPatients.toLocaleString(lang === "ar" ? "ar-EG" : "en-US"),
      delta: "+12.4%",
      icon: Users,
    },
    {
      label: t("dash.kpi.today"),
      value: kpis.todayAppointments.toString(),
      delta: "+3",
      icon: CalendarCheck2,
    },
    {
      label: t("dash.kpi.pending"),
      value: kpis.pendingReports.toString(),
      delta: "-2",
      icon: FileClock,
    },
    {
      label: t("dash.kpi.revenue"),
      value: `${(kpis.monthRevenue / 1000).toFixed(1)}k`,
      delta: "+8.1%",
      icon: TrendingUp,
    },
  ];

  const pieColors = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
  ];

  return (
    <>
      <PageHeader title={t("dash.title")} subtitle={t("dash.subtitle")} />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k) => (
          <Card key={k.label} className="border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {k.value}
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span className="font-medium">{k.delta}</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-border/70 shadow-sm lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">{t("dash.chart.visits")}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyVisits} margin={{ top: 8, right: 12, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey={lang === "ar" ? "dayAr" : "day"}
                    stroke="var(--color-muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="visits" stroke="var(--color-primary)" strokeWidth={2} fill="url(#visits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">{t("dash.chart.split")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentTypes}
                    dataKey="value"
                    nameKey="key"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="var(--color-background)"
                    strokeWidth={2}
                  >
                    {appointmentTypes.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5 text-xs">
              {appointmentTypes.map((a, i) => (
                <li key={a.key} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i] }} />
                    {t(`type.${a.key}`)}
                  </span>
                  <span className="font-medium text-foreground">{a.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">{t("dash.upcoming")}</CardTitle>
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
              <Link to="/appointments">
                {t("dash.viewAll")} <ArrowRight className="ms-1 h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border">
              {appointments.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                    {a.time}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">
                      {lang === "ar" ? a.patientAr : a.patient}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {lang === "ar" ? a.doctorAr : a.doctor} · {t(`type.${a.type}`)}
                    </div>
                  </div>
                  <StatusPill
                    label={t(`status.${a.status}`)}
                    tone={
                      a.status === "confirmed"
                        ? "success"
                        : a.status === "pending"
                          ? "warning"
                          : a.status === "cancelled"
                            ? "danger"
                            : "info"
                    }
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">{t("dash.recent")}</CardTitle>
            <Button asChild variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
              <Link to="/patients">
                {t("dash.viewAll")} <ArrowRight className="ms-1 h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border">
              {patients.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ background: `oklch(0.62 0.16 ${p.avatarHue})` }}
                  >
                    {(lang === "ar" ? p.nameAr : p.name)
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">
                      {lang === "ar" ? p.nameAr : p.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {p.id} · {p.age} · {t(`gender.${p.gender}`)}
                    </div>
                  </div>
                  <StatusPill
                    label={t(`status.${p.status}`)}
                    tone={p.status === "active" ? "success" : p.status === "followup" ? "info" : "warning"}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
