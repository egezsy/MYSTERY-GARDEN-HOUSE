import type { Locale } from "./i18n-config";
import type { Dictionary } from "./dictionaries";

/** Route slugs are shared across locales (Turkish), per the site spec. */
export const routes = {
  home: "",
  rooms: "odalar",
  about: "hakkimizda",
  gallery: "galeri",
  contact: "iletisim",
  booking: "rezervasyon",
} as const;

export function href(locale: Locale, key: keyof typeof routes) {
  const slug = routes[key];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function mainNav(locale: Locale, dict: Dictionary) {
  return [
    { key: "home" as const, label: dict.nav.home, href: href(locale, "home") },
    { key: "rooms" as const, label: dict.nav.rooms, href: href(locale, "rooms") },
    { key: "about" as const, label: dict.nav.about, href: href(locale, "about") },
    {
      key: "gallery" as const,
      label: dict.nav.gallery,
      href: href(locale, "gallery"),
    },
    {
      key: "contact" as const,
      label: dict.nav.contact,
      href: href(locale, "contact"),
    },
  ];
}

/** Shared contact constants used across CTA, footer and contact page. */
export const CONTACT = {
  phone: "+90 232 000 00 00",
  phoneHref: "tel:+902320000000",
  whatsapp: "+90 532 000 00 00",
  whatsappHref: "https://wa.me/905320000000",
  email: "info@mysterygardenhouse.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};
