import { NextResponse } from "next/server";
import { z } from "zod";
import {
  verifyCredentials,
  setAdminSession,
  clearAdminSession,
} from "@/lib/auth";

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  try {
    const { username, password } = schema.parse(await request.json());
    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    setAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

// Logout
export async function DELETE() {
  clearAdminSession();
  return NextResponse.json({ ok: true });
}
