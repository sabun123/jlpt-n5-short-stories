import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  typescript: {
    strict: true,
  },

  app: {
    baseURL: "/jlpt-n5-short-stories/", // for GitHub Pages
  },

  compatibilityDate: "2025-01-26",
});
