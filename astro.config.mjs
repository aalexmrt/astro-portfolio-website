// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import meData from "./src/data/me.json";

// https://astro.build/config
export default defineConfig({
  output: "server", // Enable server-side rendering for API routes
  adapter: cloudflare(), // Cloudflare Pages adapter
  site: meData.seo.siteUrl,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
