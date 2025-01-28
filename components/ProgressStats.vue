<template>
  <UCard class="dark:bg-gray-800">
    <!-- Mobile View -->
    <div class="md:hidden">
      <!-- Make header area more obviously clickable -->
      <button
        class="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50"
        @click="isExpanded = !isExpanded"
      >
        <div class="flex items-center gap-2">
          <div class="font-bold">Progress</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
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
          <div class="text-lg font-bold dark:text-gray-100">
            {{ stats.completedStories }}/{{ stats.totalStories }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Completed</div>
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
        <div class="text-xl md:text-2xl font-bold dark:text-gray-100">
          {{ stats.completedStories }}/{{ stats.totalStories }}
        </div>
        <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
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

const isExpanded = ref(false);

// Add methods to control expansion
const expand = () => {
  isExpanded.value = true;
};

const collapse = () => {
  isExpanded.value = false;
};

defineExpose({
  expand,
  collapse,
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
