import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="font-display text-[8rem] leading-none font-extrabold text-coral sm:text-[12rem]">404</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Level not found</h1>
        <p className="mt-3 text-ink-soft">This page wandered off the map. Let&apos;s get you back to the games.</p>
        <Link href="/" className="mt-8 inline-block rounded-2xl bg-ink px-6 py-3.5 font-display font-bold text-white">
          Back to home
        </Link>
      </div>
    </section>
  );
}
