"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { rooms, getRoom } from "@/lib/data/rooms";
import { href } from "@/lib/nav";
import { nightsBetween, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function BookingForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.bookingForm;
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = todayISO();

  const schema = useMemo(
    () =>
      z
        .object({
          guestName: z.string().min(2, dict.bookingForm.errors.required),
          email: z.string().email(dict.bookingForm.errors.email),
          phone: z.string().min(5, dict.bookingForm.errors.required),
          roomId: z.string().min(1, dict.bookingForm.errors.required),
          checkIn: z.string().min(1, dict.bookingForm.errors.required),
          checkOut: z.string().min(1, dict.bookingForm.errors.required),
          guests: z.string().min(1),
          specialRequests: z.string().optional(),
        })
        .refine((d) => d.checkIn >= today, {
          message: dict.bookingForm.errors.pastDate,
          path: ["checkIn"],
        })
        .refine((d) => d.checkOut > d.checkIn, {
          message: dict.bookingForm.errors.dateOrder,
          path: ["checkOut"],
        }),
    [dict, today],
  );
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      guestName: "",
      email: "",
      phone: "",
      roomId: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      specialRequests: "",
    },
  });

  // Pre-select room from ?room= query parameter
  useEffect(() => {
    const r = searchParams.get("room");
    if (r && getRoom(r)) setValue("roomId", r);
  }, [searchParams, setValue]);

  const roomId = watch("roomId");
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const selectedRoom = getRoom(roomId);
  const nights =
    checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  async function onSubmit(values: Values) {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, guests: Number(values.guests) }),
    });
    if (!res.ok) {
      alert(t.error);
      return;
    }
    const data = await res.json();
    router.push(`${href(locale, "booking")}?ref=${data.reference}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <h3 className="font-serif text-2xl font-semibold text-primary">
          {t.heading}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.subheading}</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="b-name">{t.name}</Label>
        <Input
          id="b-name"
          placeholder={t.namePlaceholder}
          {...register("guestName")}
        />
        {errors.guestName && (
          <p className="text-sm text-destructive">{errors.guestName.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-email">{t.email}</Label>
          <Input
            id="b-email"
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
          <Label htmlFor="b-phone">{t.phone}</Label>
          <Input
            id="b-phone"
            type="tel"
            inputMode="tel"
            placeholder={t.phonePlaceholder}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-checkin">{t.checkIn}</Label>
          <Input
            id="b-checkin"
            type="date"
            min={today}
            {...register("checkIn")}
          />
          {errors.checkIn && (
            <p className="text-sm text-destructive">{errors.checkIn.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-checkout">{t.checkOut}</Label>
          <Input
            id="b-checkout"
            type="date"
            min={checkIn || today}
            {...register("checkOut")}
          />
          {errors.checkOut && (
            <p className="text-sm text-destructive">
              {errors.checkOut.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="b-room">{t.room}</Label>
          <Controller
            control={control}
            name="roomId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="b-room">
                  <SelectValue placeholder={t.roomPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} — {formatPrice(r.price, locale)}{" "}
                      {dict.common.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.roomId && (
            <p className="text-sm text-destructive">{errors.roomId.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="b-guests">{t.guests}</Label>
          <Controller
            control={control}
            name="guests"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="b-guests">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {dict.rooms.guests}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="b-requests">{t.specialRequests}</Label>
        <Textarea
          id="b-requests"
          placeholder={t.specialRequestsPlaceholder}
          {...register("specialRequests")}
        />
      </div>

      {selectedRoom && nights > 0 && (
        <div className="flex items-center justify-between rounded-md border border-accent/30 bg-accent/10 px-4 py-3">
          <span className="text-base text-charcoal">
            {nights} {t.nights} × {formatPrice(selectedRoom.price, locale)}{" "}
            {dict.common.currency}
          </span>
          <span className="font-serif text-xl font-semibold text-accent">
            {t.estimatedTotal}: {formatPrice(total, locale)}{" "}
            {dict.common.currency}
          </span>
        </div>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? t.submitting : t.submit}
      </Button>
    </form>
  );
}
