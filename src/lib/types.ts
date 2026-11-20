export type AppKind = "game" | "app";

export interface StoreApp {
  /** Play Store package id, e.g. com.ngstudio.ballsadventure */
  id: string;
  /** URL-friendly slug used for /games/[slug] */
  slug: string;
  name: string;
  /** One-line summary (Play Store short description) */
  tagline: string;
  /** Longer marketing copy, paragraphs separated by blank lines */
  description: string;
  /** Raw Play Store category, e.g. GAME_PUZZLE */
  category: string;
  /** Friendly label, e.g. "Puzzle" */
  genre: string;
  kind: AppKind;
  icon: string;
  banner: string;
  screenshots: string[];
  downloads?: string;
  rating?: number;
  updated?: string;
  highlights: string[];
  /** Accent colour used for card glows and gradients */
  accent: string;
  storeUrl: string;
}

export interface Catalog {
  apps: StoreApp[];
  /** "live" when fetched from Google Play, "static" when using the bundled fallback */
  source: "live" | "static";
  fetchedAt: string;
}
