"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal } from "@/components/motion";

export function Testimonials({ dict }: { dict: Dictionary }) {
  const items = dict.testimonials.items;
  const [index, setIndex] = useState(0);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-max">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">
            {dict.testimonials.label}
          </span>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            {dict.testimonials.heading}
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          <Quote className="mx-auto mb-6 h-10 w-10 text-accent-light" />
          <div className="min-h-[180px] text-center sm:min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
                  “{items[index].text}”
                </p>
                <div className="mt-6">
                  <p className="font-serif text-lg font-semibold text-accent-light">
                    {items[index].name}
                  </p>
                  <p className="text-sm text-white/60">
                    {items[index].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label={dict.gallery.previous}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent-light" : "w-2.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label={dict.gallery.next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
