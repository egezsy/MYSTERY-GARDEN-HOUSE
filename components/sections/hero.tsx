"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { href } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { RevealText, Magnetic } from "@/components/motion";
import { HeroBackground } from "./hero-background";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background drifts at ~0.5x scroll speed; content fades + lifts away.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "40%"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax background (taller than the section to avoid edge gaps) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-[12%] h-[124%]"
      >
        <HeroBackground />
      </motion.div>

      {/* Dark overlay keeps white text readable over the lighter cream zones */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary-dark/35 to-primary-dark/45" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-max relative z-10 flex flex-col items-center px-4 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent-light"
        >
          Şirince · İzmir
        </motion.span>

        <h1 className="font-serif text-3xl font-bold leading-tight drop-shadow-md sm:text-5xl lg:text-6xl">
          <RevealText text={dict.hero.title} onLoad delay={0.15} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/90 sm:text-xl lg:text-2xl"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Magnetic>
            <Button asChild variant="accent" size="lg">
              <Link href={href(locale, "contact")}>{dict.hero.cta}</Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              asChild
              size="lg"
              className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href={href(locale, "rooms")}>{dict.rooms.viewAll}</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <Link
          href="#story"
          aria-label={dict.hero.scroll}
          className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-white"
        >
          <span className="text-xs uppercase tracking-widest">
            {dict.hero.scroll}
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce-slow" />
        </Link>
      </motion.div>
    </section>
  );
}
