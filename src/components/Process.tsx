"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { FlaskConical, Lightbulb, Rocket, Users } from "lucide-react";

const STEPS = [
  {
    icon: Lightbulb,
    title: "Spark an idea",
    text: "Every game starts with one simple, satisfying mechanic — a drag, a draw, a roll.",
    color: "bg-sun",
  },
  {
    icon: FlaskConical,
    title: "Prototype fast",
    text: "We build playable versions quickly and keep only what feels great in your hands.",
    color: "bg-coral",
  },
  {
    icon: Users,
    title: "Playtest & polish",
    text: "Thousands of levels are hand-tuned so difficulty grows smoothly, never unfairly.",
    color: "bg-mint",
  },
  {
    icon: Rocket,
    title: "Launch on Google Play",
    text: "Released free for Android, then improved with regular updates from your feedback.",
    color: "bg-sky",
  },
];

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl">
      <span className="absolute top-2 bottom-2 left-7 w-1 rounded-full bg-line sm:left-1/2 sm:-ml-0.5" />
      <motion.span
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-7 w-1 origin-top rounded-full bg-gradient-to-b from-sun via-coral to-sky sm:left-1/2 sm:-ml-0.5"
      />
      {STEPS.map((s, i) => {
        const right = i % 2 === 1;
        return (
          <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-5 pb-14 last:pb-0 sm:grid-cols-2 sm:gap-16">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className={`relative z-10 grid h-14 w-14 place-items-center rounded-2xl ${s.color} text-ink shadow-lift ring-8 ring-cream sm:absolute sm:left-1/2 sm:-ml-7`}
            >
              <s.icon size={24} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: right ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-3xl border border-line bg-paper p-6 shadow-soft ${
                right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"
              }`}
            >
              <span className="font-display text-sm font-bold text-coral">Step 0{i + 1}</span>
              <h3 className="mt-1 font-display text-2xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
