# NG Studio — Games Website

Animated, fully responsive, light-mode site for the NG Studio Google Play catalogue.
Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS 4**, **Motion** (animations) and **Lenis** (smooth scroll).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## New games appear automatically

`src/lib/playstore.ts` reads the public Google Play developer page
(`https://play.google.com/store/apps/developer?id=NGD+Technolab`), finds every app listed there,
and loads each app's name, icon, feature graphic, category, screenshots, downloads and rating.

- Pages are regenerated every **6 hours** (`revalidate` in `src/app/page.tsx` and
  `src/app/games/[slug]/page.tsx`, and `SITE.revalidate` in `src/lib/site.ts`).
  Publish a game on Google Play and it shows up on the site at the next refresh — no code change.
- Games → `kind: "game"`, other apps → `kind: "app"` (they get the "Apps" filter).
- If Google Play can't be reached, the site falls back to the bundled snapshot in
  `src/lib/static-catalog.ts`, so it never breaks. The "Auto-synced / Showing saved catalogue"
  badge in the Games section tells you which one is in use.

> Auto-sync needs a host that runs Next.js on a server (Vercel, Netlify, a Node server).
> A pure static export (`output: "export"`) would freeze the list at build time.

## Customising

| What | Where |
| --- | --- |
| Studio name, tagline, contact email, refresh interval | `src/lib/site.ts` |
| Hand-written copy, highlights & accent colour per game | `src/lib/static-catalog.ts` (matched by package id) |
| Colours / fonts | `src/app/globals.css` (`@theme` block) |
| Sections on the home page | `src/app/page.tsx` |
