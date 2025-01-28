<template>
  <header class="border-b dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold">JLPT N5 Stories</NuxtLink>
        <UButton
          :icon="
            colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'
          "
          color="gray"
          variant="ghost"
          @click="
            colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
          "
        />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
</script>
