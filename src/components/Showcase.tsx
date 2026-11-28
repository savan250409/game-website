"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import type { StoreApp } from "@/lib/types";
import { playImg } from "@/lib/img";
import SafeImage from "./SafeImage";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 3000;

/** Featured games as an auto-playing horizontal slider (right → left) with arrows + dots. */
export default function Showcase({ apps }: { apps: StoreApp[] }) {
  const games = apps.filter((a) => a.kind === "game");
  // The catalogue arrives newest-first, so the first slide is the latest game.
  const list = games.length ? games : apps;
  const n = list.length;

  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback((next: number, d: number) => {
    setState([(next + n) % n, d]);
  }, [n]);
  const next = useCallback(() => setState(([i]) => [(i + 1) % n, 1]), [n]);
  const prev = useCallback(() => setState(([i]) => [(i - 1 + n) % n, -1]), [n]);

  // Auto-play, paused on hover / off-screen / reduced-motion
  useEffect(() => {
    if (paused || n < 2 || reduce.current) return;
    const t = setInterval(() => setState(([i]) => [(i + 1) % n, 1]), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  const app = list[index];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="mx-auto mt-12 max-w-6xl px-5 sm:mt-16 sm:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative">
        {/* Slide viewport */}
        <div className="grid overflow-hidden rounded-[32px]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={app.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: EASE }}
              className="[grid-area:1/1]"
            >
              <Card app={app} index={index} total={n} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side arrows (desktop) */}
        <button
          onClick={prev}
          aria-label="Previous game"
          className="absolute top-1/2 -left-3 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper shadow-lift md:grid lg:-left-6"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          aria-label="Next game"
          className="absolute top-1/2 -right-3 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper shadow-lift md:grid lg:-right-6"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Controls: arrows (mobile) + dots */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous game"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper shadow-soft md:hidden"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {list.map((g, i) => (
            <button
              key={g.id}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Go to ${g.name}`}
              aria-current={i === index}
              className="group grid place-items-center py-2"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-7" : "w-2.5 bg-line group-hover:bg-muted"
                }`}
                style={i === index ? { background: app.accent } : undefined}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next game"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper shadow-soft md:hidden"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function Card({ app, index, total }: { app: StoreApp; index: number; total: number }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[32px] border border-line bg-paper shadow-lift">
      {/* Top: banner */}
      <div
        className="relative aspect-[1024/500] w-full shrink-0 overflow-hidden"
        style={{ background: `${app.accent}14` }}
      >
        <SafeImage
          src={playImg(app.banner, "w1024-h500")}
          alt={app.name}
          fill
          priority={index === 0}
          quality={72}
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
          fallback={
            <div
              className="absolute inset-0 flex items-center justify-center p-5 text-center font-display text-2xl font-extrabold text-white"
              style={{ background: `linear-gradient(135deg, ${app.accent}, ${app.accent}bb)` }}
            >
              {app.name.split(":")[0]}
            </div>
          }
        />
        <span
          className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold uppercase backdrop-blur"
          style={{ color: app.accent }}
        >
          {app.genre}
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom: details */}
      <div className="flex flex-col gap-4 p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <SafeImage
            src={playImg(app.icon, "s160")}
            alt=""
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-2xl shadow-lift sm:h-16 sm:w-16"
            fallback={
              <div
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-2xl font-extrabold text-white shadow-lift sm:h-16 sm:w-16"
                style={{ background: app.accent }}
              >
                {app.name[0]}
              </div>
            }
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
              {app.name.split(":")[0]}
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-bold text-muted">
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

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft sm:text-base">
          {app.tagline}
        </p>

        <ul className="hidden flex-wrap gap-2 sm:flex">
          {app.highlights.slice(0, 4).map((h) => (
            <li
              key={h}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
              style={{ background: `${app.accent}12`, border: `1px solid ${app.accent}33` }}
            >
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                style={{ background: app.accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-wrap gap-3">
          <a
            href={app.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
            style={{ background: app.accent }}
          >
            <Play size={15} className="fill-current" /> Play free
          </a>
          <Link
            href={`/games/${app.slug}`}
            className="flex items-center gap-2 rounded-xl border-2 border-ink px-5 py-3 text-sm font-bold"
          >
            Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
