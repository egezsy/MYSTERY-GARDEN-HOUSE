import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { PageHeader } from "@/components/layout/page-header";
import { GalleryView } from "@/components/gallery/gallery-view";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  return { title: dict.gallery.title };
}

export default function GalleryPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  return (
    <>
      <PageHeader
        title={dict.gallery.title}
        subtitle={dict.gallery.subtitle}
        image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
      />
      <section className="section-padding bg-cream">
        <div className="container-max">
          <GalleryView locale={params.lang} dict={dict} />
        </div>
      </section>
    </>
  );
}
