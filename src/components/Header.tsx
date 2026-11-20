"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { PlayIcon } from "./PlayBadge";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#games", label: "Games" },
  { href: "/#studio", label: "Studio" },
  { href: "/#process", label: "How we build" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > prev && y > 300 && !open);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-6 ${
            scrolled ? "border border-line bg-paper/80 shadow-soft backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <Link href="/" aria-label={`${SITE.name} home`} onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white sm:flex"
            >
              <PlayIcon className="h-4 w-4" /> Google Play
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-cream px-6 pt-28 pb-10 md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
            <nav className="relative flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 py-2 font-display text-5xl font-extrabold tracking-tight"
                  >
                    <span className="text-sm font-semibold text-coral">0{i + 1}</span>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.a
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              href={SITE.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-auto flex items-center justify-center gap-3 rounded-2xl bg-ink py-4 font-display text-lg font-bold text-white"
            >
              <PlayIcon className="h-6 w-6" /> See all on Google Play
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
