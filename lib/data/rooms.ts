export type RoomFeatureKey =
  | "wifi"
  | "ac"
  | "privateBathroom"
  | "tv"
  | "kettle"
  | "outdoorDining"
  | "gardenView"
  | "courtyardView"
  | "terrace";

export interface Room {
  id: string;
  slug: string;
  name: { tr: string; en: string };
  capacity: number;
  /** Room size in square metres. */
  size: number;
  beds: { tr: string; en: string };
  description: { tr: string; en: string };
  longDescription: { tr: string; en: string };
  image: string;
  gallery: string[];
  features: RoomFeatureKey[];
  /** Shown in the home-page preview (3 featured rooms). */
  featured: boolean;
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

const viewFeatures: RoomFeatureKey[] = [
  "gardenView",
  "courtyardView",
  "ac",
  "terrace",
  "privateBathroom",
  "kettle",
  "outdoorDining",
  "wifi",
];

export const rooms: Room[] = [
  {
    id: "large-double",
    slug: "buyuk-cift-kisilik-oda",
    name: { tr: "Büyük Çift Kişilik Oda", en: "Large Double Room" },
    capacity: 2,
    size: 25,
    beds: { tr: "1 büyük çift kişilik yatak", en: "1 large double bed" },
    description: {
      tr: "Ferah ve konforlu, bahçe manzaralı büyük çift kişilik oda.",
      en: "Spacious and comfortable large double room with garden view.",
    },
    longDescription: {
      tr: "Ferah tasarımı, bahçe ve iç avlu manzarasıyla büyük çift kişilik odamız konforlu bir konaklama sunar. Büyük çift kişilik yatağı, kliması ve özel banyosuyla tarihi sur içinde huzurlu bir mola için idealdir.",
      en: "With its spacious design and views of the garden and inner courtyard, our large double room offers a comfortable stay. Featuring a large double bed, air conditioning and a private bathroom, it is ideal for a peaceful break inside the historic walled city.",
    },
    image: img("1631049307264-da0ec9d70304"),
    gallery: [
      img("1631049307264-da0ec9d70304"),
      img("1560448204-e02f11c3d0e2"),
      img("1582719478250-c89cae4dc85b"),
      img("1566073771259-6a8506099945"),
    ],
    features: viewFeatures,
    featured: false,
  },
  {
    id: "twin",
    slug: "standart-iki-yatakli-oda",
    name: { tr: "Standart İki Yataklı Oda", en: "Standard Twin Room" },
    capacity: 2,
    size: 25,
    beds: { tr: "2 tek kişilik yatak", en: "2 single beds" },
    description: {
      tr: "Pratik ve konforlu, iki ayrı yataklı standart oda.",
      en: "Practical and comfortable standard twin room.",
    },
    longDescription: {
      tr: "İki ayrı tek kişilik yatağıyla pratik ve konforlu standart odamız, arkadaşlar ve iş seyahatleri için uygundur. Bahçe ve iç avlu manzarası, klima ve özel banyo ile dinlendirici bir konaklama sağlar.",
      en: "With two separate single beds, our practical and comfortable standard twin room suits friends and business travellers. Garden and courtyard views, air conditioning and a private bathroom ensure a restful stay.",
    },
    image: img("1582719478250-c89cae4dc85b"),
    gallery: [
      img("1582719478250-c89cae4dc85b"),
      img("1560448204-e02f11c3d0e2"),
      img("1566073771259-6a8506099945"),
      img("1590490360182-c33d57733427"),
    ],
    features: viewFeatures,
    featured: false,
  },
  {
    id: "deluxe-double",
    slug: "deluxe-cift-kisilik-oda",
    name: { tr: "Deluxe Çift Kişilik Oda", en: "Deluxe Double Room" },
    capacity: 2,
    size: 20,
    beds: { tr: "1 büyük çift kişilik yatak", en: "1 large double bed" },
    description: {
      tr: "Lüks detaylarla donatılmış, yüksek konfor için ideal deluxe oda.",
      en: "Luxury details, ideal for a high-comfort stay.",
    },
    longDescription: {
      tr: "Lüks detaylarla donatılan deluxe çift kişilik odamız yüksek konfor için tasarlandı. Büyük çift kişilik yatağı, bahçe ve iç avlu manzarası, verandası ve özel banyosuyla unutulmaz bir konaklama vaat eder.",
      en: "Appointed with luxurious details, our deluxe double room is designed for a high-comfort stay. With a large double bed, garden and courtyard views, a terrace and a private bathroom, it promises a memorable stay.",
    },
    image: img("1611892440504-42a792e24d32"),
    gallery: [
      img("1611892440504-42a792e24d32"),
      img("1591088398332-8a7791972843"),
      img("1584132967334-10e028bd69f7"),
      img("1618773928121-c32242e63f39"),
    ],
    features: viewFeatures,
    featured: true,
  },
  {
    id: "quad",
    slug: "dort-kisilik-oda",
    name: { tr: "Dört Kişilik Oda", en: "Quad Room" },
    capacity: 4,
    size: 35,
    beds: {
      tr: "2 tek kişilik yatak + 1 çift kişilik yatak",
      en: "2 single beds + 1 double bed",
    },
    description: {
      tr: "Geniş aile ve arkadaş grupları için ideal, ferah dört kişilik oda.",
      en: "Spacious quad room ideal for families and friend groups.",
    },
    longDescription: {
      tr: "35 m²'lik ferah alanıyla dört kişilik odamız aileler ve arkadaş grupları için idealdir. İki tek kişilik ve bir çift kişilik yatağı, kliması, düz ekran TV'si ve özel banyosuyla geniş gruplara konforlu bir konaklama sunar.",
      en: "With a spacious 35 m² layout, our quad room is ideal for families and groups of friends. Two single beds and one double bed, air conditioning, a flat-screen TV and a private bathroom provide comfortable accommodation for larger groups.",
    },
    image: img("1520250497591-112f2f40a3f4"),
    gallery: [
      img("1520250497591-112f2f40a3f4"),
      img("1449158743715-0a90ebb6d2d8"),
      img("1542718610-a1d656d1884c"),
      img("1566073771259-6a8506099945"),
    ],
    features: [
      "ac",
      "privateBathroom",
      "tv",
      "kettle",
      "outdoorDining",
      "wifi",
    ],
    featured: true,
  },
  {
    id: "single",
    slug: "ekonomik-tek-kisilik-oda",
    name: { tr: "Ekonomik Tek Kişilik Oda", en: "Economy Single Room" },
    capacity: 1,
    size: 15,
    beds: { tr: "1 tek kişilik yatak", en: "1 single bed" },
    description: {
      tr: "Bütçe dostu, konforlu tek kişilik oda.",
      en: "Budget-friendly, comfortable single room.",
    },
    longDescription: {
      tr: "Bütçe dostu ekonomik tek kişilik odamız tek başına seyahat edenler için konforlu ve pratik bir seçenektir. Bahçe ve iç avlu manzarası, klima ve özel banyo ile keyifli bir konaklama sunar.",
      en: "Our budget-friendly economy single room is a comfortable and practical option for solo travellers. Garden and courtyard views, air conditioning and a private bathroom make for a pleasant stay.",
    },
    image: img("1590490360182-c33d57733427"),
    gallery: [
      img("1590490360182-c33d57733427"),
      img("1560448204-e02f11c3d0e2"),
      img("1582719478250-c89cae4dc85b"),
      img("1631049307264-da0ec9d70304"),
    ],
    features: viewFeatures,
    featured: false,
  },
  {
    id: "triple",
    slug: "uc-kisilik-oda",
    name: { tr: "Üç Kişilik Oda", en: "Triple Room" },
    capacity: 3,
    size: 25,
    beds: {
      tr: "1 tek kişilik yatak + 1 büyük çift kişilik yatak",
      en: "1 single bed + 1 large double bed",
    },
    description: {
      tr: "Bahçe manzaralı, konforlu üç kişilik oda.",
      en: "Comfortable triple room with garden view.",
    },
    longDescription: {
      tr: "Bir tek kişilik ve bir büyük çift kişilik yatağıyla üç kişilik odamız küçük aileler ve arkadaş grupları için konforlu bir seçenektir. Bahçe ve iç avlu manzarası, verandası ve özel banyosuyla huzurlu bir konaklama sunar.",
      en: "With one single bed and one large double bed, our triple room is a comfortable choice for small families and groups of friends. Garden and courtyard views, a terrace and a private bathroom offer a peaceful stay.",
    },
    image: img("1591088398332-8a7791972843"),
    gallery: [
      img("1591088398332-8a7791972843"),
      img("1611892440504-42a792e24d32"),
      img("1584132967334-10e028bd69f7"),
      img("1618773928121-c32242e63f39"),
    ],
    features: viewFeatures,
    featured: true,
  },
];

export const featuredRooms = rooms.filter((r) => r.featured);

export function getRoom(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
