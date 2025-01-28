<template>
  <UCard class="dark:bg-gray-800">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-4">
        <div class="text-2xl font-bold dark:text-gray-100">
          {{ stats.completedStories }}/{{ stats.totalStories }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Stories Completed
        </div>
      </div>
      <div class="text-center p-4">
        <div class="text-2xl font-bold dark:text-gray-100">
          {{ Math.round(stats.averageScore) }}%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Average Score
        </div>
      </div>
      <div class="text-center p-4">
        <div class="text-2xl font-bold dark:text-gray-100">
          {{ formatTime(stats.totalTimeSpent) }}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
      </div>
      <div class="text-center p-4">
        <UProgress
          :model-value="progressPercentage"
          color="primary"
          class="mb-2"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ Math.round(progressPercentage) }}% Complete
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStoryStore } from "~/stores/stories";

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
