"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Download, ShieldCheck, Star, Tag, X } from "lucide-react";
import type { StoreApp } from "@/lib/types";
import { playImg, showDownloads } from "@/lib/img";
import PlayBadge from "./PlayBadge";
import GameCard from "./GameCard";
import { Reveal, SectionHeading } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GameDetail({ app, more }: { app: StoreApp; more: StoreApp[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  const meta = [
    { icon: Tag, label: "Genre", value: app.genre },
    showDownloads(app.downloads) ? { icon: Download, label: "Downloads", value: app.downloads } : null,
    app.rating ? { icon: Star, label: "Rating", value: app.rating.toFixed(1) } : null,
    app.updated ? { icon: CalendarDays, label: "Updated", value: app.updated } : null,
    { icon: ShieldCheck, label: "Rated", value: "Everyone" },
  ].filter(Boolean) as { icon: typeof Tag; label: string; value: string }[];

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[70%] opacity-25 blur-3xl"
          style={{ background: `radial-gradient(60% 60% at 70% 20%, ${app.accent}, transparent)` }}
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#games" className="group inline-flex items-center gap-2 text-sm font-bold text-ink-soft">
              <ArrowLeft size={16}  /> All games
            </Link>
          </motion.div>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <motion.div
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                className="inline-block"
              >
                <Image
                  src={playImg(app.icon, "s256")}
                  alt={`${app.name} icon`}
                  width={112}
                  height={112}
                  priority
                  className="rounded-[28px] shadow-lift ring-4 ring-paper"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                className="mt-6 font-display text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl"
              >
                {app.name.split(":")[0]}
                {app.name.includes(":") && (
                  <span className="mt-2 block text-2xl text-ink-soft sm:text-3xl">{app.name.split(":").slice(1).join(":").trim()}</span>
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
                className="mt-5 max-w-xl text-lg text-ink-soft"
              >
                {app.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                className="mt-8"
              >
                <PlayBadge href={app.storeUrl} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
              className="relative aspect-[1024/500] overflow-hidden rounded-[32px] border-4 border-paper shadow-lift"
            >
              <motion.div style={{ y: bannerY, scale: bannerScale }} className="absolute inset-0">
                <Image
                  src={playImg(app.banner, "w1400-h684")}
                  alt={app.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } } }}
            className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {meta.map((m) => (
              <motion.div
                key={m.label}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="rounded-2xl border border-line bg-paper p-4 shadow-soft"
              >
                <dt className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase">
                  <m.icon size={14} /> {m.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-extrabold">{m.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {app.screenshots.length > 0 && <Screenshots app={app} />}

      <section className="pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading eyebrow="About the game" title="Why you'll" accent="love it." />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {app.description.split("\n\n").map((p, i) => (
                <Reveal key={i} delay={i * 0.08} y={24}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2 lg:mt-24">
            {app.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 ? 4 : -4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 16 }}
                className="rounded-3xl p-6 font-display text-xl font-extrabold"
                style={{ background: `${app.accent}1f`, border: `2px solid ${app.accent}55` }}
              >
                <span className="mb-3 block h-3 w-3 rounded-full" style={{ background: app.accent }} />
                {h}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="pt-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10">
              <SectionHeading eyebrow="Keep playing" title="More from" accent="NG Studio." />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((g, i) => (
                <GameCard key={g.id} app={g} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Screenshots({ app }: { app: StoreApp }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scrollByCards = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % app.screenshots.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + app.screenshots.length) % app.screenshots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, app.screenshots.length]);

  return (
    <section className="overflow-hidden pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Screenshots</h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <p className="hidden text-sm font-semibold text-muted md:block">Scroll or use arrows · click to enlarge</p>
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll screenshots left"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper shadow-soft"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Scroll screenshots right"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper shadow-soft"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          className="no-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:mx-0 sm:px-0"
        >
          {app.screenshots.map((s, i) => (
            <button
              key={`${s}-${i}`}
              onClick={() => setOpen(i)}
              className="relative h-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border-4 border-paper bg-sand shadow-lift sm:h-[420px]"
              aria-label={`Open screenshot ${i + 1}`}
            >
              <Image
                src={playImg(s, "h840")}
                alt={`${app.name} screenshot ${i + 1}`}
                width={0}
                height={0}
                unoptimized
                loading="eager"
                draggable={false}
                className="pointer-events-none h-full w-auto"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-cream/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`shot-${open}`}
              className="relative max-h-[86vh] overflow-hidden rounded-3xl border-4 border-paper shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={playImg(app.screenshots[open], "h1600")}
                alt={`${app.name} screenshot ${open + 1}`}
                width={0}
                height={0}
                unoptimized
                className="h-auto max-h-[86vh] w-auto max-w-[92vw]"
              />
            </motion.div>
            <button aria-label="Close" onClick={() => setOpen(null)} className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
              <X size={20} />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open - 1 + app.screenshots.length) % app.screenshots.length);
              }}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-paper shadow-soft sm:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((open + 1) % app.screenshots.length);
              }}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-paper shadow-soft sm:right-6"
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
