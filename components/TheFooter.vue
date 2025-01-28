<template>
  <footer class="border-t dark:border-gray-800 py-6 mt-0">
    <UContainer>
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          © {{ copyrightYear }} Yusuf Ismail bin Shukor
        </div>
        <div class="flex items-center gap-4">
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
