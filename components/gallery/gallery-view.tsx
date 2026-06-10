"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n-config";
import type { Dictionary } from "@/lib/dictionaries";
import {
  galleryImages,
  type GalleryCategory,
} from "@/lib/data/gallery";
import { BLUR } from "@/lib/blur";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Cat = "all" | GalleryCategory;

export function GalleryView({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [cat, setCat] = useState<Cat>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images = useMemo(
    () =>
      cat === "all"
        ? galleryImages
        : galleryImages.filter((i) => i.category === cat),
    [cat],
  );

  const close = useCallback(() => setLightbox(null), []);
  const move = useCallback(
    (dir: number) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, move]);

  const categories: Cat[] = ["all", "garden", "rooms", "food", "details"];

  return (
    <div>
      <Tabs
        value={cat}
        onValueChange={(v) => setCat(v as Cat)}
        className="mb-10 flex justify-center"
      >
        <TabsList className="overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <TabsTrigger key={c} value={c}>
              {dict.gallery.categories[c]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Masonry via CSS columns */}
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            onClick={() => setLightbox(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 4) * 0.08,
            }}
            className="group relative mb-3 block w-full overflow-hidden rounded-lg sm:mb-4"
          >
            <Image
              src={img.src}
              alt={img.alt[locale]}
              width={600}
              height={800}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-primary-dark/0 transition-colors group-hover:bg-primary-dark/20" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/95 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label={dict.gallery.close}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label={dict.gallery.previous}
            className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt[locale]}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <p className="absolute -bottom-9 left-0 right-0 text-center text-sm text-white/80">
              {images[lightbox].alt[locale]}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label={dict.gallery.next}
            className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
