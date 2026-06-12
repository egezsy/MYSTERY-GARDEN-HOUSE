import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { RoomsGrid } from "@/components/rooms/rooms-grid";
import { Facilities } from "@/components/sections/facilities";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.nav.rooms };
}

export default function RoomsPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  return (
    <>
      <PageHeader
        title={dict.rooms.heading}
        subtitle={dict.rooms.subheading}
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=80"
      />
      <section className="section-padding bg-cream">
        <div className="container-max">
          <RoomsGrid locale={params.lang} dict={dict} />
        </div>
      </section>
      <Facilities dict={dict} />
    </>
  );
}
