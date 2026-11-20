import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Intro from "@/components/Intro";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#fffaf2",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <head>
        {/* Warm up the connection to Google Play's image CDN so game art loads sooner */}
        <link rel="preconnect" href="https://play-lh.googleusercontent.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://play-lh.googleusercontent.com" />
      </head>
      <body className="grain min-h-screen antialiased">
        <Providers>
          <Intro />
          <ScrollProgress />
          <Header />
          <main className="overflow-x-clip">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
