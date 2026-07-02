import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import { PageHeader, StatusPill } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { Patient } from "@/lib/mock-data";
import { nextId, usePatients } from "@/lib/store";

export const Route = createFileRoute("/_app/patients")({
  component: PatientsPage,
});

function PatientsPage() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const { items: patients, add } = usePatients();
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) =>
      [p.name, p.nameAr, p.id, p.phone, p.doctor].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query, patients]);

  const [form, setForm] = useState({
    name: "",
    nameAr: "",
    age: "",
    gender: "male" as "male" | "female",
    phone: "",
    doctor: "Dr. Mohamed Ashraf",
    doctorAr: "د. نادية فهمي",
  });

  function submit() {
    if (!form.name || !form.age || !form.phone) {
      toast.error(lang === "ar" ? "من فضلك أكمل البيانات" : "Please complete required fields");
      return;
    }
    const p: Patient = {
      id: nextId("P-", patients),
      name: form.name,
      nameAr: form.nameAr || form.name,
      age: Number(form.age) || 0,
      gender: form.gender,
      phone: form.phone,
      lastVisit: new Date().toISOString().slice(0, 10),
      status: "new",
      doctor: form.doctor,
      doctorAr: form.doctorAr,
      avatarHue: Math.floor(Math.random() * 360),
    };
    add(p);
    toast.success(lang === "ar" ? "تمت إضافة المريض" : "Patient added");
    setOpen(false);
    setForm({ ...form, name: "", nameAr: "", age: "", phone: "" });
  }

  return (
    <>
      <PageHeader
        title={t("patients.title")}
        subtitle={t("patients.subtitle")}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("patients.add")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("patients.add")}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{lang === "ar" ? "الاسم (إنجليزي)" : "Name (English)"}</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{lang === "ar" ? "الاسم (عربي)" : "Name (Arabic)"}</Label>
                  <Input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("col.age")}</Label>
                  <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("col.gender")}</Label>
                  <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v as "male" | "female" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("gender.male")}</SelectItem>
                      <SelectItem value="female">{t("gender.female")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{t("col.phone")}</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>{t("col.doctor")}</Label>
                  <Input value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{lang === "ar" ? "إلغاء" : "Cancel"}</Button>
                <Button onClick={submit}>{t("patients.add")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="border-border/70 shadow-sm">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("top.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 ps-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>{t("col.id")}</TableHead>
                <TableHead>{t("col.name")}</TableHead>
                <TableHead>{t("col.age")}</TableHead>
                <TableHead>{t("col.gender")}</TableHead>
                <TableHead>{t("col.phone")}</TableHead>
                <TableHead>{t("col.doctor")}</TableHead>
                <TableHead>{t("col.lastVisit")}</TableHead>
                <TableHead>{t("col.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ background: `oklch(0.62 0.16 ${p.avatarHue})` }}
                      >
                        {(lang === "ar" ? p.nameAr : p.name)
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <span className="font-medium text-foreground">
                        {lang === "ar" ? p.nameAr : p.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{t(`gender.${p.gender}`)}</TableCell>
                  <TableCell className="font-mono text-xs">{p.phone}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {lang === "ar" ? p.doctorAr : p.doctor}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.lastVisit}</TableCell>
                  <TableCell>
                    <StatusPill
                      label={t(`status.${p.status}`)}
                      tone={
                        p.status === "active" ? "success" : p.status === "followup" ? "info" : "warning"
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
