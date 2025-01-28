<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <TheHeader />
    <UContainer class="py-8">
      <NuxtPage />
    </UContainer>
    <UNotifications />
  </div>
</template>

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
