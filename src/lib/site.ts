export const SITE = {
  name: "NG Studio",
  short: "NG",
  tagline: "Games that feel good to play",
  description:
    "NG Studio is an indie mobile studio crafting relaxing puzzle, casual and arcade games for Android. Free to play, offline-friendly and made with care.",
  /** Google Play account ID — must stay exactly as on the Play Store, or the game sync stops working. */
  developerId: "NGD Technolab",
  developerUrl: "https://play.google.com/store/apps/developer?id=NGD+Technolab",
  /** Put your public support email here to show it in the footer / contact section. */
  email: "",
  /** Contact form submissions are emailed here (via Formsubmit.co). */
  contactEmail: "savan@ngendevtech.com",
  /** Phone shown in the footer. */
  phone: "+91 98257 11336",
  phoneHref: "+919825711336",
  /** Play Store package ids that should never be shown on the website. */
  hiddenApps: [
    "com.aiphotoeditor.aivideogenerator.collagemaker.photoframe", // AI Collage Maker & Photo Frame
    "next.short.drama.short.reel", // Next Short Drama : Short Reel
  ] as string[],
  /** How often (seconds) the site re-checks Google Play for new games. */
  revalidate: 60 * 60 * 6,
};
