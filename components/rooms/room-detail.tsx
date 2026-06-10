"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Users, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import type { Room } from "@/lib/data/rooms";
import { featureIcons } from "@/lib/feature-icons";
import { href } from "@/lib/nav";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function RoomDetail({
  room,
  locale,
  dict,
}: {
  room: Room;
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-5">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src={room.gallery[active]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {room.gallery.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
              i === active ? "border-accent" : "border-transparent"
            }`}
            aria-label={`${room.name} ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-base text-charcoal">
          <Users className="h-5 w-5 text-accent" />
          {room.capacity} {dict.rooms.guests}
        </span>
        <span className="font-serif text-2xl font-semibold text-accent">
          {formatPrice(room.price, locale)} {dict.common.currency}
          <span className="text-base font-normal text-muted-foreground">
            {dict.rooms.perNight}
          </span>
        </span>
      </div>

      <p className="text-base leading-relaxed text-charcoal/80">
        {room.longDescription[locale]}
      </p>

      <div>
        <h4 className="mb-3 font-serif text-lg font-semibold text-primary">
          {dict.rooms.amenitiesLabel}
        </h4>
        <ul className="grid grid-cols-2 gap-2">
          {room.features.map((f) => {
            const Icon = featureIcons[f];
            return (
              <li
                key={f}
                className="flex items-center gap-2 text-base text-charcoal"
              >
                <Check className="h-4 w-4 text-accent" />
                <Icon className="h-4 w-4 text-accent" />
                {dict.amenities.items[f].title}
              </li>
            );
          })}
        </ul>
      </div>

      <Button asChild variant="accent" size="lg" className="w-full">
        <Link href={`${href(locale, "contact")}?room=${room.id}`}>
          {dict.rooms.book}
        </Link>
      </Button>
    </div>
  );
}
