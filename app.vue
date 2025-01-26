<template>
  <div class="min-h-screen">
    <TheHeader />
    <UContainer class="py-8">
      <NuxtPage />
    </UContainer>
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
