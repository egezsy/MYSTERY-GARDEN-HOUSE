export const i18n = {
  defaultLocale: "tr",
  locales: ["tr", "en"],
} as const;

export type Locale = (typeof i18n.locales)[number];

export function isValidLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
