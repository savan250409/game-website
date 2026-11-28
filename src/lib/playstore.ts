import "server-only";
import { SITE } from "./site";
import { STATIC_APPS } from "./static-catalog";
import type { Catalog, StoreApp } from "./types";

/**
 * Live catalogue loader.
 *
 * Reads the public Google Play developer page, finds every app id listed there,
 * then reads each app page for its name, icon, category and screenshots.
 * Results are cached by Next.js and refreshed every SITE.revalidate seconds,
 * so a newly published game shows up on the site automatically.
 *
 * If Google Play can't be reached or its markup changes, we fall back to the
 * bundled snapshot in static-catalog.ts so the site never breaks.
 */

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

const ACCENTS = ["#0EA5E9", "#F59E0B", "#14B8A6", "#F43F5E", "#22C55E", "#FB923C", "#EF4444", "#06B6D4"];

const GENRES: Record<string, string> = {
  GAME_PUZZLE: "Puzzle",
  GAME_CASUAL: "Casual",
  GAME_ARCADE: "Arcade",
  GAME_ACTION: "Action",
  GAME_ADVENTURE: "Adventure",
  GAME_BOARD: "Board",
  GAME_CARD: "Card",
  GAME_RACING: "Racing",
  GAME_SIMULATION: "Simulation",
  GAME_SPORTS: "Sports",
  GAME_STRATEGY: "Strategy",
  GAME_WORD: "Word",
  GAME_EDUCATIONAL: "Educational",
  ENTERTAINMENT: "Entertainment",
  PHOTOGRAPHY: "Photography",
};

function genreOf(category: string) {
  if (GENRES[category]) return GENRES[category];
  return category
    .replace(/^GAME_/, "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Strip the "=w416-h235-rw" style size suffix from a Play image URL. */
const baseImage = (url: string) => url.replace(/=[a-z0-9-]+$/i, "");

/** Parse the "Updated on" date to a sortable number; unknown dates sort oldest. */
function updatedTime(app: StoreApp): number {
  const t = app.updated ? Date.parse(app.updated) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

/** Order the catalogue newest-added first (most recently updated game leads). */
function newestFirst(apps: StoreApp[]): StoreApp[] {
  return [...apps].sort((a, b) => updatedTime(b) - updatedTime(a));
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function slugify(name: string) {
  return name
    .split(":")[0]
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function get(url: string) {
  const res = await fetch(url, {
    headers: HEADERS,
    next: { revalidate: SITE.revalidate },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

interface ListingCard {
  id: string;
  banner?: string;
  icon?: string;
}

/** Parse the developer page into the ordered list of app ids (+ card images). */
function parseDeveloperPage(html: string): ListingCard[] {
  const cards: ListingCard[] = [];
  const seen = new Set<string>();
  const parts = html.split('href="/store/apps/details?id=');
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const id = decode(chunk.slice(0, chunk.indexOf('"'))).split("&")[0];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const body = chunk.slice(0, 6000);
    const banner = body.match(/(https:\/\/play-lh\.googleusercontent\.com\/[^"\s]+=w\d+-h\d+[^"\s]*)/)?.[1];
    const icon = body.match(/(https:\/\/play-lh\.googleusercontent\.com\/[^"\s]+=s\d+[^"\s]*)/)?.[1];
    cards.push({ id, banner: banner && baseImage(banner), icon: icon && baseImage(icon) });
  }
  return cards;
}

async function loadApp(card: ListingCard, index: number): Promise<StoreApp | null> {
  const fallback = STATIC_APPS.find((a) => a.id === card.id);
  try {
    const html = await get(
      `https://play.google.com/store/apps/details?id=${encodeURIComponent(card.id)}&hl=en&gl=US`,
    );
    const ldRaw = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
    const ld = ldRaw ? JSON.parse(ldRaw) : {};
    const screenshots = Array.from(
      new Set(
        [
          ...html.matchAll(
            /<img[^>]+src="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)"[^>]+alt="Screenshot image"/g,
          ),
        ].map((m) => baseImage(m[1])),
      ),
    ).slice(0, 8);
    const downloads = html.match(/>([\d.,]+[KMB]?\+)<\/div><div[^>]*>Downloads/)?.[1];
    const updated = html.match(/Updated on<\/div><div[^>]*>([^<]+)</)?.[1];
    const rating = ld?.aggregateRating?.ratingValue ? Number(ld.aggregateRating.ratingValue) : undefined;
    const category: string = ld.applicationCategory || fallback?.category || "GAME";
    const name: string = ld.name ? decode(ld.name) : fallback?.name || card.id;

    const longDesc = html
      .match(/data-g-id="description"[^>]*>([\s\S]*?)<\/div>/)?.[1]
      ?.replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, "");

    return {
      id: card.id,
      slug: fallback?.slug || slugify(name),
      name,
      tagline: ld.description ? decode(ld.description) : fallback?.tagline || "",
      description:
        fallback?.description ||
        (longDesc ? decode(longDesc).split("\n\n").slice(0, 2).join("\n\n").slice(0, 700) : ""),
      category,
      genre: genreOf(category),
      kind: category.startsWith("GAME") ? "game" : "app",
      icon: ld.image ? baseImage(ld.image) : card.icon || fallback?.icon || "",
      banner: card.banner || fallback?.banner || screenshots[0] || "",
      screenshots: screenshots.length ? screenshots : fallback?.screenshots || [],
      downloads: downloads || fallback?.downloads,
      rating: rating || fallback?.rating,
      updated: updated || fallback?.updated,
      highlights: fallback?.highlights || [genreOf(category), "Free to play", "Made by NG Studio"],
      accent: fallback?.accent || ACCENTS[index % ACCENTS.length],
      storeUrl: `https://play.google.com/store/apps/details?id=${card.id}`,
    };
  } catch {
    return fallback ?? null;
  }
}

export async function getCatalog(): Promise<Catalog> {
  try {
    const html = await get(`${SITE.developerUrl}&hl=en&gl=US`);
    const cards = parseDeveloperPage(html).filter((c) => !SITE.hiddenApps.includes(c.id));
    if (cards.length === 0) throw new Error("No apps found on developer page");
    const apps = (await Promise.all(cards.map(loadApp))).filter(Boolean) as StoreApp[];
    // ensure unique slugs
    const used = new Set<string>();
    for (const app of apps) {
      let s = app.slug;
      let n = 2;
      while (used.has(s)) s = `${app.slug}-${n++}`;
      app.slug = s;
      used.add(s);
    }
    return { apps: newestFirst(apps), source: "live", fetchedAt: new Date().toISOString() };
  } catch (err) {
    console.warn("[playstore] using static catalogue:", (err as Error).message);
    return {
      apps: newestFirst(STATIC_APPS.filter((a) => !SITE.hiddenApps.includes(a.id))),
      source: "static",
      fetchedAt: new Date().toISOString(),
    };
  }
}
