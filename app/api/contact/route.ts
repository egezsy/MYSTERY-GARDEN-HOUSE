import { NextResponse } from "next/server";
import { z } from "zod";
import { addContact } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);

    const message = await addContact({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    });

    console.log(
      `[contact] New message from ${data.name} <${data.email}> (#${message.id})`,
    );

    return NextResponse.json({ ok: true, id: message.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, errors: error.flatten() },
        { status: 422 },
      );
    }
    console.error("[contact] error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
