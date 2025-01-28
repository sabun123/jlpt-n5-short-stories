<template>
  <div>
    <div class="mb-8">
      <ProgressStats />
    </div>

    <div v-if="showGrid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard
        v-for="story in stories"
        :key="story.id"
        :ui="{ background: story.id === currentStoryId ? 'primary' : 'white' }"
        @click="selectStory(story.id)"
      >
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ story.title.jp }}</h3>
            <p class="text-sm">{{ story.title.en }}</p>
          </div>
          <UIcon
            v-if="isCompleted(story.id)"
            name="i-heroicons-check-circle"
            class="text-green-500"
          />
        </div>
      </UCard>
    </div>

    <div v-else>
      <div class="flex justify-between mb-4">
        <UTooltip
          text="No previous story available"
          :ui="{ width: 'w-auto' }"
          :disabled="hasPreviousStory"
        >
          <UButton
            icon="i-heroicons-arrow-left"
            :disabled="!hasPreviousStory"
            :color="hasPreviousStory ? 'primary' : 'gray'"
            @click="previousStory"
          />
        </UTooltip>

        <UTooltip
          text="No more stories available"
          :ui="{ width: 'w-auto' }"
          :disabled="hasNextStory"
        >
          <UButton
            icon="i-heroicons-arrow-right"
            :disabled="!hasNextStory"
            :color="hasNextStory ? 'primary' : 'gray'"
            :class="{
              'animate-border': isCurrentStoryCompleted && hasNextStory,
            }"
            @click="nextStory"
          />
        </UTooltip>
      </div>
      <StoryCard
        v-if="currentStory"
        :story="currentStory"
        @completed="markAsCompleted(currentStory.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
import { stories } from "~/data/stories";
import { useStoryStore } from "~/stores/stories";

const { showGrid } = useLayout();
const storyStore = useStoryStore();
const { currentStoryId, currentStory, progress } = storeToRefs(storyStore);
const { nextStory, previousStory, markAsCompleted } = storyStore;

const isCompleted = (id: number) => progress.value.completed.includes(id);

const selectStory = (id: number) => {
  currentStoryId.value = id;
  showGrid.value = false;
};

const hasPreviousStory = computed(() => currentStoryId.value > 1);
const hasNextStory = computed(() => currentStoryId.value < stories.length);

const isCurrentStoryCompleted = computed(() =>
  currentStory.value ? isCompleted(currentStory.value.id) : false
);

onMounted(() => {
  storyStore.startTracking();
});
</script>

<style>
@keyframes border-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-500), 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(var(--color-primary-500), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--color-primary-500), 0);
  }
}

.animate-border {
  animation: border-pulse 2s infinite;
}
</style>
