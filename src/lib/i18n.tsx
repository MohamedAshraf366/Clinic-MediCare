import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Lang = "en" | "ar";
type Theme = "light" | "dark";

type Dict = Record<string, string>;

const en: Dict = {
  "app.name": "MediCare",
  "app.tagline": "Clinic Management System",

  "nav.dashboard": "Dashboard",
  "nav.patients": "Patients",
  "nav.appointments": "Appointments",
  "nav.prescriptions": "Prescriptions",
  "nav.lab": "Lab Results",
  "nav.radiology": "Radiology",
  "nav.medications": "Medications",
  "nav.reports": "Reports",
  "nav.settings": "Settings",
  "nav.groups.clinical": "Clinical",
  "nav.groups.diagnostics": "Diagnostics",
  "nav.groups.system": "System",

  "top.search": "Search patients, records, prescriptions...",
  "top.new": "New",
  "top.language": "Language",
  "top.theme": "Theme",
  "top.notifications": "Notifications",

  "dash.title": "Overview",
  "dash.subtitle": "Today's clinic activity at a glance",
  "dash.kpi.patients": "Total Patients",
  "dash.kpi.today": "Today's Appointments",
  "dash.kpi.pending": "Pending Reports",
  "dash.kpi.revenue": "Revenue (MTD)",
  "dash.chart.visits": "Weekly Visits",
  "dash.chart.split": "Appointments by Type",
  "dash.upcoming": "Upcoming Appointments",
  "dash.recent": "Recent Patients",
  "dash.viewAll": "View all",

  "patients.title": "Patients",
  "patients.subtitle": "Manage patient records and medical files",
  "patients.add": "Add Patient",
  "col.id": "ID",
  "col.name": "Name",
  "col.age": "Age",
  "col.gender": "Gender",
  "col.phone": "Phone",
  "col.lastVisit": "Last Visit",
  "col.status": "Status",
  "col.doctor": "Doctor",
  "col.date": "Date",
  "col.time": "Time",
  "col.type": "Type",
  "col.patient": "Patient",
  "col.medication": "Medication",
  "col.dosage": "Dosage",
  "col.test": "Test",
  "col.result": "Result",
  "col.stock": "Stock",
  "col.price": "Price",
  "col.category": "Category",

  "appt.title": "Appointments",
  "appt.subtitle": "Schedule and track patient visits",
  "appt.new": "New Appointment",
  "appt.today": "Today",
  "appt.week": "This Week",
  "appt.month": "This Month",

  "rx.title": "Prescriptions",
  "rx.subtitle": "Electronic prescriptions and refills",
  "rx.new": "New Prescription",

  "lab.title": "Lab Results",
  "lab.subtitle": "Blood tests, cultures and diagnostics",

  "rad.title": "Radiology",
  "rad.subtitle": "Imaging studies and reports",

  "meds.title": "Medications",
  "meds.subtitle": "Pharmacy inventory and stock",
  "meds.low": "Low stock",
  "meds.ok": "In stock",

  "reports.title": "Reports",
  "reports.subtitle": "Daily activity and financial reports",

  "settings.title": "Settings",
  "settings.subtitle": "Preferences and clinic configuration",
  "settings.appearance": "Appearance",
  "settings.language": "Language",
  "settings.darkMode": "Dark mode",
  "settings.rtl": "Right-to-left (Arabic)",
  "settings.clinic": "Clinic Information",
  "settings.clinicName": "Clinic name",
  "settings.address": "Address",
  "settings.phone": "Phone",
  "settings.save": "Save changes",

  "status.confirmed": "Confirmed",
  "status.pending": "Pending",
  "status.cancelled": "Cancelled",
  "status.completed": "Completed",
  "status.active": "Active",
  "status.followup": "Follow-up",
  "status.new": "New",

  "type.consultation": "Consultation",
  "type.followup": "Follow-up",
  "type.emergency": "Emergency",
  "type.checkup": "Check-up",

  "gender.male": "Male",
  "gender.female": "Female",
};

const ar: Dict = {
  "app.name": "ميديكير",
  "app.tagline": "نظام إدارة العيادات الطبية",

  "nav.dashboard": "لوحة التحكم",
  "nav.patients": "المرضى",
  "nav.appointments": "المواعيد",
  "nav.prescriptions": "الروشتات",
  "nav.lab": "التحاليل",
  "nav.radiology": "الأشعة",
  "nav.medications": "الأدوية",
  "nav.reports": "التقارير",
  "nav.settings": "الإعدادات",
  "nav.groups.clinical": "الإكلينيكي",
  "nav.groups.diagnostics": "التشخيص",
  "nav.groups.system": "النظام",

  "top.search": "ابحث عن مريض، سجل، أو روشتة...",
  "top.new": "جديد",
  "top.language": "اللغة",
  "top.theme": "المظهر",
  "top.notifications": "الإشعارات",

  "dash.title": "نظرة عامة",
  "dash.subtitle": "نشاط العيادة اليوم في لمحة",
  "dash.kpi.patients": "إجمالي المرضى",
  "dash.kpi.today": "مواعيد اليوم",
  "dash.kpi.pending": "تقارير معلقة",
  "dash.kpi.revenue": "الإيرادات (الشهر)",
  "dash.chart.visits": "الزيارات الأسبوعية",
  "dash.chart.split": "المواعيد حسب النوع",
  "dash.upcoming": "المواعيد القادمة",
  "dash.recent": "أحدث المرضى",
  "dash.viewAll": "عرض الكل",

  "patients.title": "المرضى",
  "patients.subtitle": "إدارة سجلات وملفات المرضى",
  "patients.add": "إضافة مريض",
  "col.id": "المعرف",
  "col.name": "الاسم",
  "col.age": "العمر",
  "col.gender": "النوع",
  "col.phone": "الهاتف",
  "col.lastVisit": "آخر زيارة",
  "col.status": "الحالة",
  "col.doctor": "الطبيب",
  "col.date": "التاريخ",
  "col.time": "الوقت",
  "col.type": "النوع",
  "col.patient": "المريض",
  "col.medication": "الدواء",
  "col.dosage": "الجرعة",
  "col.test": "التحليل",
  "col.result": "النتيجة",
  "col.stock": "المخزون",
  "col.price": "السعر",
  "col.category": "الفئة",

  "appt.title": "المواعيد",
  "appt.subtitle": "جدولة ومتابعة زيارات المرضى",
  "appt.new": "موعد جديد",
  "appt.today": "اليوم",
  "appt.week": "هذا الأسبوع",
  "appt.month": "هذا الشهر",

  "rx.title": "الروشتات",
  "rx.subtitle": "روشتات إلكترونية وتجديدات",
  "rx.new": "روشتة جديدة",

  "lab.title": "التحاليل",
  "lab.subtitle": "تحاليل الدم والزراعات والتشخيص",

  "rad.title": "الأشعة",
  "rad.subtitle": "دراسات وتقارير الأشعة",

  "meds.title": "الأدوية",
  "meds.subtitle": "مخزون الصيدلية",
  "meds.low": "مخزون منخفض",
  "meds.ok": "متوفر",

  "reports.title": "التقارير",
  "reports.subtitle": "التقارير اليومية والمالية",

  "settings.title": "الإعدادات",
  "settings.subtitle": "التفضيلات وإعدادات العيادة",
  "settings.appearance": "المظهر",
  "settings.language": "اللغة",
  "settings.darkMode": "الوضع الداكن",
  "settings.rtl": "من اليمين لليسار (عربي)",
  "settings.clinic": "بيانات العيادة",
  "settings.clinicName": "اسم العيادة",
  "settings.address": "العنوان",
  "settings.phone": "الهاتف",
  "settings.save": "حفظ التغييرات",

  "status.confirmed": "مؤكد",
  "status.pending": "معلق",
  "status.cancelled": "ملغي",
  "status.completed": "مكتمل",
  "status.active": "نشط",
  "status.followup": "متابعة",
  "status.new": "جديد",

  "type.consultation": "استشارة",
  "type.followup": "متابعة",
  "type.emergency": "طوارئ",
  "type.checkup": "كشف",

  "gender.male": "ذكر",
  "gender.female": "أنثى",
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedLang = (localStorage.getItem("lang") as Lang | null) || "en";
    const savedTheme = (localStorage.getItem("theme") as Theme | null) || "light";
    setLangState(savedLang);
    setThemeState(savedTheme);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: setLangState,
      theme,
      setTheme: setThemeState,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (key) => dicts[lang][key] ?? dicts.en[key] ?? key,
    }),
    [lang, theme],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
