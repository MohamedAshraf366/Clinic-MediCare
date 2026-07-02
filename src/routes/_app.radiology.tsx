import { createFileRoute } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";

import { PageHeader, StatusPill } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { radiology } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/radiology")({
  component: RadiologyPage,
});

function RadiologyPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHeader title={t("rad.title")} subtitle={t("rad.subtitle")} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {radiology.map((r) => (
          <Card key={r.id} className="border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info">
                  <ScanLine className="h-5 w-5" />
                </div>
                <StatusPill
                  label={r.status}
                  tone={r.status === "Completed" ? "success" : r.status === "Pending" ? "warning" : "info"}
                />
              </div>
              <div className="mt-4 text-sm font-semibold text-foreground">
                {lang === "ar" ? r.typeAr : r.type}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {lang === "ar" ? r.patientAr : r.patient} · {r.id}
              </div>
              <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
                {r.date}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
