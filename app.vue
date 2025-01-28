<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
    <TheHeader />
    <UContainer class="py-4 flex-1">
      <NuxtPage />
    </UContainer>
    <TheFooter />
    <UNotifications />
  </div>
</template>

<script setup>
import { createLayout } from "~/composables/useLayout";
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
}

.dark {
  color-scheme: dark;
}

body {
  @apply antialiased;
}
</style>
