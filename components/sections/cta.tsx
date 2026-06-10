"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { href, CONTACT } from "@/lib/nav";
import { BLUR } from "@/lib/blur";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

export function CtaSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1920&q=80"
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/70" />
      <Reveal className="container-max relative z-10 flex flex-col items-center py-20 text-center text-white md:py-28">
        <h2 className="max-w-3xl font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
          {dict.ctaSection.heading}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          {dict.ctaSection.subheading}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link href={href(locale, "contact")}>
              {dict.ctaSection.reserve}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <a href={CONTACT.phoneHref}>
              <Phone className="h-5 w-5" />
              {dict.ctaSection.call}
            </a>
          </Button>
          <Button asChild size="lg" variant="gold">
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              {dict.ctaSection.whatsapp}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
