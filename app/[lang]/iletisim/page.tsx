import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
} from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { CONTACT } from "@/lib/nav";
import { galleryImages } from "@/lib/data/gallery";
import { PageHeader } from "@/components/layout/page-header";
import { LocationMap } from "@/components/map/location-map";
import { ContactForm } from "@/components/forms/contact-form";
import { BookingForm } from "@/components/forms/booking-form";
import { Reveal } from "@/components/motion";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.contact.title };
}

export default function ContactPage({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const dict = getDictionary(locale);

  const infoCards = [
    {
      Icon: MapPin,
      label: dict.contact.address,
      value: dict.contact.addressValue,
    },
    {
      Icon: Phone,
      label: dict.contact.phone,
      value: CONTACT.phone,
      href: CONTACT.phoneHref,
    },
    {
      Icon: Mail,
      label: dict.contact.email,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      Icon: MessageCircle,
      label: dict.contact.whatsapp,
      value: CONTACT.whatsapp,
      href: CONTACT.whatsappHref,
    },
    {
      Icon: Clock,
      label: dict.contact.hours,
      value: dict.contact.hoursValue,
    },
  ];

  const instagram = galleryImages.slice(0, 6);

  return (
    <>
      <PageHeader
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
      />

      <section className="section-padding bg-cream">
        <div className="container-max grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          {/* Left: forms */}
          <div className="space-y-12">
            <Reveal className="rounded-lg border border-border bg-white/60 p-5 shadow-sm sm:p-7">
              <Suspense fallback={null}>
                <BookingForm locale={locale} dict={dict} />
              </Suspense>
            </Reveal>
            <Reveal
              delay={0.1}
              className="rounded-lg border border-border bg-white/60 p-5 shadow-sm sm:p-7"
            >
              <ContactForm dict={dict} />
            </Reveal>
          </div>

          {/* Right: info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-primary">
              {dict.contact.infoHeading}
            </h2>
            <ul className="space-y-3">
              {infoCards.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-stone/40 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-base text-charcoal transition-colors hover:text-accent"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-base text-charcoal">{value}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map */}
            <div className="overflow-hidden rounded-xl border border-border shadow-sm md:rounded-2xl">
              <LocationMap label="Mystery Garden House" className="h-64 w-full" />
            </div>

            {/* Instagram placeholder */}
            <div>
              <p className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-primary">
                <Instagram className="h-5 w-5 text-accent" />
                {dict.contact.instagramLabel}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {instagram.map((img) => (
                  <a
                    key={img.src}
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square overflow-hidden rounded-md"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt[locale]}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
