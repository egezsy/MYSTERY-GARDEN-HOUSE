"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { href } from "@/lib/nav";
import { BLUR } from "@/lib/blur";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Story({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="story" className="section-padding bg-cream">
      <div className="container-max grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl shadow-md md:rounded-2xl lg:order-none"
        >
          <motion.div
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&q=80"
              alt={dict.story.heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div>
          <Reveal>
            <span className="label-eyebrow">{dict.story.label}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="accent-underline font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.story.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.story.p1}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.story.p2}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Button
              asChild
              variant="outline"
              className="mt-8 w-full sm:w-auto"
            >
              <Link href={href(locale, "about")}>{dict.story.cta}</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
