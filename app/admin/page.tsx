import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { Dashboard } from "@/components/admin/dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  // Admin UI is internal — use Turkish labels.
  const dict = getDictionary("tr");

  if (!isAdmin()) {
    return <LoginForm dict={dict} />;
  }

  const [bookings, messages] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <Dashboard
      dict={dict}
      bookings={bookings.map((b) => ({
        id: b.id,
        reference: b.reference,
        guestName: b.guestName,
        email: b.email,
        phone: b.phone,
        roomName: b.roomName,
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        guests: b.guests,
        specialRequests: b.specialRequests,
        status: b.status,
        createdAt: b.createdAt.toISOString(),
      }))}
      messages={messages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        message: m.message,
        createdAt: m.createdAt.toISOString(),
      }))}
    />
  );
}
