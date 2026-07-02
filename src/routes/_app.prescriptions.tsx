import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import type { Prescription } from "@/lib/mock-data";
import { nextId, usePatients, usePrescriptions } from "@/lib/store";

export const Route = createFileRoute("/_app/prescriptions")({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const { t, lang } = useI18n();
  const { items: prescriptions, add } = usePrescriptions();
  const { items: patients } = usePatients();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    patientId: "",
    medication: "",
    medicationAr: "",
    dosage: "",
  });

  function submit() {
    const p = patients.find((x) => x.id === form.patientId);
    if (!p || !form.medication || !form.dosage) {
      toast.error(lang === "ar" ? "أكمل البيانات" : "Complete all fields");
      return;
    }
    const rx: Prescription = {
      id: nextId("RX-", prescriptions),
      patient: p.name,
      patientAr: p.nameAr,
      medication: form.medication,
      medicationAr: form.medicationAr || form.medication,
      dosage: form.dosage,
      date: new Date().toISOString().slice(0, 10),
      doctor: p.doctor,
      doctorAr: p.doctorAr,
    };
    add(rx);
    toast.success(lang === "ar" ? "تمت إضافة الروشتة" : "Prescription created");
    setOpen(false);
    setForm({ patientId: "", medication: "", medicationAr: "", dosage: "" });
  }

  return (
    <>
      <PageHeader
        title={t("rx.title")}
        subtitle={t("rx.subtitle")}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("rx.new")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("rx.new")}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{t("col.patient")}</Label>
                  <Select value={form.patientId} onValueChange={(v) => setForm({ ...form, patientId: v })}>
                    <SelectTrigger><SelectValue placeholder={t("col.patient")} /></SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {lang === "ar" ? p.nameAr : p.name} · {p.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>{lang === "ar" ? "الدواء (إنجليزي)" : "Medication (English)"}</Label>
                  <Input value={form.medication} onChange={(e) => setForm({ ...form, medication: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{lang === "ar" ? "الدواء (عربي)" : "Medication (Arabic)"}</Label>
                  <Input value={form.medicationAr} onChange={(e) => setForm({ ...form, medicationAr: e.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{t("col.dosage")}</Label>
                  <Input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="1 tab × 3 / day" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{lang === "ar" ? "إلغاء" : "Cancel"}</Button>
                <Button onClick={submit}>{t("rx.new")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {prescriptions.map((rx) => (
          <Card key={rx.id} className="border-border/70 shadow-sm transition hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{rx.id}</span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-foreground">
                  {lang === "ar" ? rx.medicationAr : rx.medication}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{rx.dosage}</div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <div className="min-w-0">
                  <div className="truncate font-medium text-foreground">
                    {lang === "ar" ? rx.patientAr : rx.patient}
                  </div>
                  <div className="truncate text-muted-foreground">
                    {lang === "ar" ? rx.doctorAr : rx.doctor}
                  </div>
                </div>
                <span className="shrink-0 text-muted-foreground">{rx.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
