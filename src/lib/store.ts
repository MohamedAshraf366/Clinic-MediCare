import { useCallback, useEffect, useState } from "react";

import {
  appointments as seedAppointments,
  medications as seedMedications,
  patients as seedPatients,
  prescriptions as seedPrescriptions,
  type Appointment,
  type Medication,
  type Patient,
  type Prescription,
} from "./mock-data";

const VERSION = "v1";

function load<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(`clinic:${VERSION}:${key}`);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : seed;
  } catch {
    return seed;
  }
}

function save<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`clinic:${VERSION}:${key}`, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function useCollection<T>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(load(key, seed));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) save(key, items);
  }, [key, items, hydrated]);

  const add = useCallback((item: T) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  const reset = useCallback(() => setItems(seed), [seed]);

  return { items, add, reset, setItems };
}

export function usePatients() {
  return useCollection<Patient>("patients", seedPatients);
}
export function useAppointments() {
  return useCollection<Appointment>("appointments", seedAppointments);
}
export function usePrescriptions() {
  return useCollection<Prescription>("prescriptions", seedPrescriptions);
}
export function useMedications() {
  return useCollection<Medication>("medications", seedMedications);
}

export function nextId(prefix: string, existing: { id: string }[]): string {
  const nums = existing
    .map((e) => {
      const m = e.id.match(/(\d+)$/);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 1000;
  return `${prefix}${max + 1}`;
}
