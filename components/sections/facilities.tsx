import {
  Sparkles,
  BedDouble,
  Trees,
  ShieldCheck,
  Check,
  Info,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const pillarIcons: LucideIcon[] = [Sparkles, BedDouble, Trees, ShieldCheck];

export function Facilities({ dict }: { dict: Dictionary }) {
  const f = dict.facilities;

  return (
    <section className="section-padding bg-stone">
      <div className="container-max">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="label-eyebrow">{f.label}</span>
          <h2 className="accent-underline accent-underline-center font-serif text-3xl font-bold text-primary sm:text-4xl">
            {f.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal/80 sm:text-lg">
            {f.subheading}
          </p>
        </Reveal>

        <Reveal className="mx-auto mb-12 flex max-w-3xl items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-charcoal/80">{f.note}</p>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {f.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] ?? Sparkles;
            return (
              <StaggerItem
                key={pillar.title}
                className="rounded-2xl border border-border bg-cream p-6 shadow-sm sm:p-7"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-primary">
                    {pillar.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {pillar.groups.map((group, gi) => (
                    <div key={group.subtitle || gi}>
                      {group.subtitle && (
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                          {group.subtitle}
                        </p>
                      )}
                      <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-base text-charcoal/85"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
