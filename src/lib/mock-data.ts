// Mock data for the clinic management demo.
// Names appear in both English and Arabic renderings via the demo dataset.

export type Patient = {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  gender: "male" | "female";
  phone: string;
  lastVisit: string;
  status: "active" | "followup" | "new";
  doctor: string;
  doctorAr: string;
  avatarHue: number;
};

export type Appointment = {
  id: string;
  patientId: string;
  patient: string;
  patientAr: string;
  doctor: string;
  doctorAr: string;
  date: string;
  time: string;
  type: "consultation" | "followup" | "emergency" | "checkup";
  status: "confirmed" | "pending" | "cancelled" | "completed";
};

export type Prescription = {
  id: string;
  patient: string;
  patientAr: string;
  medication: string;
  medicationAr: string;
  dosage: string;
  date: string;
  doctor: string;
  doctorAr: string;
};

export type LabResult = {
  id: string;
  patient: string;
  patientAr: string;
  test: string;
  testAr: string;
  result: "Normal" | "Abnormal" | "Pending";
  date: string;
};

export type RadiologyStudy = {
  id: string;
  patient: string;
  patientAr: string;
  type: string;
  typeAr: string;
  status: "Completed" | "Pending" | "In review";
  date: string;
};

export type Medication = {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  stock: number;
  price: number;
};

export const patients: Patient[] = [
  { id: "P-1024", name: "Ahmed Hassan", nameAr: "أحمد حسن", age: 34, gender: "male", phone: "+20 100 123 4567", lastVisit: "2026-06-28", status: "active", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", avatarHue: 210 },
  { id: "P-1025", name: "Sara Ibrahim", nameAr: "سارة إبراهيم", age: 29, gender: "female", phone: "+20 101 555 8899", lastVisit: "2026-06-27", status: "followup", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", avatarHue: 320 },
  { id: "P-1026", name: "Karim Mostafa", nameAr: "كريم مصطفى", age: 52, gender: "male", phone: "+20 102 900 1122", lastVisit: "2026-06-25", status: "active", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", avatarHue: 140 },
  { id: "P-1027", name: "Layla Mahmoud", nameAr: "ليلى محمود", age: 41, gender: "female", phone: "+20 103 445 2211", lastVisit: "2026-06-24", status: "new", doctor: "Dr. Hany Adel", doctorAr: "د. هاني عادل", avatarHue: 20 },
  { id: "P-1028", name: "Youssef Adel", nameAr: "يوسف عادل", age: 8, gender: "male", phone: "+20 104 778 3300", lastVisit: "2026-06-22", status: "followup", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", avatarHue: 260 },
  { id: "P-1029", name: "Mona Khalil", nameAr: "منى خليل", age: 63, gender: "female", phone: "+20 105 664 9911", lastVisit: "2026-06-21", status: "active", doctor: "Dr. Hany Adel", doctorAr: "د. هاني عادل", avatarHue: 340 },
  { id: "P-1030", name: "Tarek Naguib", nameAr: "طارق نجيب", age: 47, gender: "male", phone: "+20 106 220 1145", lastVisit: "2026-06-20", status: "active", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", avatarHue: 190 },
  { id: "P-1031", name: "Hana Farouk", nameAr: "هناء فاروق", age: 25, gender: "female", phone: "+20 107 998 3421", lastVisit: "2026-06-18", status: "new", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", avatarHue: 60 },
];

export const appointments: Appointment[] = [
  { id: "A-4001", patientId: "P-1024", patient: "Ahmed Hassan", patientAr: "أحمد حسن", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", date: "2026-07-01", time: "09:00", type: "consultation", status: "confirmed" },
  { id: "A-4002", patientId: "P-1025", patient: "Sara Ibrahim", patientAr: "سارة إبراهيم", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", date: "2026-07-01", time: "09:30", type: "followup", status: "confirmed" },
  { id: "A-4003", patientId: "P-1027", patient: "Layla Mahmoud", patientAr: "ليلى محمود", doctor: "Dr. Hany Adel", doctorAr: "د. هاني عادل", date: "2026-07-01", time: "10:15", type: "checkup", status: "pending" },
  { id: "A-4004", patientId: "P-1029", patient: "Mona Khalil", patientAr: "منى خليل", doctor: "Dr. Hany Adel", doctorAr: "د. هاني عادل", date: "2026-07-01", time: "11:00", type: "consultation", status: "confirmed" },
  { id: "A-4005", patientId: "P-1028", patient: "Youssef Adel", patientAr: "يوسف عادل", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", date: "2026-07-01", time: "12:00", type: "followup", status: "pending" },
  { id: "A-4006", patientId: "P-1030", patient: "Tarek Naguib", patientAr: "طارق نجيب", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", date: "2026-07-02", time: "09:45", type: "emergency", status: "confirmed" },
  { id: "A-4007", patientId: "P-1026", patient: "Karim Mostafa", patientAr: "كريم مصطفى", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي", date: "2026-07-02", time: "10:30", type: "consultation", status: "completed" },
  { id: "A-4008", patientId: "P-1031", patient: "Hana Farouk", patientAr: "هناء فاروق", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف", date: "2026-07-03", time: "14:00", type: "checkup", status: "cancelled" },
];

export const prescriptions: Prescription[] = [
  { id: "RX-9001", patient: "Ahmed Hassan", patientAr: "أحمد حسن", medication: "Amoxicillin 500mg", medicationAr: "أموكسيسيلين ٥٠٠ملغ", dosage: "1 tab × 3 / day - 7 days", date: "2026-06-28", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي" },
  { id: "RX-9002", patient: "Sara Ibrahim", patientAr: "سارة إبراهيم", medication: "Metformin 850mg", medicationAr: "ميتفورمين ٨٥٠ملغ", dosage: "1 tab × 2 / day", date: "2026-06-27", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف" },
  { id: "RX-9003", patient: "Mona Khalil", patientAr: "منى خليل", medication: "Atorvastatin 20mg", medicationAr: "أتورفاستاتين ٢٠ملغ", dosage: "1 tab / night", date: "2026-06-26", doctor: "Dr. Hany Adel", doctorAr: "د. هاني عادل" },
  { id: "RX-9004", patient: "Karim Mostafa", patientAr: "كريم مصطفى", medication: "Losartan 50mg", medicationAr: "لوسارتان ٥٠ملغ", dosage: "1 tab / morning", date: "2026-06-25", doctor: "Dr. Mohamed Ashraf", doctorAr: "د. نادية فهمي" },
  { id: "RX-9005", patient: "Youssef Adel", patientAr: "يوسف عادل", medication: "Ibuprofen 200mg", medicationAr: "إيبوبروفين ٢٠٠ملغ", dosage: "5ml × 3 / day - 5 days", date: "2026-06-22", doctor: "Dr. Omar Youssef", doctorAr: "د. عمر يوسف" },
];

export const labs: LabResult[] = [
  { id: "L-2001", patient: "Ahmed Hassan", patientAr: "أحمد حسن", test: "Complete Blood Count", testAr: "صورة دم كاملة", result: "Normal", date: "2026-06-28" },
  { id: "L-2002", patient: "Sara Ibrahim", patientAr: "سارة إبراهيم", test: "HbA1c", testAr: "السكر التراكمي", result: "Abnormal", date: "2026-06-27" },
  { id: "L-2003", patient: "Mona Khalil", patientAr: "منى خليل", test: "Lipid Profile", testAr: "دهون الدم", result: "Abnormal", date: "2026-06-26" },
  { id: "L-2004", patient: "Tarek Naguib", patientAr: "طارق نجيب", test: "Thyroid Panel", testAr: "وظائف الغدة الدرقية", result: "Normal", date: "2026-06-24" },
  { id: "L-2005", patient: "Layla Mahmoud", patientAr: "ليلى محمود", test: "Vitamin D", testAr: "فيتامين د", result: "Pending", date: "2026-06-22" },
];

export const radiology: RadiologyStudy[] = [
  { id: "R-3001", patient: "Karim Mostafa", patientAr: "كريم مصطفى", type: "Chest X-Ray", typeAr: "أشعة صدر", status: "Completed", date: "2026-06-25" },
  { id: "R-3002", patient: "Mona Khalil", patientAr: "منى خليل", type: "Knee MRI", typeAr: "رنين ركبة", status: "In review", date: "2026-06-24" },
  { id: "R-3003", patient: "Youssef Adel", patientAr: "يوسف عادل", type: "Abdominal Ultrasound", typeAr: "سونار بطن", status: "Completed", date: "2026-06-22" },
  { id: "R-3004", patient: "Tarek Naguib", patientAr: "طارق نجيب", type: "Brain CT", typeAr: "أشعة مقطعية على المخ", status: "Pending", date: "2026-06-21" },
];

export const medications: Medication[] = [
  { id: "M-01", name: "Amoxicillin 500mg", nameAr: "أموكسيسيلين ٥٠٠ملغ", category: "Antibiotic", categoryAr: "مضاد حيوي", stock: 240, price: 45 },
  { id: "M-02", name: "Metformin 850mg", nameAr: "ميتفورمين ٨٥٠ملغ", category: "Diabetes", categoryAr: "سكري", stock: 180, price: 32 },
  { id: "M-03", name: "Atorvastatin 20mg", nameAr: "أتورفاستاتين ٢٠ملغ", category: "Cardiology", categoryAr: "قلب", stock: 12, price: 78 },
  { id: "M-04", name: "Losartan 50mg", nameAr: "لوسارتان ٥٠ملغ", category: "Cardiology", categoryAr: "قلب", stock: 96, price: 55 },
  { id: "M-05", name: "Ibuprofen 200mg", nameAr: "إيبوبروفين ٢٠٠ملغ", category: "Analgesic", categoryAr: "مسكن", stock: 8, price: 22 },
  { id: "M-06", name: "Omeprazole 20mg", nameAr: "أوميبرازول ٢٠ملغ", category: "Gastro", categoryAr: "معدة", stock: 140, price: 40 },
  { id: "M-07", name: "Salbutamol Inhaler", nameAr: "بخاخ سالبوتامول", category: "Respiratory", categoryAr: "جهاز تنفسي", stock: 24, price: 120 },
];

export const weeklyVisits = [
  { day: "Mon", dayAr: "الاثنين", visits: 24 },
  { day: "Tue", dayAr: "الثلاثاء", visits: 32 },
  { day: "Wed", dayAr: "الأربعاء", visits: 28 },
  { day: "Thu", dayAr: "الخميس", visits: 41 },
  { day: "Fri", dayAr: "الجمعة", visits: 18 },
  { day: "Sat", dayAr: "السبت", visits: 36 },
  { day: "Sun", dayAr: "الأحد", visits: 30 },
];

export const appointmentTypes = [
  { key: "consultation", value: 42 },
  { key: "followup", value: 28 },
  { key: "checkup", value: 18 },
  { key: "emergency", value: 12 },
];

export const kpis = {
  totalPatients: 1284,
  todayAppointments: 24,
  pendingReports: 7,
  monthRevenue: 184500,
};
