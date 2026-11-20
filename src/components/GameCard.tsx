"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Star } from "lucide-react";
import type { StoreApp } from "@/lib/types";
import { playImg, showDownloads } from "@/lib/img";

export default function GameCard({ app, index = 0 }: { app: StoreApp; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative h-full overflow-hidden rounded-[28px] border border-line bg-paper shadow-soft">

        <Link href={`/games/${app.slug}`} className="block" aria-label={`${app.name} details`}>
          <div className="relative aspect-[1024/500] overflow-hidden">
            <Image
              src={playImg(app.banner, "w640-h312")}
              alt={app.name}
              fill
              quality={70}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold backdrop-blur">
              {app.genre}
            </span>
            {app.kind === "app" && (
              <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                App
              </span>
            )}
          </div>
        </Link>

        <div className="relative p-5 pt-0">
          <div className="-mt-9 flex items-end justify-between">
            <div className="relative">
              <Image
                src={playImg(app.icon, "s160")}
                alt=""
                width={76}
                height={76}
                className="rounded-[22px] shadow-lift ring-4 ring-paper"
              />
            </div>
            <div className="flex items-center gap-3 pb-1 text-xs font-semibold text-muted">
              {app.rating ? (
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-sun text-sun" /> {app.rating.toFixed(1)}
                </span>
              ) : null}
              {showDownloads(app.downloads) ? (
                <span className="flex items-center gap-1">
                  <Download size={14} /> {app.downloads}
                </span>
              ) : (
                <span className="rounded-full bg-mint-soft px-2 py-0.5 text-mint">New</span>
              )}
            </div>
          </div>

          <Link href={`/games/${app.slug}`}>
            <h3 className="mt-4 font-display text-xl leading-tight font-extrabold tracking-tight">
              {app.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{app.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.highlights.slice(0, 3).map((h) => (
              <span key={h} className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                {h}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <a
              href={app.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-ink py-2.5 text-center text-sm font-bold text-white"
            >
              Get on Google Play
            </a>
            <Link
              href={`/games/${app.slug}`}
              aria-label={`More about ${app.name}`}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
