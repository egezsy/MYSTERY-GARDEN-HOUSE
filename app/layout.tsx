import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mysterygardenhouse.com"),
  title: {
    default: "Mystery Garden House",
    template: "%s — Mystery Garden House",
  },
  description:
    "A mysterious yet welcoming escape in the heart of a misty lavender garden.",
  openGraph: {
    title: "Mystery Garden House",
    description:
      "Discover the secret of the garden — a boutique guest house in a misty lavender garden.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mystery Garden House",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
