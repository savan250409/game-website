"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mail, Store } from "lucide-react";
import type { StoreApp } from "@/lib/types";
import { playImg } from "@/lib/img";
import { SITE } from "@/lib/site";
import PlayBadge from "./PlayBadge";

export default function CallToAction({ apps }: { apps: StoreApp[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative overflow-hidden rounded-[36px] bg-coral px-6 py-16 text-white sm:px-14 sm:py-20"
    >
      <div className="dot-grid absolute inset-0 opacity-30" />
      <motion.div
        style={{ rotate }}
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full border-[28px] border-sun/70"
      />
      <motion.div style={{ y: y1 }} className="absolute right-[8%] bottom-6 hidden gap-4 lg:flex">
        {apps.slice(0, 3).map((a, i) => (
          <motion.div key={a.id} animate={{ y: [0, -12, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}>
            <Image src={playImg(a.icon, "s192")} alt="" width={96} height={96} className="rounded-3xl shadow-lift ring-4 ring-white/80" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-10 right-[22%] hidden lg:block">
        {apps[3] && (
          <Image src={playImg(apps[3].icon, "s160")} alt="" width={76} height={76} className="rotate-12 rounded-3xl shadow-lift ring-4 ring-white/80" />
        )}
      </motion.div>

      <div className="relative max-w-2xl">
        <p className="text-sm font-bold tracking-[0.2em] text-white/80 uppercase">Ready, player one?</p>
        <h2 className="mt-4 font-display text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
          Your next favourite game is one tap away.
        </h2>
        <p className="mt-5 max-w-lg text-lg text-white/85">
          Follow {SITE.name} on Google Play to get every new release the moment it lands.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PlayBadge href={SITE.developerUrl} label="Follow us on" />
          {SITE.email ? (
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white px-5 py-3.5 font-display font-bold"
            >
              <Mail size={18} /> {SITE.email}
            </a>
          ) : (
            <a
              href={SITE.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white px-5 py-3.5 font-display font-bold"
            >
              <Store size={18} /> Developer page
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
