"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { PlayIcon } from "./PlayBadge";
import type { StoreApp } from "@/lib/types";
import { playImg } from "@/lib/img";

/** Sticky stacking cards: each game slides up over the previous one, which shrinks back. */
export default function Showcase({ apps }: { apps: StoreApp[] }) {
  const games = apps.filter((a) => a.kind === "game").slice(0, 5);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {games.map((app, i) => (
        <StackCard
          key={app.id}
          app={app}
          i={i}
          total={games.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StackCard({
  app,
  i,
  total,
  progress,
}: {
  app: StoreApp;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // Gentle zoom on the full (contained) banner — stays fully visible, no cropping.
  const imgScale = useTransform(enter, [0, 1], [1.08, 1]);
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const dark = i % 2 === 1;

  return (
    <div ref={ref} className="sticky top-0 flex h-svh items-start justify-center px-4 sm:px-8">
      <motion.div
        style={{
          scale,
          // Sit just below the fixed header, stagger each card a little, and always leave room at the bottom.
          marginTop: `${92 + i * 12}px`,
          height: `min(640px, calc(100svh - ${92 + i * 12 + 24}px))`,
        }}
        className={`relative flex w-full max-w-6xl origin-top flex-col overflow-hidden rounded-[32px] border shadow-lift md:flex-row ${
          dark ? "border-ink bg-ink text-white" : "border-line bg-paper"
        }`}
      >
        {/* Text column: header row, centred content, buttons. Content clips before buttons ever do. */}
        <div className="flex min-h-0 flex-col gap-5 p-5 sm:p-8 md:w-[42%] lg:p-9">
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-display text-sm font-bold" style={{ color: app.accent }}>
              0{i + 1} / 0{total}
            </span>
            <span className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-line"}`} />
            <span className={`text-xs font-bold uppercase ${dark ? "text-white/60" : "text-muted"}`}>{app.genre}</span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center-safe gap-4 overflow-hidden sm:gap-5 md:[container-type:size]">
            <div className="flex shrink-0 items-center gap-4">
              <Image
                src={playImg(app.icon, "s160")}
                alt=""
                width={72}
                height={72}
                className="h-14 w-14 shrink-0 rounded-2xl shadow-lift sm:h-[72px] sm:w-[72px]"
              />
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-[1.05] font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  {app.name.split(":")[0]}
                </h3>
                <p className={`mt-1.5 flex flex-wrap items-center gap-x-2 text-xs font-bold ${dark ? "text-white/60" : "text-muted"}`}>
                  {app.rating ? (
                    <span className="flex items-center gap-1">
                      <Star size={12} className="fill-sun text-sun" /> {app.rating.toFixed(1)}
                    </span>
                  ) : null}
                  <span>Free</span>
                  <span aria-hidden>·</span>
                  <span>Rated Everyone</span>
                </p>
              </div>
            </div>

            <p className={`line-clamp-3 shrink-0 text-sm leading-relaxed sm:text-base ${dark ? "text-white/75" : "text-ink-soft"}`}>
              {app.tagline}
            </p>

            <ul className="hidden shrink-0 grid-cols-2 gap-2.5 sm:[@container(min-height:300px)]:grid">
              {app.highlights.slice(0, 4).map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-xs leading-tight font-bold lg:text-sm"
                  style={{
                    background: dark ? "rgba(255,255,255,0.06)" : `${app.accent}12`,
                    border: `1px solid ${app.accent}${dark ? "55" : "33"}`,
                  }}
                >
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: app.accent }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={app.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-ink"
              style={{ background: dark ? "var(--color-sun)" : app.accent, color: dark ? undefined : "#fff" }}
            >
              <PlayIcon className="h-4 w-4" /> Play free
            </a>
            <Link
              href={`/games/${app.slug}`}
              className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-sm font-bold ${
                dark ? "border-white/30" : "border-ink"
              }`}
            >
              Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div
          className="relative min-h-[28%] flex-1 overflow-hidden md:m-3 md:min-h-0 md:rounded-[24px]"
          style={{
            background: dark
              ? `linear-gradient(140deg, ${app.accent}3d, rgba(255,255,255,0.04) 70%)`
              : `linear-gradient(140deg, ${app.accent}2e, ${app.accent}0f 70%)`,
          }}
        >
          {/* Full banner, never cropped */}
          <motion.div style={{ scale: imgScale }} className="absolute inset-0 p-3 sm:p-4">
            <div className="relative h-full w-full">
              <Image
                src={playImg(app.banner, "w1024-h500")}
                alt={app.name}
                fill
                quality={70}
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
