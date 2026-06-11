"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, CalendarCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { href, routes, CONTACT } from "@/lib/nav";

/**
 * Sticky bottom action bar shown only on mobile (lg:hidden). Hidden on the
 * contact page, where the booking form already lives. Respects the iOS
 * home-indicator safe area.
 */
export function MobileCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  if (pathname?.includes(`/${routes.contact}`)) return null;

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-primary/95 backdrop-blur-md lg:hidden">
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={CONTACT.phoneHref}
          aria-label={dict.ctaSection.call}
          className="tap flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-white/20 px-4 text-white active:bg-white/10"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          href={href(locale, "contact")}
          className="tap flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-base font-semibold text-white active:bg-accent-dark"
        >
          <CalendarCheck className="h-5 w-5" />
          {dict.hero.cta}
        </Link>
      </div>
    </div>
  );
}
