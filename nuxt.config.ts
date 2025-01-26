import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/color-mode"],

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },

  typescript: {
    strict: true,
    // typeCheck: true,
  },

  app: {
    baseURL: "/jlpt-n5-short-stories/", // for GitHub Pages
  },

  compatibilityDate: "2025-01-26",
});
