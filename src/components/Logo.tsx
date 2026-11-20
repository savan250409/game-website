"use client";

import { motion } from "motion/react";

/** Playful block-stack mark: three tiles like a falling puzzle piece. */
export function LogoMark({ size = 36, animate = false }: { size?: number; animate?: boolean }) {
  const tiles = [
    { x: 2, y: 2, fill: "var(--color-coral)" },
    { x: 20, y: 2, fill: "var(--color-sun)" },
    { x: 2, y: 20, fill: "var(--color-mint)" },
    { x: 20, y: 20, fill: "var(--color-ink)" },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" aria-hidden>
      {tiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x}
          y={t.y}
          width={16}
          height={16}
          rx={5}
          fill={t.fill}
          initial={animate ? { y: t.y - 40, opacity: 0 } : false}
          animate={animate ? { y: t.y, opacity: 1 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="group flex items-center gap-2.5">
      <span >
        <LogoMark />
      </span>
      <span className="font-display text-xl leading-none font-extrabold tracking-tight">
        NG<span className="text-coral"> </span>Studio<span className="text-coral">.</span>
      </span>
    </span>
  );
}
