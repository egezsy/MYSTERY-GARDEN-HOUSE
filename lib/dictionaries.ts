import "server-only";
import type { Locale } from "./i18n-config";
import tr from "./translations/tr.json";
import en from "./translations/en.json";

export type Dictionary = typeof tr;

const dictionaries: Record<Locale, Dictionary> = {
  tr: tr as Dictionary,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.tr;
}
