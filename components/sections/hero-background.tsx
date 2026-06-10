import { CSSProperties } from "react";
import Image from "next/image";
import { BLUR } from "@/lib/blur";

/**
 * Hero background:
 *  - Golden-hour vineyard photo (Unsplash) as the base image
 *  - Animated mesh gradient (#3D2817 → #7B6B8D → #F8F6F1) blended over it on a
 *    slow 15s loop, tinting the photo with the brand palette
 *  - 20 subtle floating particles
 *  - SVG noise texture overlay for an organic feel
 *  - Static gradient fallback on mobile / reduced-motion (handled in globals.css)
 *
 * Particle values are deterministic (derived from the index) so server and
 * client markup match — no hydration mismatch, no client JS required.
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=1920&q=80&auto=format&fit=crop";

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

// Deterministic pseudo-random in [0,1) from an integer seed.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 20 }, (_, i) => {
  const x = 4 + rand(i + 1) * 92; // left %
  const size = 3 + rand(i + 2) * 6; // px
  const duration = 14 + rand(i + 3) * 14; // s
  const delay = rand(i + 4) * 15; // s
  const drift = (rand(i + 5) - 0.5) * 80; // px horizontal drift
  const opacity = 0.25 + rand(i + 6) * 0.45;
  return { x, size, duration, delay, drift, opacity };
});

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover"
      />
      <div
        className="hero-bg__mesh"
        style={{ mixBlendMode: "soft-light", opacity: 0.6 }}
      />
      <div className="hero-bg__noise" style={{ backgroundImage: `url("${NOISE}")` }} />
      <div className="hero-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={
              {
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--drift": `${p.drift}px`,
                "--opacity": p.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
