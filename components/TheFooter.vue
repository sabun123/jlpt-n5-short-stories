<template>
  <footer
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800"
  >
    <UContainer>
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-2 py-3 md:py-4"
      >
        <div
          class="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left"
        >
          © {{ copyrightYear }} Yusuf Ismail bin Shukor
        </div>
        <div class="flex items-center gap-6 md:gap-4">
          <a
            href="https://github.com/sabun123"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-500"
            target="_blank"
          >
            <UIcon name="i-simple-icons-github" />
          </a>
          <a
            href="https://my.linkedin.com/in/yusuf-ismail-bin-shukor"
            class="text-gray-600 dark:text-gray-400 hover:text-primary-500"
            target="_blank"
          >
            <UIcon name="i-simple-icons-linkedin" />
          </a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
const copyrightYear = computed(() =>
  currentYear > 2025 ? `2025-${currentYear}` : "2025"
);
</script>

<style>
:root {
  --footer-height: 5rem; /* Increased from 4rem to accommodate mobile layout */
  --footer-height-desktop: 4rem;
}

@media (min-width: 768px) {
  :root {
    --footer-height: var(--footer-height-desktop);
  }
}

footer {
  height: var(--footer-height);
  z-index: 40;
}
</style>
