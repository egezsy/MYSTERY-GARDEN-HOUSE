"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { rooms } from "@/lib/data/rooms";
import { href } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/rooms/room-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function RoomsPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="section-padding bg-stone">
      <div className="container-max">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <span className="label-eyebrow">{dict.rooms.label}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="accent-underline accent-underline-center font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.rooms.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.rooms.subheading}
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rooms.map((room) => (
            <StaggerItem key={room.id} className="h-full">
              <RoomCard room={room} locale={locale} dict={dict} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href={href(locale, "rooms")}>{dict.rooms.viewAll}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
