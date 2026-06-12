import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Footprints } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { galleryImages } from "@/lib/data/gallery";
import { BLUR } from "@/lib/blur";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.about.title };
}

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const locale = params.lang;
  const dict = getDictionary(locale);
  const grid = galleryImages.slice(0, 6);

  return (
    <>
      <PageHeader
        title={dict.about.title}
        subtitle={dict.about.subtitle}
        image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80"
      />

      {/* Philosophy */}
      <section className="section-padding bg-cream">
        <div className="container-max grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-md md:rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1000&q=80"
              alt={dict.about.philosophyHeading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
          <div>
            <span className="label-eyebrow">{dict.about.philosophyLabel}</span>
            <h2 className="accent-underline font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.about.philosophyHeading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.about.philosophyP1}
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.about.philosophyP2}
            </p>
          </div>
        </div>
      </section>

      {/* Host */}
      <section className="section-padding bg-stone">
        <div className="container-max grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
              alt={dict.about.hostName}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
          <div>
            <span className="label-eyebrow">{dict.about.hostLabel}</span>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.about.hostName}
            </h2>
            <p className="mt-1 text-base font-medium text-accent">
              {dict.about.hostRole}
            </p>
            <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
              {dict.about.hostBio}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="mb-12 text-center">
            <span className="label-eyebrow">{dict.about.galleryLabel}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {grid.map((img, i) => (
              <Reveal
                key={img.src}
                delay={(i % 3) * 0.08}
                className="relative aspect-square overflow-hidden rounded-xl md:rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-stone">
        <div className="container-max">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="label-eyebrow">{dict.about.locationLabel}</span>
            <h2 className="accent-underline accent-underline-center font-serif text-3xl font-bold text-primary sm:text-4xl">
              {dict.about.locationHeading}
            </h2>
            <p className="mt-6 inline-flex items-center gap-2 text-base text-charcoal/80">
              <MapPin className="h-5 w-5 text-accent" />
              {dict.about.locationDesc}
            </p>
          </div>

          {/* Nearby historical sites */}
          <div className="mb-12">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <span className="label-eyebrow">{dict.about.nearbyLabel}</span>
              <h3 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                {dict.about.nearbyHeading}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/80">
                {dict.about.nearbyIntro}
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dict.about.nearby.map((place) => (
                <li
                  key={place.name}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-cream p-4 shadow-sm"
                >
                  <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                    <Footprints className="h-4 w-4" />
                    {place.distance}
                  </span>
                  <span className="text-base font-medium leading-snug text-charcoal">
                    {place.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border shadow-md md:rounded-2xl">
            <iframe
              title={dict.contact.mapLabel}
              src="https://www.openstreetmap.org/export/embed.html?bbox=33.930%2C35.118%2C33.952%2C35.134&layer=mapnik&marker=35.1257%2C33.9410"
              className="h-[320px] w-full md:h-[420px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
