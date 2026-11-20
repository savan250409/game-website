"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-ink-soft">{SITE.description}</p>
        </div>
        <div>
          <p className="font-display font-bold">Explore</p>
          <ul className="mt-3 space-y-2 text-ink-soft">
            <li><Link  href="/#games">All games</Link></li>
            <li><Link  href="/#studio">Studio</Link></li>
            <li><Link  href="/#process">How we build</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Find us</p>
          <ul className="mt-3 space-y-2 text-ink-soft">
            <li>
              <a  href={SITE.developerUrl} target="_blank" rel="noopener noreferrer">
                Google Play developer page
              </a>
            </li>
            {SITE.email && (
              <li>
                <a  href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-b from-coral via-sun to-sun/0 bg-clip-text pb-2 text-center text-transparent font-display text-[19vw] leading-[0.8] font-extrabold tracking-tighter select-none sm:text-[16vw] lg:text-[13rem]"
          aria-hidden
        >
          PLAY ON
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-5 py-6 text-sm text-muted sm:flex-row sm:px-8">
        <p>© {year} {SITE.name}. All rights reserved.</p>
        <p className="text-xs">Google Play and the Google Play logo are trademarks of Google LLC.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 font-semibold text-ink"
        >
          Back to top
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sun">
            <ArrowUp size={16} />
          </span>
        </button>
      </div>
    </footer>
  );
}
