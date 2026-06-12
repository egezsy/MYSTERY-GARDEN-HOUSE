"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { rooms } from "@/lib/data/rooms";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCard } from "./room-card";

type Filter = "all" | "one" | "two" | "three" | "four";

const filterCapacity: Record<Exclude<Filter, "all">, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};

export function RoomsGrid({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return rooms;
    return rooms.filter((r) => r.capacity === filterCapacity[filter]);
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
          <TabsTrigger value="one">{dict.rooms.filters.one}</TabsTrigger>
          <TabsTrigger value="two">{dict.rooms.filters.two}</TabsTrigger>
          <TabsTrigger value="three">{dict.rooms.filters.three}</TabsTrigger>
          <TabsTrigger value="four">{dict.rooms.filters.four}</TabsTrigger>
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
