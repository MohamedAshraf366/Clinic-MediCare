import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t, lang, setLang, theme, setTheme } = useI18n();

  return (
    <>
      <PageHeader title={t("settings.title")} subtitle={t("settings.subtitle")} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("settings.appearance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label className="text-sm font-medium">{t("settings.darkMode")}</Label>
                <p className="text-xs text-muted-foreground">Light / dark theme toggle</p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(c) => setTheme(c ? "dark" : "light")}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label className="text-sm font-medium">{t("settings.rtl")}</Label>
                <p className="text-xs text-muted-foreground">
                  {lang === "ar" ? "العربية (RTL)" : "English (LTR)"}
                </p>
              </div>
              <Switch checked={lang === "ar"} onCheckedChange={(c) => setLang(c ? "ar" : "en")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("settings.clinic")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">{t("settings.clinicName")}</Label>
              <Input defaultValue="MediCare Downtown Clinic" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">{t("settings.address")}</Label>
              <Input defaultValue="12 Tahrir St, Cairo, Egypt" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">{t("settings.phone")}</Label>
              <Input defaultValue="+20 2 2578 9000" />
            </div>
            <Button className="w-full sm:w-auto">{t("settings.save")}</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
