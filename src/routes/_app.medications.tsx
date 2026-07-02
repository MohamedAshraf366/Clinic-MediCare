import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/i18n";
import type { Medication } from "@/lib/mock-data";
import { nextId, useMedications } from "@/lib/store";

export const Route = createFileRoute("/_app/medications")({
  component: MedsPage,
});

function MedsPage() {
  const { t, lang } = useI18n();
  const { items: medications, add } = useMedications();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nameAr: "",
    category: "",
    categoryAr: "",
    stock: "",
    price: "",
  });

  function submit() {
    if (!form.name || !form.stock || !form.price) {
      toast.error(lang === "ar" ? "أكمل البيانات" : "Complete all fields");
      return;
    }
    const m: Medication = {
      id: nextId("M-", medications),
      name: form.name,
      nameAr: form.nameAr || form.name,
      category: form.category || "General",
      categoryAr: form.categoryAr || form.category || "عام",
      stock: Number(form.stock),
      price: Number(form.price),
    };
    add(m);
    toast.success(lang === "ar" ? "تمت الإضافة" : "Medication added");
    setOpen(false);
    setForm({ name: "", nameAr: "", category: "", categoryAr: "", stock: "", price: "" });
  }

  return (
    <>
      <PageHeader
        title={t("meds.title")}
        subtitle={t("meds.subtitle")}
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {lang === "ar" ? "إضافة دواء" : "Add Medication"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{lang === "ar" ? "إضافة دواء" : "Add Medication"}</DialogTitle>
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
                  <Label>{t("col.category")}</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{lang === "ar" ? "الفئة (عربي)" : "Category (Arabic)"}</Label>
                  <Input value={form.categoryAr} onChange={(e) => setForm({ ...form, categoryAr: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("col.stock")}</Label>
                  <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("col.price")}</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{lang === "ar" ? "إلغاء" : "Cancel"}</Button>
                <Button onClick={submit}>{lang === "ar" ? "إضافة" : "Add"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="border-border/70 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>{t("col.id")}</TableHead>
                <TableHead>{t("col.medication")}</TableHead>
                <TableHead>{t("col.category")}</TableHead>
                <TableHead>{t("col.stock")}</TableHead>
                <TableHead>{t("col.price")}</TableHead>
                <TableHead>{t("col.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((m) => {
                const low = m.stock < 20;
                return (
                  <TableRow key={m.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{m.id}</TableCell>
                    <TableCell className="font-medium">
                      {lang === "ar" ? m.nameAr : m.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lang === "ar" ? m.categoryAr : m.category}
                    </TableCell>
                    <TableCell>{m.stock}</TableCell>
                    <TableCell>{m.price} EGP</TableCell>
                    <TableCell>
                      <StatusPill
                        label={low ? t("meds.low") : t("meds.ok")}
                        tone={low ? "danger" : "success"}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
