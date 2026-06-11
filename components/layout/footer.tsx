import Link from "next/link";
import {
  Flower2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import { mainNav, CONTACT } from "@/lib/nav";
import { NewsletterForm } from "./newsletter-form";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const links = mainNav(locale, dict);

  return (
    <footer className="bg-primary pb-[calc(76px+env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div className="container-max grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flower2 className="h-7 w-7 text-accent-light" />
            <span className="font-serif text-xl font-semibold">
              Mystery Garden House
            </span>
          </div>
          <p className="max-w-xs text-base leading-relaxed text-white/70">
            {dict.footer.tagline}
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="tap flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent active:bg-accent"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="tap flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent active:bg-accent"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="tap flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent active:bg-accent"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold">
            {dict.footer.explore}
          </h3>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-base text-white/70 transition-colors hover:text-accent-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold">
            {dict.footer.contact}
          </h3>
          <ul className="space-y-3 text-base text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-light" />
              <span>{dict.footer.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-accent-light" />
              <a
                href={CONTACT.phoneHref}
                className="transition-colors hover:text-accent-light"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-accent-light" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all transition-colors hover:text-accent-light"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-semibold">
            {dict.footer.newsletter}
          </h3>
          <p className="text-base text-white/70">
            {dict.footer.newsletterDesc}
          </p>
          <NewsletterForm dict={dict} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Mystery Garden House.{" "}
            {dict.footer.rights}
          </p>
          <Link
            href="/admin"
            className="transition-colors hover:text-accent-light"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
