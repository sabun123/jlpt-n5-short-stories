<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <TheHeader />
    <UContainer class="py-4 flex-1 mb-[var(--footer-height)]">
      <NuxtPage />
    </UContainer>
    <TheFooter />
    <UNotifications />
  </div>
</template>

<script setup>
import { createLayout } from "~/composables/useLayout";

useHead({
  title: "JLPT N5 Short Stories - Learn Japanese Vocabulary",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Learn JLPT N5 level Japanese vocabulary with interactive short stories. Perfect for English speakers starting their Japanese learning journey.",
    },
    { name: "format-detection", content: "telephone=no" },
    // Robots meta tags
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    // Open Graph - Facebook
    {
      property: "og:title",
      content: "JLPT N5 Short Stories - Learn Japanese Vocabulary",
    },
    {
      property: "og:description",
      content:
        "Learn JLPT N5 level Japanese vocabulary with interactive short stories. Perfect for English speakers starting their Japanese learning journey.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://sabun123.github.io/jlpt-n5-short-stories/",
    },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "JLPT N5 Short Stories - Learn Japanese Vocabulary",
    },
    {
      name: "twitter:description",
      content:
        "Learn JLPT N5 level Japanese vocabulary with interactive short stories.",
    },
  ],
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-BG32Y6R7EM",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BG32Y6R7EM');
      `,
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "JLPT N5 Short Stories",
        description:
          "Learn JLPT N5 level Japanese vocabulary with this short stories interactive tool. Supports English speakers.",
        url: "https://sabun123.github.io/jlpt-n5-short-stories/",
        applicationCategory: "EducationalApplication",
        educationalUse: "Language Learning",
        inLanguage: ["en", "ja"],
        learningResourceType: "Interactive Resource",
        educationalLevel: "Beginner",
        teaches: "Japanese vocabulary - JLPT N5 Level",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "MYR",
        },
        author: {
          "@type": "Person",
          name: "Yusuf Ismail bin Shukor",
        },
      }),
    },
  ],
});

const layout = createLayout();
</script>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

<style>
:root {
  --bg-opacity: 1;
  --navbar-height: 4rem;
  --footer-height: 4rem;
}

.dark {
  color-scheme: dark;
}

body {
  @apply antialiased;
}
</style>
