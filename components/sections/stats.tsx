"use client";

import type { Dictionary } from "@/lib/dictionaries";
import { Counter, Stagger, StaggerItem } from "@/components/motion";

export function Stats({ dict }: { dict: Dictionary }) {
  const items = [
    { to: 10, suffix: "+", label: dict.stats.years, decimals: 0 },
    { to: 6, suffix: "", label: dict.stats.rooms, decimals: 0 },
    { to: 500, suffix: "+", label: dict.stats.guests, decimals: 0 },
    { to: 9.1, suffix: "", label: dict.stats.rating, decimals: 1 },
  ];

  return (
    <section className="border-y border-accent/20 bg-primary py-14 text-white md:py-16">
      <div className="container-max">
        <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <StaggerItem
              key={item.label}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-4xl font-bold text-accent-light sm:text-5xl">
                <Counter
                  to={item.to}
                  suffix={item.suffix}
                  decimals={item.decimals}
                />
              </span>
              <span className="mt-2 text-sm uppercase tracking-wide text-white/70 sm:text-base">
                {item.label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
