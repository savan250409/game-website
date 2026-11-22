import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting (free plan).
  // The game list is baked in at build time; run `npm run build` again to refresh it.
  output: "export",
  images: {
    // Firebase Hosting has no image optimizer, so serve Play Store art directly.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "play-lh.googleusercontent.com" }],
  },
};

export default nextConfig;
