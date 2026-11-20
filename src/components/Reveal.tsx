"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const words = title.split(" ");
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-[0.18em] text-coral uppercase ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-0.5 w-8 rounded-full bg-coral" /> {eyebrow}
      </motion.p>
      <h2 className="font-display text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.05, ease: EASE }}
            >
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
        {accent && (
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block text-coral"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: words.length * 0.05, ease: EASE }}
            >
              {accent}
            </motion.span>
          </span>
        )}
      </h2>
      {intro && (
        <Reveal delay={0.2} y={20}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
