"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "motion/react";
import type { StoreApp } from "@/lib/types";
import { playImg } from "@/lib/img";

/** Two counter-tilted ribbons of game names that skew with scroll velocity. */
export default function Marquee({ apps }: { apps: StoreApp[] }) {
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 100, damping: 30 });
  const skew = useTransform(velocity, [-2000, 2000], [-6, 6], { clamp: true });

  const items = [...apps, ...apps];

  const Row = ({ reverse = false, tone }: { reverse?: boolean; tone: "ink" | "sun" }) => (
    <div
      className={`flex overflow-hidden py-4 ${tone === "ink" ? "bg-ink text-white" : "bg-sun text-ink"}`}
    >
      <div
        className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((a, i) => (
          <span key={i} className="flex items-center gap-4 font-display text-2xl font-extrabold whitespace-nowrap sm:text-4xl">
            <Image
              src={playImg(a.icon, "s96")}
              alt=""
              width={44}
              height={44}
              className="h-9 w-9 rounded-xl sm:h-11 sm:w-11"
            />
            {a.name.split(":")[0]}
            <span className={tone === "ink" ? "text-sun" : "text-coral"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-label="Our games" className="relative z-10 -my-4 overflow-hidden py-10">
      <motion.div style={{ skewY: skew }} className="-rotate-2 scale-105">
        <Row tone="ink" />
      </motion.div>
      <motion.div style={{ skewY: skew }} className="-mt-3 rotate-1 scale-105">
        <Row tone="sun" reverse />
      </motion.div>
    </section>
  );
}
