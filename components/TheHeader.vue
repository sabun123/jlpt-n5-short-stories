<template>
  <header class="border-b dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold">JLPT N5 Stories</NuxtLink>
        <div class="flex items-center gap-4">
          <UButton
            :icon="
              colorMode.value === 'dark'
                ? 'i-heroicons-moon'
                : 'i-heroicons-sun'
            "
            color="gray"
            variant="ghost"
            @click="toggleColorMode"
          />
        </div>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
