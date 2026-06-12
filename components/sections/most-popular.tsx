"use client";

import { Wifi, Car, CigaretteOff, Coffee, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal } from "@/components/motion";

/** Icons map 1:1 to facilities.pillars[0] ("En Popüler") item order. */
const icons: LucideIcon[] = [Wifi, Car, CigaretteOff, Coffee];

export function MostPopular({ dict }: { dict: Dictionary }) {
  const items = dict.facilities.pillars[0].groups[0].items;

  return (
    <section className="border-b border-border bg-cream">
      <div className="container-max">
        <Reveal>
          <ul className="grid grid-cols-2 items-center gap-x-4 gap-y-5 py-7 sm:grid-cols-4 sm:divide-x sm:divide-border sm:py-8">
            {items.map((item, i) => {
              const Icon = icons[i] ?? Wifi;
              return (
                <li
                  key={item}
                  className="flex items-center justify-center gap-2.5 text-center sm:px-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium text-charcoal sm:text-base">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
