"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contactForm;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  const schema = z.object({
    name: z.string().min(2, dict.bookingForm.errors.required),
    email: z.string().email(dict.bookingForm.errors.email),
    phone: z.string().optional(),
    message: z.string().min(5, dict.bookingForm.errors.required),
  });
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <p className="text-lg font-medium text-primary">{t.success}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {t.submit}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <h3 className="font-serif text-2xl font-semibold text-primary">
        {t.heading}
      </h3>

      <div className="space-y-1.5">
        <Label htmlFor="c-name">{t.name}</Label>
        <Input id="c-name" placeholder={t.namePlaceholder} {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="c-email">{t.email}</Label>
          <Input
            id="c-email"
            type="email"
            inputMode="email"
            placeholder={t.emailPlaceholder}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone">{t.phone}</Label>
          <Input
            id="c-phone"
            type="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="c-message">{t.message}</Label>
        <Textarea
          id="c-message"
          placeholder={t.messagePlaceholder}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{t.error}</p>
      )}

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? t.sending : t.submit}
      </Button>
    </form>
  );
}
