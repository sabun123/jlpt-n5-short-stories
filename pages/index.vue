<template>
  <!-- Main container with padding for navbar and footer -->
  <div
    class="fixed inset-0 flex flex-col"
    style="
      top: var(--navbar-height, 4rem);
      bottom: var(--footer-height, 4rem);
      background: inherit;
    "
  >
    <!-- Navigation section when not in grid -->
    <div v-if="!showGrid && !selectedFocusWord" class="flex-none p-4 pb-0">
      <div class="flex items-center gap-4 mb-1">
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
    </div>

    <!-- Grid view with fixed layout -->
    <div v-if="showGrid" class="flex flex-col flex-1 p-4 overflow-hidden">
      <!-- Stats cards - fixed at top -->
      <div class="flex-none mb-6">
        <div class="flex gap-4">
          <div
            class="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
          >
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Total<br />Words
            </div>
            <div
              class="mt-1 text-2xl font-semibold text-primary-500 dark:text-primary-400"
            >
              {{ uniqueVocabularyCount }}
            </div>
          </div>
          <div
            class="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
          >
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Total<br />Stories
            </div>
            <div
              class="mt-1 text-2xl font-semibold text-primary-500 dark:text-primary-400"
            >
              {{ stories.length }}
            </div>
          </div>
        </div>
      </div>

      <!-- Scrollable content area -->
      <div class="flex-1 overflow-hidden relative min-h-0">
        <!-- Move fade effect inside scrollable area -->
        <div class="h-full overflow-y-auto pr-2 pb-4 relative">
          <!-- Top fade effect -->
          <div
            class="sticky -top-1 h-8 bg-gradient-to-b from-white dark:from-gray-900 to-transparent pointer-events-none z-10"
          ></div>

          <!-- Content grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <template v-if="!selectedFocusWord">
              <UCard
                v-for="group in groupedStories"
                :key="group.focusWord.word"
                @click="selectFocusWord(group.focusWord.word)"
              >
                <div class="flex items-center gap-4">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold">
                      {{ group.focusWord.word }}
                    </h3>
                    <p class="text-sm">{{ group.focusWord.meaning.en }}</p>
                    <p class="text-xs text-gray-500">
                      {{ group.stories.length }}
                      {{ group.stories.length === 1 ? "story" : "stories" }}
                    </p>
                  </div>
                  <UBadge
                    :color="getTypeColor(group.focusWord.type)"
                    variant="subtle"
                    class="capitalize"
                  >
                    {{ group.focusWord.type }}
                  </UBadge>
                </div>
              </UCard>
            </template>
            <template v-else>
              <div class="col-span-full mb-4">
                <UButton
                  icon="i-heroicons-arrow-left"
                  variant="ghost"
                  @click="selectedFocusWord = null"
                >
                  Back to Focus Words
                </UButton>
              </div>
              <UCard
                v-for="story in storiesForSelectedWord"
                :key="story.id"
                :ui="{
                  background: story.id === currentStoryId ? 'primary' : 'white',
                }"
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
            </template>
          </div>

          <!-- Bottom fade effect -->
          <div
            class="sticky -bottom-5 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none z-10 -mb-8"
          ></div>
        </div>
      </div>
    </div>

    <!-- Story view - Update padding bottom -->
    <div v-else class="flex-1 p-4 pb-8 overflow-y-auto">
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
import { onMounted, computed, nextTick, ref, watch } from "vue";
import { stories, type WordType } from "~/data/stories";
import { useStoryStore } from "~/stores/stories";

// Update type definition - remove undefined
type BadgeColor = "gray" | "red" | "blue" | "green" | undefined;

const { showGrid } = useLayout();
const storyStore = useStoryStore();
const { currentStoryId, currentStory, progress, uniqueVocabularyCount } =
  storeToRefs(storyStore);
const { nextStory, previousStory, markAsCompleted } = storyStore;

const isCompleted = (id: number) => progress.value.completed.includes(id);

const selectedFocusWord = ref<string | null>(null);

const groupedStories = computed(() => {
  const groups = new Map();

  stories.forEach((story) => {
    const focusWord = story.focusWord;
    if (!groups.has(focusWord.word)) {
      groups.set(focusWord.word, {
        focusWord,
        stories: [],
      });
    }
    groups.get(focusWord.word).stories.push(story);
  });

  return Array.from(groups.values());
});

const storiesForSelectedWord = computed(() => {
  if (!selectedFocusWord.value) return [];
  return stories.filter(
    (story) => story.focusWord.word === selectedFocusWord.value
  );
});

const selectFocusWord = (word: string) => {
  selectedFocusWord.value = word;
};

const getTypeColor = (type: WordType): BadgeColor => {
  switch (type) {
    case "kanji":
      return "red";
    case "hiragana":
      return "blue";
    case "katakana":
      return "green";
    default:
      return "gray";
  }
};

// Modify existing selectStory function
const selectStory = (id: number) => {
  currentStoryId.value = id;
  showGrid.value = false;
  selectedFocusWord.value = null; // Reset selected focus word when story is selected
};

// Add to existing watchers/handlers
watch(showGrid, (newValue) => {
  if (!newValue) {
    selectedFocusWord.value = null;
  }
});

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

      if (storyId === stories.length) {
        // Final story completed - focus on stats
        progressStats.value?.scrollIntoView();
      } else if (hasNextStory.value) {
        // Normal completion - focus on next button
        const targetButton =
          window.innerWidth < 768
            ? nextButtonMobile.value
            : nextButtonDesktop.value;

        if (targetButton?.$el) {
          targetButton.$el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
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

/* Add smooth scrolling behavior */
.overflow-y-auto {
  scrollbar-gutter: stable;
  scroll-behavior: smooth;
  padding-bottom: var(--safe-area-bottom, 1rem);
  margin-bottom: env(safe-area-inset-bottom, 1rem);
}

/* Style scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-gray-200));
  border-radius: 3px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-gray-700));
}

/* Ensure the content area takes remaining height */
.h-\[calc\(100vh-4rem\)\] {
  height: calc(100vh - 4rem);
}

/* Remove the previous height calc style and add these: */
body {
  overflow: hidden; /* Prevent body scrolling */
}

/* Remove the previous .fixed.inset-0 style since we're using inline style */

/* Add new fade effect styles */
.from-white {
  --tw-gradient-from-position: 0%;
  --tw-gradient-to-position: 100%;
}

.dark .from-gray-900 {
  --tw-gradient-from-position: 0%;
  --tw-gradient-to-position: 100%;
}
</style>
