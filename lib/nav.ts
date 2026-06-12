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

/** External Booking.com reservation URL — all "Book Now" CTAs point here. */
export const BOOKING_URL =
  "https://www.booking.com/hotel/xy/secret-garden-walled-city.tr.html?aid=318615&label=New_English_EN_CY_26744711065-zsrlVBleZFFt4cweMJc66wSM640819001028%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-64415224945%3Alp21269%3Ali%3Adem%3Adm%3Aag26744711065%3Acmp394170025&sid=c4865bc522d7e9707e277af6c5201044&dest_id=-2738254&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1781252394&srpvid=bb273a9295a40f9a&type=total&ucfs=1&";

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
