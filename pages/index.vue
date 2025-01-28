<template>
  <div>
    <div class="mb-8">
      <ProgressStats />
    </div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">JLPT N5 Short Stories</h1>
      <UButton icon="i-heroicons-squares-2x2" @click="showGrid = !showGrid" />
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
        <UButton
          icon="i-heroicons-arrow-left"
          :disabled="currentStoryId === 1"
          @click="previousStory"
        />
        <UButton
          icon="i-heroicons-arrow-right"
          :disabled="currentStoryId === stories.length"
          @click="nextStory"
        />
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
import { ref, onMounted } from "vue";
import { stories } from "~/data/stories";
import { useStoryStore } from "~/stores/stories";

const showGrid = ref(false);
const storyStore = useStoryStore();
const { currentStoryId, currentStory, progress } = storeToRefs(storyStore);
const { nextStory, previousStory, markAsCompleted } = storyStore;

const isCompleted = (id: number) => progress.value.completed.includes(id);

const selectStory = (id: number) => {
  currentStoryId.value = id;
  showGrid.value = false;
};

onMounted(() => {
  storyStore.startTracking();
});
</script>
