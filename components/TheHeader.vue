<template>
  <header class="border-b dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold">JLPT N5 Stories</NuxtLink>
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-information-circle"
            color="gray"
            variant="ghost"
            @click="showInfo = true"
          />
          <UButton
            :icon="
              colorMode.value === 'dark'
                ? 'i-heroicons-moon'
                : 'i-heroicons-sun'
            "
            color="gray"
            variant="ghost"
            @click="
              colorMode.preference =
                colorMode.value === 'dark' ? 'light' : 'dark'
            "
          />
          <UButton
            icon="i-heroicons-squares-2x2"
            :color="showGrid ? 'primary' : 'gray'"
            variant="ghost"
            @click="toggleGrid"
          />
        </div>
      </div>
    </UContainer>
    <InfoModal v-model="showInfo" />
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const { toggleGrid, showGrid } = useLayout();
const showInfo = ref(false);
</script>
