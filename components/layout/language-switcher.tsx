"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";
import { i18n } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();

  function localizedPath(target: Locale) {
    if (!pathname) return `/${target}`;
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash), segments[1] is current locale
    if ((i18n.locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      return `/${target}${pathname}`;
    }
    return segments.join("/") || `/${target}`;
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/25 p-0.5 text-sm font-semibold",
        className,
      )}
      aria-label="Language switcher"
    >
      {i18n.locales.map((l) => (
        <Link
          key={l}
          href={localizedPath(l as Locale)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "flex min-h-[32px] min-w-[40px] items-center justify-center rounded-full px-2.5 transition-colors",
            l === locale
              ? "bg-accent text-white"
              : "text-current opacity-70 hover:opacity-100",
          )}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
