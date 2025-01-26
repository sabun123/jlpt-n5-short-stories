<template>
  <UCard>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-4">
        <div class="text-2xl font-bold">
          {{ stats.completedStories }}/{{ stats.totalStories }}
        </div>
        <div class="text-sm text-gray-600">Stories Completed</div>
      </div>
      <div class="text-center p-4">
        <div class="text-2xl font-bold">
          {{ Math.round(stats.averageScore) }}%
        </div>
        <div class="text-sm text-gray-600">Average Score</div>
      </div>
      <div class="text-center p-4">
        <div class="text-2xl font-bold">
          {{ formatTime(stats.totalTimeSpent) }}
        </div>
        <div class="text-sm text-gray-600">Total Time</div>
      </div>
      <div class="text-center p-4">
        <UProgress
          :model-value="(stats.completedStories / stats.totalStories) * 100"
          color="primary"
        />
        <div class="text-sm text-gray-600 mt-2">Overall Progress</div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useStoryStore } from "~/stores/stories";

const storyStore = useStoryStore();
const { stats } = storeToRefs(storyStore);

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
</script>
