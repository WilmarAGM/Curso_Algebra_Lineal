import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Álgebra Lineal — Curso Interactivo",
        short_name: "Álgebra Lineal",
        description:
          "Sistemas de ecuaciones lineales, matrices, espacios vectoriales y transformaciones lineales — Institución Universitaria Pascual Bravo.",
        theme_color: "#0b162c",
        background_color: "#0b162c",
        display: "standalone",
        start_url: "/",
        scope: "/",
        lang: "es",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        // Don't hijack navigations to real files (PDFs, etc.) with the SPA fallback —
        // only app routes (no file extension) should resolve to index.html offline.
        navigateFallbackDenylist: [/\.[a-z0-9]+$/i],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
