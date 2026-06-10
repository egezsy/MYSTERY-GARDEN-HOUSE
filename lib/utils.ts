import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a human-friendly booking reference, e.g. MGH-7F3K9. */
export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MGH-${code}`;
}

export function formatDate(date: Date | string, locale: string = "tr") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function nightsBetween(checkIn: string | Date, checkOut: string | Date) {
  const a = new Date(checkIn);
  const b = new Date(checkOut);
  const diff = b.getTime() - a.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function formatPrice(amount: number, locale: string = "tr") {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US").format(
    amount,
  );
}
