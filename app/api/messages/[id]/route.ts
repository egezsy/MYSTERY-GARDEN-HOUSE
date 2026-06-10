import { NextResponse } from "next/server";
import { deleteContact } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAdmin()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const removed = await deleteContact(params.id);
    if (!removed) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[messages:delete] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
