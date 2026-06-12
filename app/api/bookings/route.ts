import { NextResponse } from "next/server";
import { z } from "zod";
import { addBooking, getBookings } from "@/lib/db";
import { getRoom } from "@/lib/data/rooms";
import { generateReference } from "@/lib/utils";
import { sendBookingNotification } from "@/lib/email";
import { isAdmin } from "@/lib/auth";

const schema = z
  .object({
    guestName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    roomId: z.string().min(1),
    checkIn: z.string().min(1),
    checkOut: z.string().min(1),
    guests: z.number().int().min(1).max(10),
    specialRequests: z.string().optional().nullable(),
  })
  .refine((d) => new Date(d.checkOut) > new Date(d.checkIn), {
    message: "checkOut must be after checkIn",
    path: ["checkOut"],
  });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);

    const room = getRoom(data.roomId);
    if (!room) {
      return NextResponse.json(
        { ok: false, error: "Invalid room" },
        { status: 422 },
      );
    }

    const booking = await addBooking({
      reference: generateReference(),
      guestName: data.guestName,
      email: data.email,
      phone: data.phone,
      roomId: data.roomId,
      roomName: room.name.tr,
      checkIn: new Date(data.checkIn).toISOString(),
      checkOut: new Date(data.checkOut).toISOString(),
      guests: data.guests,
      specialRequests: data.specialRequests || null,
      status: "pending",
    });

    await sendBookingNotification(booking);

    return NextResponse.json({ ok: true, reference: booking.reference });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.flatten() },
        { status: 422 },
      );
    }
    console.error("[bookings] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Admin: list all bookings
export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const bookings = await getBookings();
  return NextResponse.json({ ok: true, bookings });
}
