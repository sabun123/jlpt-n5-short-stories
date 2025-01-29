import { defineNuxtConfig } from "nuxt/config";

// Remove type augmentation as it's now in types/nuxt.d.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  typescript: {
    strict: true,
    typeCheck: false,
    shim: false,
  },

  ui: {
    global: true,
  },

  app: {
    baseURL: "/jlpt-n5-short-stories/",
  },

  compatibilityDate: "2025-01-26",
});
