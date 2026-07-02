import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, StatusPill } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import { labs } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/lab")({
  component: LabPage,
});

function LabPage() {
  const { t, lang } = useI18n();

  return (
    <>
      <PageHeader title={t("lab.title")} subtitle={t("lab.subtitle")} />

      <Card className="border-border/70 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>{t("col.id")}</TableHead>
                <TableHead>{t("col.patient")}</TableHead>
                <TableHead>{t("col.test")}</TableHead>
                <TableHead>{t("col.result")}</TableHead>
                <TableHead>{t("col.date")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labs.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.id}</TableCell>
                  <TableCell className="font-medium">
                    {lang === "ar" ? l.patientAr : l.patient}
                  </TableCell>
                  <TableCell>{lang === "ar" ? l.testAr : l.test}</TableCell>
                  <TableCell>
                    <StatusPill
                      label={l.result}
                      tone={
                        l.result === "Normal" ? "success" : l.result === "Abnormal" ? "danger" : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{l.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
