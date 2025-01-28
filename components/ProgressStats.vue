<template>
  <UCard class="dark:bg-gray-800" ref="statsCard">
    <!-- Mobile View - More compact -->
    <div class="md:hidden">
      <button
        class="w-full flex items-center justify-between py-1 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        @click="isExpanded = !isExpanded"
      >
        <div class="flex items-center gap-2">
          <div class="text-sm font-bold">
            {{ Math.round(progressPercentage) }}% Complete
          </div>
        </div>
        <UIcon
          :name="
            isExpanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
          "
          class="text-gray-400"
        />
      </button>

      <!-- Use v-show for better performance with frequent toggles -->
      <div
        v-show="isExpanded"
        class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t"
      >
        <div class="text-center p-2">
          <div
            class="text-lg font-bold dark:text-gray-100"
            :class="{ 'animate-completion': isAllCompleted && isExpanded }"
          >
            {{ stats.completedStories }}/{{ stats.totalStories }}
          </div>
          <div
            class="text-xs text-gray-600 dark:text-gray-400"
            :class="{ 'animate-completion-text': isAllCompleted && isExpanded }"
          >
            Completed
          </div>
        </div>
        <div class="text-center p-2">
          <div class="text-lg font-bold dark:text-gray-100">
            {{ Math.round(stats.averageScore) }}%
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Avg Score</div>
        </div>
        <div class="text-center p-2">
          <div class="text-lg font-bold dark:text-gray-100">
            {{ formatTime(stats.totalTimeSpent) }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Time</div>
        </div>
        <div class="text-center p-2">
          <UProgress
            :model-value="progressPercentage"
            color="primary"
            class="mb-1"
          />
        </div>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="hidden md:grid md:grid-cols-4 md:gap-4">
      <div class="text-center p-2 md:p-4">
        <div
          class="text-xl md:text-2xl font-bold dark:text-gray-100"
          :class="{ 'animate-completion': isAllCompleted && isExpanded }"
        >
          {{ stats.completedStories }}/{{ stats.totalStories }}
        </div>
        <div
          class="text-xs md:text-sm text-gray-600 dark:text-gray-400"
          :class="{ 'animate-completion-text': isAllCompleted && isExpanded }"
        >
          Stories Completed
        </div>
      </div>
      <div class="text-center p-2 md:p-4">
        <div class="text-xl md:text-2xl font-bold dark:text-gray-100">
          {{ Math.round(stats.averageScore) }}%
        </div>
        <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Average Score
        </div>
      </div>
      <div class="text-center p-2 md:p-4">
        <div class="text-xl md:text-2xl font-bold dark:text-gray-100">
          {{ formatTime(stats.totalTimeSpent) }}
        </div>
        <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          Total Time
        </div>
      </div>
      <div class="text-center p-2 md:p-4">
        <UProgress
          :model-value="progressPercentage"
          color="primary"
          class="mb-1 md:mb-2"
        />
        <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          {{ Math.round(progressPercentage) }}% Complete
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useStoryStore } from "~/stores/stories";
import type { UCard } from "#components";

const isExpanded = ref(false);

// Add methods to control expansion
const expand = () => {
  isExpanded.value = true;
};

// Update collapse to handle animation state
const collapse = () => {
  isExpanded.value = false;
  // Optionally: wait for collapse animation to complete before stopping our animations
  setTimeout(() => {
    // This will trigger reactivity and stop animations
    isExpanded.value = false;
  }, 200);
};

// Update ref type to UCard component
const statsCard = ref<InstanceType<typeof UCard> | null>(null);
const isAllCompleted = computed(
  () => stats.value.completedStories === stats.value.totalStories
);

const scrollIntoView = () => {
  if (statsCard.value?.$el) {
    statsCard.value.$el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

defineExpose({
  expand,
  collapse,
  scrollIntoView,
});

const storyStore = useStoryStore();
const { stats } = storeToRefs(storyStore);

const progressPercentage = computed(
  () => (stats.value.completedStories / stats.value.totalStories) * 100
);

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
</script>

<style>
@keyframes number-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
    color: var(--color-primary-500);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes text-pulse {
  0% {
    color: var(--color-gray-600);
  }
  50% {
    color: var(--color-primary-500);
  }
  100% {
    color: var(--color-gray-600);
  }
}

.animate-completion {
  animation: number-pulse 2s ease-in-out infinite;
}

.animate-completion-text {
  animation: text-pulse 2s ease-in-out infinite;
}
</style>
