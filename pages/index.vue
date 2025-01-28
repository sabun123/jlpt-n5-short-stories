<template>
  <div>
    <!-- Replace the top progress stats section with navigation row on mobile -->
    <div class="flex items-center gap-4 mb-8">
      <UTooltip
        text="No previous story available"
        :ui="{ width: 'w-auto' }"
        :disabled="hasPreviousStory"
        class="md:hidden"
      >
        <UButton
          icon="i-heroicons-arrow-left"
          :disabled="!hasPreviousStory"
          :color="hasPreviousStory ? 'primary' : 'gray'"
          @click="handlePreviousStory"
        />
      </UTooltip>

      <div class="flex-1">
        <ProgressStats ref="progressStats" />
      </div>

      <UTooltip
        text="No more stories available"
        :ui="{ width: 'w-auto' }"
        :disabled="hasNextStory"
        class="md:hidden"
      >
        <UButton
          ref="nextButtonMobile"
          icon="i-heroicons-arrow-right"
          :disabled="!hasNextStory"
          :color="hasNextStory ? 'primary' : 'gray'"
          :class="{
            'animate-border': isCurrentStoryCompleted && hasNextStory,
          }"
          @click="handleNextStory"
        />
      </UTooltip>
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

    <!-- Hide navigation buttons in story view on mobile since they're at the top now -->
    <div v-else>
      <div class="hidden md:flex justify-between mb-4">
        <UTooltip
          text="No previous story available"
          :ui="{ width: 'w-auto' }"
          :disabled="hasPreviousStory"
        >
          <UButton
            icon="i-heroicons-arrow-left"
            :disabled="!hasPreviousStory"
            :color="hasPreviousStory ? 'primary' : 'gray'"
            @click="handlePreviousStory"
          />
        </UTooltip>

        <UTooltip
          text="No more stories available"
          :ui="{ width: 'w-auto' }"
          :disabled="hasNextStory"
        >
          <UButton
            ref="nextButtonDesktop"
            icon="i-heroicons-arrow-right"
            :disabled="!hasNextStory"
            :color="hasNextStory ? 'primary' : 'gray'"
            :class="{
              'animate-border': isCurrentStoryCompleted && hasNextStory,
            }"
            @click="handleNextStory"
          />
        </UTooltip>
      </div>
      <StoryCard
        v-if="currentStory"
        :story="currentStory"
        @completed="handleStoryCompletion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressStatsExposed } from "~/types/components";
import type { UButton } from "#components"; // Add this import
import { storeToRefs } from "pinia";
import { onMounted, computed, nextTick, ref } from "vue";
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
  currentStory.value
    ? storyStore.isStoryCompleted(currentStory.value.id)
    : false
);

const nextButtonMobile = ref<InstanceType<typeof UButton> | null>(null);
const nextButtonDesktop = ref<InstanceType<typeof UButton> | null>(null);
const progressStats = ref<ProgressStatsExposed | null>(null);

const handleStoryCompletion = (storyId: number) => {
  nextTick(() => {
    if (currentStory.value && currentStory.value.id === storyId) {
      // Show progress stats
      progressStats.value?.expand();

      // Smooth scroll and focus
      if (hasNextStory.value) {
        // Get the appropriate button based on viewport
        const targetButton =
          window.innerWidth < 768
            ? nextButtonMobile.value
            : nextButtonDesktop.value;

        if (targetButton?.$el) {
          targetButton.$el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          // Focus after scroll animation completes
          setTimeout(() => {
            targetButton.$el.focus();
          }, 500);
        }
      }
    }
  });
};

const handleNextStory = () => {
  progressStats.value?.collapse();
  nextStory();
};

const handlePreviousStory = () => {
  progressStats.value?.collapse();
  previousStory();
};

onMounted(() => {
  storyStore.startTracking();
});
</script>

<style>
@keyframes border-pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(var(--color-primary-500) / 0.7);
    border-color: rgb(var(--color-primary-500));
  }
  70% {
    box-shadow: 0 0 0 10px rgb(var(--color-primary-500) / 0);
    border-color: rgb(var(--color-primary-500) / 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(var(--color-primary-500) / 0);
    border-color: rgb(var(--color-primary-500));
  }
}

.animate-border {
  animation: border-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border: 2px solid transparent;
}
</style>
