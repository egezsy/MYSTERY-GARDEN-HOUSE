"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { rooms } from "@/lib/data/rooms";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCard } from "./room-card";

type Filter = "all" | "twoGuests" | "family" | "priceLow" | "priceHigh";

export function RoomsGrid({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    let list = [...rooms];
    if (filter === "twoGuests") list = list.filter((r) => r.capacity === 2);
    if (filter === "family") list = list.filter((r) => r.capacity >= 4);
    if (filter === "priceLow") list.sort((a, b) => a.price - b.price);
    if (filter === "priceHigh") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter]);

  return (
    <div>
      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as Filter)}
        className="mb-10 flex justify-center"
      >
        <TabsList className="overflow-x-auto no-scrollbar">
          <TabsTrigger value="all">{dict.rooms.filters.all}</TabsTrigger>
          <TabsTrigger value="twoGuests">
            {dict.rooms.filters.twoGuests}
          </TabsTrigger>
          <TabsTrigger value="family">{dict.rooms.filters.family}</TabsTrigger>
          <TabsTrigger value="priceLow">
            {dict.rooms.filters.priceLow}
          </TabsTrigger>
          <TabsTrigger value="priceHigh">
            {dict.rooms.filters.priceHigh}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">—</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((room) => (
            <RoomCard key={room.id} room={room} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
