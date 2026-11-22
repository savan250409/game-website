import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/playstore";
import { playImg } from "@/lib/img";
import GameDetail from "@/components/GameDetail";

// Static export: every game page is generated at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { apps } = await getCatalog();
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { apps } = await getCatalog();
  const app = apps.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: app.name,
    description: app.tagline,
    openGraph: { title: app.name, description: app.tagline, images: [playImg(app.banner, "w1200-h630")] },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { apps } = await getCatalog();
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();
  const more = apps.filter((a) => a.id !== app.id && a.kind === "game").slice(0, 3);
  return <GameDetail app={app} more={more} />;
}
