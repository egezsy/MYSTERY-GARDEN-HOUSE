import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18n, isValidLocale, type Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.lang)) return {};
  const dict = getDictionary(params.lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) notFound();
  const locale = params.lang as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} dict={dict} />
      <MotionProvider>
        <main className="flex-1">{children}</main>
      </MotionProvider>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
