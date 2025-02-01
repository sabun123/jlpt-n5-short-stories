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
    buildAssetsDir: "/_nuxt/", // Don't use leading slash for GitHub Pages
    head: {
      title: "JLPT N5 Short Stories",
    },
  },

  compatibilityDate: "2025-01-26",

  // Add nitro configuration for static hosting
  nitro: {
    preset: "github-pages",
    output: {
      publicDir: ".output/public",
    },
  },

  // Optional but recommended for static sites
  experimental: {
    payloadExtraction: false,
  },
});
