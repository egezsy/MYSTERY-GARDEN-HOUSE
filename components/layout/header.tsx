"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Flower2 } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { mainNav, href } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const links = mainNav(locale, dict);

  // The navbar is a fixed overlay, so content scrolls *under* it. To stop it
  // from permanently covering content while reading, auto-hide it on
  // scroll-down and reveal it on scroll-up (native-app pattern). Near the top
  // it always stays visible.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y <= 80 || y < lastY - 4) {
        setHidden(false); // at top or scrolling up -> show
      } else if (y > lastY + 4) {
        setHidden(true); // scrolling down past the navbar -> hide
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet and reveal the navbar on navigation
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  const isActive = (linkHref: string) =>
    linkHref === `/${locale}`
      ? pathname === `/${locale}`
      : pathname.startsWith(linkHref);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 will-change-transform",
        scrolled
          ? "bg-primary/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-primary-dark/60 to-transparent",
        // Keep visible while the mobile menu is open
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container-max flex h-16 items-center justify-between gap-3 md:h-20">
        {/* Logo */}
        <Link
          href={href(locale, "home")}
          className="flex items-center gap-2 text-white"
        >
          <Flower2 className="h-6 w-6 text-accent-light md:h-7 md:w-7" />
          <span className="font-serif text-lg font-semibold leading-tight md:text-xl">
            Mystery Garden
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors hover:text-accent-light",
                isActive(link.href) && "text-accent-light",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher locale={locale} className="text-white" />
          <Button
            asChild
            variant="accent"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href={href(locale, "contact")}>{dict.nav.book}</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                aria-label={dict.nav.menuLabel}
                className="tap flex h-12 w-12 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 active:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="flex items-center gap-2">
                <Flower2 className="h-6 w-6 text-accent-light" />
                Mystery Garden
              </SheetTitle>
              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <SheetClose asChild key={link.key}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-3 text-lg font-medium text-white/90 transition-colors hover:bg-white/10",
                        isActive(link.href) && "bg-white/10 text-accent-light",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild variant="accent" size="lg" className="mt-auto">
                  <Link href={href(locale, "contact")}>{dict.nav.book}</Link>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
