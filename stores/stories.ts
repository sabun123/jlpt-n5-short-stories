import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { stories } from "~/data/stories";

export const useStoryStore = defineStore("stories", () => {
  const currentStoryId = ref(1);
  const progress = useLocalStorage("story-progress", {
    completed: [] as number[],
    current: 1,
  });

  const currentStory = computed(() =>
    stories.find((s) => s.id === currentStoryId.value)
  );

  function nextStory() {
    const nextId = currentStoryId.value + 1;
    if (stories.find((s) => s.id === nextId)) {
      currentStoryId.value = nextId;
      progress.value.current = nextId;
    }
  }

  function previousStory() {
    const prevId = currentStoryId.value - 1;
    if (stories.find((s) => s.id === prevId)) {
      currentStoryId.value = prevId;
      progress.value.current = prevId;
    }
  }

  function markAsCompleted(storyId: number) {
    if (!progress.value.completed.includes(storyId)) {
      progress.value.completed.push(storyId);
    }
  }

  return {
    currentStoryId,
    currentStory,
    progress,
    nextStory,
    previousStory,
    markAsCompleted,
  };
});
