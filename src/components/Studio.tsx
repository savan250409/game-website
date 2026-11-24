"use client";

import { motion, type TargetAndTransition } from "motion/react";
import { Feather, Gamepad2, Gift, ShieldCheck, WifiOff } from "lucide-react";
import Counter from "./Counter";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`relative flex flex-col overflow-hidden rounded-[28px] border border-line p-7 shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Icon chip used on every feature tile for a consistent look. */
function Chip({
  children,
  className = "",
  animate,
}: {
  children: React.ReactNode;
  className?: string;
  animate?: TargetAndTransition;
}) {
  return (
    <motion.div
      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-soft ${className}`}
      animate={animate}
      transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default function Studio({ gamesLive = 5 }: { gamesLive?: number }) {
  // A clean difficulty ladder: bars grow and shift from mint → sun → coral.
  const bars = Array.from({ length: 14 });
  const grad = (t: number) => {
    // 0 = mint, 0.5 = sun, 1 = coral
    if (t < 0.5) return "var(--color-mint)";
    if (t < 0.8) return "var(--color-sun)";
    return "var(--color-coral)";
  };

  return (
    <div className="grid auto-rows-[minmax(200px,auto)] gap-4 sm:gap-5 md:grid-cols-6">
      {/* Levels — hero stat tile */}
      <Tile className="bg-gradient-to-br from-paper to-sand md:col-span-4 md:row-span-2 md:min-h-[440px]">
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full opacity-40 blur-2xl"
          style={{ background: "radial-gradient(circle, var(--color-sun), transparent 70%)" }}
        />
        <p className="relative text-xs font-bold tracking-widest text-coral uppercase">Handcrafted content</p>
        <div className="relative mt-3 flex items-end gap-3">
          <p className="font-display text-6xl leading-none font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
            <Counter to={11000} duration={2.2} />+
          </p>
          <p className="mb-1.5 font-display text-xl font-bold text-ink-soft sm:mb-2">levels</p>
        </div>
        <p className="relative mt-3 max-w-md text-base text-ink-soft">
          hand-tuned so difficulty grows smoothly — from easy warm-ups to proper brain-burners.
        </p>

        {/* Difficulty ladder */}
        <div className="relative mt-auto pt-6">
          <div className="flex items-baseline justify-between text-[11px] font-bold text-muted uppercase">
            <span>Easy start</span>
            <span>Expert finish</span>
          </div>
          <div className="mt-2.5 flex h-16 items-end gap-1.5 sm:gap-2">
            {bars.map((_, i) => {
              const t = i / (bars.length - 1);
              return (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-md rounded-b-sm"
                  style={{ background: grad(t) }}
                  initial={{ height: "8%", opacity: 0 }}
                  whileInView={{ height: `${20 + t * 80}%`, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: EASE }}
                />
              );
            })}
          </div>
        </div>
      </Tile>

      {/* Free to play */}
      <Tile className="bg-sun text-ink md:col-span-2" delay={0.1}>
        <Chip className="bg-ink text-sun" animate={{ y: [0, -9, 0], rotate: [0, -8, 0] }}>
          <Gift />
        </Chip>
        <h3 className="mt-5 font-display text-2xl font-extrabold">Free to play</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Every game is free to download. No paywalls between you and the fun.
        </p>
      </Tile>

      {/* Play offline */}
      <Tile className="bg-mint text-white md:col-span-2" delay={0.15}>
        <Chip className="relative bg-paper text-mint">
          <WifiOff />
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-paper"
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </Chip>
        <h3 className="mt-5 font-display text-2xl font-extrabold">Play offline</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Train, plane or no signal — most of our games need no internet at all.
        </p>
      </Tile>

      {/* Games count */}
      <Tile className="bg-sky text-white md:col-span-2" delay={0.05}>
        <Chip className="bg-white/15 text-white">
          <Gamepad2 />
        </Chip>
        <p className="mt-5 font-display text-5xl leading-none font-extrabold">
          <Counter to={gamesLive} />
        </p>
        <h3 className="mt-1 font-display text-xl font-extrabold">games live</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/85">
          Puzzle, casual and arcade — with more on the way.
        </p>
      </Tile>

      {/* Rated for Everyone */}
      <Tile className="bg-paper md:col-span-2" delay={0.1}>
        <Chip className="bg-sky-soft text-sky">
          <ShieldCheck />
        </Chip>
        <h3 className="mt-5 font-display text-2xl font-extrabold">Rated Everyone</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Cute, cozy and family friendly. Fun for kids, parents and grandparents.
        </p>
      </Tile>

      {/* Light & smooth */}
      <Tile className="bg-coral text-white md:col-span-2" delay={0.15}>
        <Chip className="bg-paper text-coral" animate={{ rotate: [0, 12, -12, 0], y: [0, -6, 0] }}>
          <Feather />
        </Chip>
        <h3 className="mt-5 font-display text-2xl font-extrabold">Light &amp; smooth</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Small downloads and silky gameplay tuned for everyday Android phones.
        </p>
      </Tile>
    </div>
  );
}

export function StudioIntro() {
  return (
    <Reveal>
      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        We&apos;re a small, focused team that loves the feeling of a perfect puzzle click and a
        &ldquo;just one more round&rdquo; run. Every game is designed to be easy to learn, satisfying
        to master and kind to your phone.
      </p>
    </Reveal>
  );
}
