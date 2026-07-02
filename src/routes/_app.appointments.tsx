import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, StatusPill } from "@/components/page-header";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import type { Appointment } from "@/lib/mock-data";
import { nextId, useAppointments, usePatients } from "@/lib/store";

export const Route = createFileRoute("/_app/appointments")({
  component: AppointmentsPage,
});

function AppointmentsPage() {
  const { t, lang } = useI18n();
  const { items: appointments, add } = useAppointments();
  const { items: patients } = usePatients();
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    { label: t("appt.today"), value: appointments.filter((a) => a.date === today).length },
    { label: t("appt.week"), value: appointments.length },
    { label: t("appt.month"), value: appointments.length + 42 },
  ];

  const [form, setForm] = useState({
    patientId: "",
    date: today,
    time: "09:00",
    type: "consultation" as Appointment["type"],
  });

  function submit() {
    const p = patients.find((x) => x.id === form.patientId);
    if (!p) {
      toast.error(lang === "ar" ? "اختر مريضاً" : "Select a patient");
      return;
    }
    const appt: Appointment = {
      id: nextId("A-", appointments),
      patientId: p.id,
      patient: p.name,
      patientAr: p.nameAr,
      doctor: p.doctor,
      doctorAr: p.doctorAr,
      date: form.date,
      time: form.time,
      type: form.type,
      status: "pending",
    };
    add(appt);
    toast.success(lang === "ar" ? "تمت إضافة الموعد" : "Appointment created");
    setOpen(false);
  }

  return (
    <>
      <PageHeader
        title={t("appt.title")}
        subtitle={t("appt.subtitle")}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("appt.new")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("appt.new")}</DialogTitle>
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
                  <Label>{t("col.date")}</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("col.time")}</Label>
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{t("col.type")}</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Appointment["type"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">{t("type.consultation")}</SelectItem>
                      <SelectItem value="followup">{t("type.followup")}</SelectItem>
                      <SelectItem value="checkup">{t("type.checkup")}</SelectItem>
                      <SelectItem value="emergency">{t("type.emergency")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{lang === "ar" ? "إلغاء" : "Cancel"}</Button>
                <Button onClick={submit}>{t("appt.new")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="border-border/70 shadow-sm">
            <CardContent className="p-5">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-2 text-2xl font-semibold text-foreground">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/70 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>{t("col.id")}</TableHead>
                <TableHead>{t("col.patient")}</TableHead>
                <TableHead>{t("col.doctor")}</TableHead>
                <TableHead>{t("col.date")}</TableHead>
                <TableHead>{t("col.time")}</TableHead>
                <TableHead>{t("col.type")}</TableHead>
                <TableHead>{t("col.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                  <TableCell className="font-medium">
                    {lang === "ar" ? a.patientAr : a.patient}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lang === "ar" ? a.doctorAr : a.doctor}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.date}</TableCell>
                  <TableCell className="font-mono text-xs">{a.time}</TableCell>
                  <TableCell>{t(`type.${a.type}`)}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
