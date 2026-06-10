import Image from "next/image";
import { BLUR } from "@/lib/blur";
import { Reveal, RevealText } from "@/components/motion";

export function PageHeader({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[44vh] items-center justify-center overflow-hidden pt-16 md:min-h-[52vh]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/65" />
      <div className="container-max relative z-10 py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
          <RevealText text={title} onLoad />
        </h1>
        {subtitle && (
          <Reveal delay={0.3}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
