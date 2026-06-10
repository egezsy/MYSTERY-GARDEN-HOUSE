import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
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
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status },
    });
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
    await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[bookings:delete] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
