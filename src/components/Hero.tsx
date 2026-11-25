"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import type { StoreApp } from "@/lib/types";
import { playImg } from "@/lib/img";
import { SITE } from "@/lib/site";
import PlayBadge from "./PlayBadge";
import Counter from "./Counter";

const EASE = [0.22, 1, 0.36, 1] as const;

function Word({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", rotate: 6 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ apps }: { apps: StoreApp[]; live?: boolean }) {
  const games = apps.filter((a) => a.kind === "game");
  // The 5 most recently added games (newest are last on the developer page).
  const deck = (games.length ? games : apps).slice(-5);
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Scroll-out effect
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yDeck = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (deck.length < 2) return;
    const t = setInterval(() => setTop((v) => (v + 1) % deck.length), 3200);
    return () => clearInterval(t);
  }, [deck.length]);

  // Only the same five games as the deck — show just their icons floating around it.
  const floaters = deck;
  const positions = [
    { left: "-6%", top: "8%", size: 82 },
    { left: "85%", top: "-4%", size: 74 },
    { left: "92%", top: "56%", size: 90 },
    { left: "-2%", top: "70%", size: 70 },
    { left: "52%", top: "94%", size: 66 },
  ];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-40 lg:pb-32"
    >
      {/* Background */}
      <div className="dot-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sun/40 blur-3xl" />
      <div className="absolute top-20 -right-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-coral/25 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-[22rem] w-[22rem] rounded-full bg-mint/25 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Copy */}
        <motion.div style={{ y: yText, opacity: fade }}>

          <h1 className="font-display text-[2.9rem] leading-[0.95] font-extrabold tracking-tight sm:text-7xl lg:text-[5.4rem]">
            <Word delay={0.1}>We</Word> <Word delay={0.16}>make</Word>{" "}
            <Word delay={0.22}>tiny</Word> <Word delay={0.28}>games</Word>
            <br />
            <Word delay={0.36}>with</Word>{" "}
            <Word delay={0.44} className="relative">
              <span className="relative z-10 text-coral">big</span>
            </Word>{" "}
            <Word delay={0.52}>
              <span className="relative inline-block">
                joy
                <motion.svg viewBox="0 0 120 20" className="absolute -bottom-2 left-0 w-full" aria-hidden>
                  <motion.path
                    d="M3 14 C 30 2, 60 2, 117 12"
                    fill="none"
                    stroke="var(--color-sun)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.1, duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>
              <motion.span
                className="ml-1 inline-block origin-bottom-left text-sun"
                animate={{ rotate: [0, 14, -8, 14, 0], scale: [1, 1.15, 1] }}
                transition={{ delay: 1.6, duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✦
              </motion.span>
            </Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {SITE.name} is an indie mobile studio crafting cozy puzzles, relaxing runners and
            snackable arcade battles for Android — free to play, made to be picked up any time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PlayBadge href={SITE.developerUrl} label="All games on" />
            <Link
              href="#games"
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-ink px-5 py-3.5 font-display font-bold"
            >
              Explore games
              <ArrowDown size={18}  />
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
          >
            <div>
              <dt className="text-xs font-semibold text-muted uppercase">Games live</dt>
              <dd className="font-display text-3xl font-extrabold sm:text-4xl">
                <Counter to={games.length} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted uppercase">Levels</dt>
              <dd className="font-display text-3xl font-extrabold sm:text-4xl">
                <Counter to={11} />k+
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-muted uppercase">Free to play</dt>
              <dd className="font-display text-3xl font-extrabold sm:text-4xl">
                <Counter to={100} />%
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Visual: shuffling card deck + floating icons */}
        <motion.div style={{ y: yDeck }} className="relative mx-auto aspect-[4/3.3] w-full max-w-[560px]">
          {floaters.map((app, i) => {
            const p = positions[i];
            return (
              <FloatingIcon
                key={app.id}
                app={app}
                {...p}
                index={i}
              />
            );
          })}

          <div className="absolute inset-[10%] [perspective:1200px]">
            <AnimatePresence initial={false}>
              {deck.map((app, i) => {
                const pos = (i - top + deck.length) % deck.length;
                if (pos > 2) return null;
                return (
                  <motion.div
                    key={app.id}
                    className="absolute inset-x-0 top-0 overflow-hidden rounded-[26px] border-4 border-paper bg-paper shadow-lift"
                    initial={{ opacity: 0, y: 60, scale: 0.85, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: pos * -24,
                      x: pos * 18,
                      scale: 1 - pos * 0.07,
                      rotate: pos === 0 ? -4 : pos * 5,
                      zIndex: 10 - pos,
                    }}
                    exit={{ x: -380, y: 40, rotate: -28, opacity: 0, transition: { duration: 0.6, ease: EASE } }}
                    transition={{ type: "spring", stiffness: 160, damping: 20, delay: 0.3 }}
                  >
                    {/* Banner box shaped like the Play Store graphic — fills edge to edge, no crop */}
                    <div className="relative aspect-[1024/500] w-full">
                      <Image
                        src={playImg(app.banner, "w1024-h500")}
                        alt={app.name}
                        fill
                        priority={i === 0}
                        loading={i === 0 ? undefined : "lazy"}
                        quality={72}
                        sizes="(max-width: 768px) 90vw, 520px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-3">
                      <Image
                        src={playImg(app.icon, "s128")}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-xl shadow-soft ring-1 ring-line"
                      />
                      <div className="min-w-0 text-ink">
                        <p className="truncate font-display text-base leading-tight font-bold">
                          {app.name.split(":")[0]}
                        </p>
                        <p className="text-xs font-semibold text-muted">{app.genre}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 12 }}
            className="absolute right-[4%] bottom-[4%] z-20 grid h-24 w-24 place-items-center rounded-full bg-sun text-center font-display text-sm leading-tight font-extrabold shadow-lift"
          >
            <span className="absolute inset-1.5 animate-spin-slow rounded-full border-2 border-dashed border-ink/40" />
            <span className="flex flex-col items-center">
              <Sparkles size={18} />
              Free
              <br />
              to play
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingIcon({
  app,
  left,
  top,
  size,
  index,
}: {
  app: StoreApp;
  left: string;
  top: string;
  size: number;
  index: number;
}) {
  return (
    <motion.div
      style={{ left, top, width: size, height: size }}
      className="absolute z-30 hidden sm:block"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 260, damping: 16 }}
    >
      <div
        className="h-full w-full animate-float"
        style={{ animationDelay: `${index * -1.1}s`, animationDuration: `${5 + (index % 3)}s` }}
      >
        <Image
          src={playImg(app.icon, "s192")}
          alt={app.name}
          width={size}
          height={size}
          className="h-full w-full rounded-[24%] shadow-lift ring-4 ring-paper"
        />
      </div>
    </motion.div>
  );
}
