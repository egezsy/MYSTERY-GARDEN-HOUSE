import type { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n-config";
import { routes } from "@/lib/nav";

const BASE = "https://mysterygardenhouse.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of i18n.locales) {
    for (const slug of Object.values(routes)) {
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;
      entries.push({
        url: `${BASE}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: slug === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
