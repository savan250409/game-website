"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { StoreApp } from "@/lib/types";
import GameCard from "./GameCard";

export default function GamesGrid({ apps }: { apps: StoreApp[] }) {
  const filters = useMemo(() => {
    const genres = Array.from(new Set(apps.filter((a) => a.kind === "game").map((a) => a.genre)));
    const list = [{ key: "all", label: "All", count: apps.length }];
    if (apps.some((a) => a.kind === "app"))
      list.push({ key: "games", label: "Games", count: apps.filter((a) => a.kind === "game").length });
    for (const g of genres) list.push({ key: `g:${g}`, label: g, count: apps.filter((a) => a.genre === g).length });
    if (apps.some((a) => a.kind === "app"))
      list.push({ key: "apps", label: "Apps", count: apps.filter((a) => a.kind === "app").length });
    return list;
  }, [apps]);

  const [active, setActive] = useState("all");

  const shown = apps.filter((a) => {
    if (active === "all") return true;
    if (active === "games") return a.kind === "game";
    if (active === "apps") return a.kind === "app";
    return a.genre === active.slice(2);
  });

  return (
    <div>
      <LayoutGroup>
        <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ${
                active === f.key ? "text-white" : "bg-paper text-ink-soft"
              } border border-line`}
            >
              {active === f.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {f.label}
                <span
                  className={`rounded-full px-1.5 text-[11px] ${
                    active === f.key ? "bg-sun text-ink" : "bg-sand text-muted"
                  }`}
                >
                  {f.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((app, i) => (
              <GameCard key={app.id} app={app} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
