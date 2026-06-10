import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarCheck,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { getBookingByReference } from "@/lib/db";
import { href, CONTACT } from "@/lib/nav";
import { formatDate, nightsBetween } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.confirmation.title };
}

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { ref?: string };
}) {
  const locale = params.lang;
  const dict = getDictionary(locale);
  const ref = searchParams.ref;

  const booking = ref ? await getBookingByReference(ref) : null;

  return (
    <section className="section-padding bg-cream pt-28 md:pt-32">
      <div className="container-max max-w-2xl">
        {!booking ? (
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-primary">
              {dict.confirmation.title}
            </h1>
            <p className="mt-4 text-base text-charcoal/80">
              {dict.confirmation.noBooking}
            </p>
            <Button asChild variant="accent" size="lg" className="mt-8">
              <Link href={href(locale, "contact")}>
                {dict.confirmation.goToBooking}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-11 w-11" />
            </span>
            <h1 className="mt-6 font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.confirmation.title}
            </h1>
            <p className="mt-3 text-base text-charcoal/70">
              {dict.confirmation.subtitle}
            </p>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-charcoal/80">
              {dict.confirmation.thankYou}
            </p>

            {/* Reference */}
            <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-lg border border-accent/30 bg-accent/10 px-8 py-5">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                {dict.confirmation.referenceLabel}
              </span>
              <span className="mt-1 font-serif text-3xl font-bold tracking-wider text-primary">
                {booking.reference}
              </span>
            </div>

            {/* Summary */}
            <div className="mt-10 rounded-lg border border-border bg-white/70 p-6 text-left shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-primary">
                <CalendarCheck className="h-5 w-5 text-accent" />
                {dict.confirmation.summaryHeading}
              </h2>
              <dl className="divide-y divide-border">
                <Row label={dict.confirmation.guest} value={booking.guestName} />
                <Row label={dict.confirmation.room} value={booking.roomName} />
                <Row
                  label={dict.confirmation.checkIn}
                  value={formatDate(booking.checkIn, locale)}
                />
                <Row
                  label={dict.confirmation.checkOut}
                  value={formatDate(booking.checkOut, locale)}
                />
                <Row
                  label={dict.confirmation.nights}
                  value={String(
                    nightsBetween(booking.checkIn, booking.checkOut),
                  )}
                />
                <Row
                  label={dict.confirmation.guests}
                  value={String(booking.guests)}
                />
                <div className="flex items-center justify-between py-3">
                  <dt className="text-base text-muted-foreground">
                    {dict.confirmation.status}
                  </dt>
                  <dd>
                    <Badge variant={booking.status as never}>
                      {dict.status[booking.status as keyof typeof dict.status]}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Reminder */}
            <div className="mt-8 rounded-lg bg-stone/60 p-6">
              <h3 className="font-serif text-lg font-semibold text-primary">
                {dict.confirmation.reminderHeading}
              </h3>
              <p className="mt-1 text-sm text-charcoal/70">
                {dict.confirmation.reminderDesc}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <a href={CONTACT.phoneHref}>
                    <Phone className="h-4 w-4" /> {CONTACT.phone}
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${CONTACT.email}`}>
                    <Mail className="h-4 w-4" /> {dict.contact.email}
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <Button asChild variant="accent" size="lg" className="mt-8">
              <Link href={href(locale, "home")}>
                {dict.confirmation.backHome}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-base text-muted-foreground">{label}</dt>
      <dd className="text-right text-base font-medium text-charcoal">
        {value}
      </dd>
    </div>
  );
}
