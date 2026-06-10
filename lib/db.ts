import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * Tiny JSON-file database (replaces Prisma/SQLite).
 *
 * Locally, data lives in `./data/bookings.json` and `./data/contacts.json` at
 * the project root. The `data/` folder is gitignored, so every deploy / fresh
 * clone starts empty.
 *
 * On Vercel / production the project filesystem is read-only — only `/tmp` is
 * writable — so we store under `/tmp/data/` instead. This is ephemeral (cleared
 * between deploys / cold starts), which matches the "starts fresh" model.
 *
 * Writes are serialised through an in-process queue so concurrent requests
 * don't clobber each other.
 */

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: string;
  reference: string;
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  roomName: string;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guests: number;
  specialRequests: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  handled: boolean;
  createdAt: string;
}

// On Vercel/serverless the project dir is read-only; only /tmp is writable.
const USE_TMP =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const DATA_DIR = USE_TMP
  ? path.join("/tmp", "data")
  : path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

async function readJson<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// Serialise all mutating operations to avoid lost updates.
let queue: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

function byNewest<T extends { createdAt: string }>(a: T, b: T) {
  return b.createdAt.localeCompare(a.createdAt);
}

/* -------------------------------- Bookings -------------------------------- */

export async function getBookings(): Promise<Booking[]> {
  const list = await readJson<Booking>(BOOKINGS_FILE);
  return list.sort(byNewest);
}

export async function getBookingByReference(
  reference: string,
): Promise<Booking | null> {
  const list = await readJson<Booking>(BOOKINGS_FILE);
  return list.find((b) => b.reference === reference) ?? null;
}

export async function addBooking(
  input: Omit<Booking, "id" | "createdAt" | "updatedAt">,
): Promise<Booking> {
  return withLock(async () => {
    const list = await readJson<Booking>(BOOKINGS_FILE);
    const now = new Date().toISOString();
    const booking: Booking = {
      id: randomUUID(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    list.push(booking);
    await writeJson(BOOKINGS_FILE, list);
    return booking;
  });
}

export async function updateBooking(
  id: string,
  patch: Partial<Pick<Booking, "status">>,
): Promise<Booking | null> {
  return withLock(async () => {
    const list = await readJson<Booking>(BOOKINGS_FILE);
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) return null;
    list[index] = {
      ...list[index],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    await writeJson(BOOKINGS_FILE, list);
    return list[index];
  });
}

export async function deleteBooking(id: string): Promise<boolean> {
  return withLock(async () => {
    const list = await readJson<Booking>(BOOKINGS_FILE);
    const next = list.filter((b) => b.id !== id);
    if (next.length === list.length) return false;
    await writeJson(BOOKINGS_FILE, next);
    return true;
  });
}

/* -------------------------------- Contacts -------------------------------- */

export async function getContacts(): Promise<ContactMessage[]> {
  const list = await readJson<ContactMessage>(CONTACTS_FILE);
  return list.sort(byNewest);
}

export async function addContact(
  input: Omit<ContactMessage, "id" | "createdAt" | "handled">,
): Promise<ContactMessage> {
  return withLock(async () => {
    const list = await readJson<ContactMessage>(CONTACTS_FILE);
    const contact: ContactMessage = {
      id: randomUUID(),
      handled: false,
      ...input,
      createdAt: new Date().toISOString(),
    };
    list.push(contact);
    await writeJson(CONTACTS_FILE, list);
    return contact;
  });
}

export async function deleteContact(id: string): Promise<boolean> {
  return withLock(async () => {
    const list = await readJson<ContactMessage>(CONTACTS_FILE);
    const next = list.filter((c) => c.id !== id);
    if (next.length === list.length) return false;
    await writeJson(CONTACTS_FILE, next);
    return true;
  });
}
