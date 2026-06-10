"use client";

import { MotionConfig } from "framer-motion";

/**
 * Site-wide motion settings. `reducedMotion="user"` makes Framer Motion respect
 * the OS "reduce motion" setting automatically — transform/scale animations are
 * skipped while opacity fades stay, keeping the experience accessible.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
