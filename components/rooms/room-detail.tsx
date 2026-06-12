"use client";

import Image from "next/image";
import { useState } from "react";
import { Users, BedDouble, Maximize2, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import type { Room } from "@/lib/data/rooms";
import { featureIcons } from "@/lib/feature-icons";
import { BOOKING_URL } from "@/lib/nav";
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
          alt={room.name[locale]}
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
            aria-label={`${room.name[locale]} ${i + 1}`}
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-md bg-stone/60 px-3 py-2.5 text-sm text-charcoal">
          <Users className="h-5 w-5 shrink-0 text-accent" />
          <span>
            {room.capacity} {dict.rooms.guests}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-stone/60 px-3 py-2.5 text-sm text-charcoal">
          <Maximize2 className="h-5 w-5 shrink-0 text-accent" />
          <span>{room.size} m²</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-stone/60 px-3 py-2.5 text-sm text-charcoal">
          <BedDouble className="h-5 w-5 shrink-0 text-accent" />
          <span>{room.beds[locale]}</span>
        </div>
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
                {dict.rooms.features[f]}
              </li>
            );
          })}
        </ul>
      </div>

      <Button asChild variant="accent" size="lg" className="w-full">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          {dict.rooms.book}
        </a>
      </Button>
    </div>
  );
}
