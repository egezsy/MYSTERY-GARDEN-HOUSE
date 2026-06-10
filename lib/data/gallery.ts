export type GalleryCategory = "garden" | "rooms" | "food" | "details";

export interface GalleryImage {
  src: string;
  category: GalleryCategory;
  alt: { tr: string; en: string };
}

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1000&q=80",
    category: "garden",
    alt: { tr: "Sabah sisinde gizli bahçe", en: "Secret garden in morning mist" },
  },
  {
    src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1000&q=80",
    category: "garden",
    alt: { tr: "Gün batımında lavanta tarlası", en: "Lavender field at sunset" },
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80",
    category: "rooms",
    alt: { tr: "Doğal ışıklı butik oda", en: "Boutique room with natural light" },
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1000&q=80",
    category: "rooms",
    alt: { tr: "Bahçe manzaralı banyo", en: "Bathroom with garden view" },
  },
  {
    src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1000&q=80",
    category: "food",
    alt: { tr: "Bahçede taze kahvaltı", en: "Fresh breakfast in the garden" },
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80",
    category: "food",
    alt: { tr: "Mum ışığında bahçe yemeği", en: "Candlelit garden dinner" },
  },
  {
    src: "https://images.unsplash.com/photo-1582879304171-8c6c0c6a8e8f?w=1000&q=80",
    category: "details",
    alt: { tr: "Ahşap kapıda antika anahtar", en: "Vintage key on a wooden door" },
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000&q=80",
    category: "garden",
    alt: { tr: "Çiçek açan bahçe patikası", en: "Blooming garden path" },
  },
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1000&q=80",
    category: "rooms",
    alt: { tr: "Rahat yatak odası köşesi", en: "Cozy bedroom corner" },
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=80",
    category: "garden",
    alt: { tr: "Yıldızların altında bahçe", en: "Garden under the stars" },
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1000&q=80",
    category: "food",
    alt: { tr: "Organik kahvaltı tabağı", en: "Organic breakfast plate" },
  },
  {
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&q=80",
    category: "details",
    alt: { tr: "Bahçeden detaylar", en: "Details from the garden" },
  },
];
