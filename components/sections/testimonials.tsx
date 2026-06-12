"use client";

import { Quote, Star } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function Testimonials({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.testimonials;
  const fmt = (v: number) =>
    locale === "tr" ? v.toFixed(1).replace(".", ",") : v.toFixed(1);

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-max">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="label-eyebrow-light">{t.label}</span>
          <h2 className="accent-underline accent-underline-center font-serif text-3xl font-bold sm:text-4xl">
            {t.heading}
          </h2>
        </Reveal>

        {/* Score panel */}
        <Reveal className="mx-auto mb-12 grid max-w-4xl gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="flex flex-col items-center justify-center border-white/10 text-center lg:border-r lg:pr-12">
            <span className="font-serif text-6xl font-bold text-accent-light">
              {fmt(t.score)}
            </span>
            <span className="mt-1 text-sm text-white/50">/ {t.scoreMax}</span>
            <span className="mt-3 rounded-full bg-accent/20 px-4 py-1 font-semibold text-accent-light">
              {t.scoreLabel}
            </span>
            <span className="mt-3 flex items-center gap-1.5 text-sm text-white/60">
              <Star className="h-4 w-4 fill-accent-light text-accent-light" />
              {t.reviewCount}
            </span>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              {t.categoriesHeading}
            </p>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.categories.map((c) => (
                <li key={c.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white/80">{c.label}</span>
                    <span className="font-semibold text-accent-light">
                      {fmt(c.value)}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-accent-light"
                      style={{ width: `${(c.value / t.scoreMax) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Review cards */}
        <Stagger className="grid gap-6 md:grid-cols-3">
          {t.items.map((item) => (
            <StaggerItem
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <Quote className="mb-4 h-8 w-8 text-accent-light" />
              <span className="mb-3 w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-light">
                {item.focus}
              </span>
              <p className="flex-1 text-base leading-relaxed text-white/85">
                “{item.text}”
              </p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-serif text-lg font-semibold text-accent-light">
                  {item.name}
                </p>
                <p className="text-sm text-white/60">{item.location}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
