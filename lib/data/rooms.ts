export type RoomFeatureKey =
  | "wifi"
  | "breakfast"
  | "garden"
  | "parking"
  | "jacuzzi"
  | "pet";

export interface Room {
  id: string;
  name: string;
  slug: string;
  price: number;
  capacity: number;
  description: { tr: string; en: string };
  longDescription: { tr: string; en: string };
  image: string;
  gallery: string[];
  features: RoomFeatureKey[];
}

export const rooms: Room[] = [
  {
    id: "garden-suite",
    name: "Garden Suite",
    slug: "garden-suite",
    price: 1500,
    capacity: 2,
    description: {
      tr: "Bahçe manzaralı, özel teraslı süit.",
      en: "Garden view suite with private terrace.",
    },
    longDescription: {
      tr: "Lavanta tarlalarına bakan özel terasıyla Garden Suite, dingin bir kaçamak sunar. Geniş penceler, doğal ışık ve el yapımı mobilyalarla döşenmiş bu süitte, sabah kahvenizi kuş sesleri eşliğinde yudumlayabilirsiniz.",
      en: "With its private terrace overlooking the lavender fields, the Garden Suite offers a serene escape. Furnished with large windows, natural light and handcrafted furniture, you can sip your morning coffee accompanied by birdsong.",
    },
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    ],
    features: ["wifi", "breakfast", "garden", "parking"],
  },
  {
    id: "mystery-room",
    name: "Mystery Room",
    slug: "mystery-room",
    price: 1200,
    capacity: 2,
    description: {
      tr: "Gizemli atmosfer, jakuzili oda.",
      en: "Mysterious atmosphere, room with jacuzzi.",
    },
    longDescription: {
      tr: "Alacakaranlık tonlarında dekore edilen Mystery Room, özel jakuzisi ve loş aydınlatmasıyla romantik bir atmosfer yaratır. Mor ve toprak tonları, bahçenin gizemini odanın içine taşır.",
      en: "Decorated in dusk tones, the Mystery Room creates a romantic atmosphere with its private jacuzzi and dim lighting. Purple and earthy tones carry the mystery of the garden into the room.",
    },
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
    ],
    features: ["wifi", "breakfast", "jacuzzi", "garden"],
  },
  {
    id: "treehouse-cabin",
    name: "Treehouse Cabin",
    slug: "treehouse-cabin",
    price: 2000,
    capacity: 4,
    description: {
      tr: "Ağaçların arasında huzur dolu kaçamak.",
      en: "Peaceful escape among the trees.",
    },
    longDescription: {
      tr: "Yüzyıllık ağaçların arasına kurulu Treehouse Cabin, dört kişiye kadar konaklama imkânı sunar. Ahşap dokular, panoramik orman manzarası ve özel balkonuyla doğayla bütünleşmiş bir deneyim yaşatır.",
      en: "Built among century-old trees, the Treehouse Cabin accommodates up to four guests. With wooden textures, panoramic forest views and a private balcony, it offers an experience fully integrated with nature.",
    },
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&q=80",
    ],
    features: ["wifi", "breakfast", "garden", "parking", "pet"],
  },
];

export function getRoom(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}
