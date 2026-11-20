import { getCatalog } from "@/lib/playstore";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Showcase from "@/components/Showcase";
import GamesGrid from "@/components/GamesGrid";
import Studio, { StudioIntro } from "@/components/Studio";
import Process from "@/components/Process";
import CallToAction from "@/components/CallToAction";
import { SectionHeading } from "@/components/Reveal";

// Re-check Google Play every 6 hours so new games appear automatically.
export const revalidate = 21600;

export default async function Home() {
  const { apps, source } = await getCatalog();

  return (
    <>
      <Hero apps={apps} live={source === "live"} />
      <Marquee apps={apps} />

      <section className="relative pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Featured games"
            title="Small games."
            accent="Serious fun."
            intro="Scroll through our latest releases — each one built around a single, satisfying idea."
          />
        </div>
        <Showcase apps={apps} />
      </section>

      <section id="games" className="scroll-mt-24 pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="The collection" title="Every game," accent="one place." />
          </div>
          <GamesGrid apps={apps} />
        </div>
      </section>

      <section id="studio" className="scroll-mt-24 pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="The studio" title="Made with care," accent="played with joy." />
            <StudioIntro />
          </div>
          <Studio />
        </div>
      </section>

      <section id="process" className="scroll-mt-24 pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16">
            <SectionHeading
              align="center"
              eyebrow="How we build"
              title="From tiny spark to"
              accent="your home screen."
            />
          </div>
          <Process />
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <CallToAction apps={apps} />
        </div>
      </section>
    </>
  );
}
