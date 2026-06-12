"use client";

import { Wifi, Coffee, Flower2, Car, Home, PawPrint } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const items = [
  { key: "wifi", Icon: Wifi },
  { key: "breakfast", Icon: Coffee },
  { key: "garden", Icon: Flower2 },
  { key: "parking", Icon: Car },
  { key: "house", Icon: Home },
  { key: "pet", Icon: PawPrint },
] as const;

export function Amenities({ dict }: { dict: Dictionary }) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-max">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal>
            <span className="label-eyebrow">{dict.amenities.label}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="accent-underline accent-underline-center font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.amenities.heading}
            </h2>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6"
          stagger={0.08}
        >
          {items.map(({ key, Icon }) => (
            <StaggerItem
              key={key}
              pop
              className="flex flex-col items-center rounded-lg border border-border bg-stone/40 p-5 text-center transition-colors hover:border-accent hover:bg-stone"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="font-serif text-base font-semibold text-primary">
                {dict.amenities.items[key].title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                {dict.amenities.items[key].desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
