import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  TestTube,
  ScanLine,
  Pill,
  BarChart3,
  Settings as SettingsIcon,
  Stethoscope,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useI18n } from "@/lib/i18n";

export function AppSidebar() {
  const { t } = useI18n();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  const clinical = [
    { to: "/", icon: LayoutDashboard, label: t("nav.dashboard") },
    { to: "/patients", icon: Users, label: t("nav.patients") },
    { to: "/appointments", icon: CalendarDays, label: t("nav.appointments") },
    { to: "/prescriptions", icon: FileText, label: t("nav.prescriptions") },
  ];
  const diagnostics = [
    { to: "/lab", icon: TestTube, label: t("nav.lab") },
    { to: "/radiology", icon: ScanLine, label: t("nav.radiology") },
    { to: "/medications", icon: Pill, label: t("nav.medications") },
  ];
  const system = [
    { to: "/reports", icon: BarChart3, label: t("nav.reports") },
    { to: "/settings", icon: SettingsIcon, label: t("nav.settings") },
  ];

  const isActive = (path: string) => (path === "/" ? currentPath === "/" : currentPath.startsWith(path));

  const renderGroup = (label: string, items: typeof clinical) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.label}>
                <Link to={item.to} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Stethoscope className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold leading-tight text-sidebar-foreground">
                {t("app.name")}
              </div>
              <div className="truncate text-[11px] text-muted-foreground">{t("app.tagline")}</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {renderGroup(t("nav.groups.clinical"), clinical)}
        {renderGroup(t("nav.groups.diagnostics"), diagnostics)}
        {renderGroup(t("nav.groups.system"), system)}
      </SidebarContent>

      <SidebarFooter>
        {!collapsed && (
          <div className="mx-2 mb-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                NF
              </div>
              <div className="min-w-0 text-xs">
                <div className="truncate font-medium text-sidebar-foreground">Dr. Mohamed Ashraf</div>
                <div className="truncate text-muted-foreground">Cardiology</div>
              </div>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
