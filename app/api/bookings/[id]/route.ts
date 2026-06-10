import { NextResponse } from "next/server";
import { z } from "zod";
import { updateBooking, deleteBooking } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const json = await request.json();
    const { status } = patchSchema.parse(json);
    const booking = await updateBooking(params.id, { status });
    if (!booking) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }
    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false }, { status: 422 });
    }
    console.error("[bookings:patch] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const removed = await deleteBooking(params.id);
    if (!removed) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[bookings:delete] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
