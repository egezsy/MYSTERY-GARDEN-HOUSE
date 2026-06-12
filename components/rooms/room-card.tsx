"use client";

import Image from "next/image";
import { Users, BedDouble, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import type { Room } from "@/lib/data/rooms";
import { featureIcons } from "@/lib/feature-icons";
import { BOOKING_URL } from "@/lib/nav";
import { BLUR } from "@/lib/blur";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoomDetail } from "./room-detail";

export function RoomCard({
  room,
  locale,
  dict,
}: {
  room: Room;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-cream shadow-sm transition-shadow hover:shadow-lg md:rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-sm font-semibold text-white">
          {room.size} m²
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-serif text-xl font-semibold text-primary">
            {room.name[locale]}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-accent" />
            {room.capacity} {dict.rooms.guests}
          </span>
        </div>

        <p className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <BedDouble className="h-4 w-4 text-accent" />
          {room.beds[locale]}
        </p>

        <p className="mb-4 flex-1 text-base leading-relaxed text-charcoal/80">
          {room.description[locale]}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {room.features.map((f) => {
            const Icon = featureIcons[f];
            return (
              <span
                key={f}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-stone text-accent"
                title={dict.rooms.features[f]}
              >
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </div>

        <div className="mt-auto flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                {dict.rooms.details}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{room.name[locale]}</DialogTitle>
              </DialogHeader>
              <RoomDetail room={room} locale={locale} dict={dict} />
            </DialogContent>
          </Dialog>

          <Button asChild variant="accent" size="sm" className="flex-1">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {dict.rooms.book}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
