import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { RoomsPreview } from "@/components/sections/rooms-preview";
import { Amenities } from "@/components/sections/amenities";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  return (
    <>
      <Hero locale={params.lang} dict={dict} />
      <Story locale={params.lang} dict={dict} />
      <RoomsPreview locale={params.lang} dict={dict} />
      <Amenities dict={dict} />
      <Stats dict={dict} />
      <Testimonials locale={params.lang} dict={dict} />
      <CtaSection locale={params.lang} dict={dict} />
    </>
  );
}
