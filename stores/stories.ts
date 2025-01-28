import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { stories } from "~/data/stories";
import type { UserProgress, StoryProgress } from "~/types/progress";

export const useStoryStore = defineStore("stories", () => {
  const currentStoryId = ref(1);
  const progress = useLocalStorage<UserProgress>("story-progress", {
    completed: [],
    current: 1,
    stories: {},
    totalTimeSpent: 0,
  });

  const startTime = ref<Date | null>(null);

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

  function startTracking() {
    startTime.value = new Date();
  }

  function updateProgress(storyId: number, correct: boolean) {
    if (!progress.value.stories[storyId]) {
      progress.value.stories[storyId] = {
        id: storyId,
        completed: false,
        questionsAnswered: 0,
        correctAnswers: 0,
        timeSpent: 0,
      };
    }

    const storyProgress = progress.value.stories[storyId];
    storyProgress.questionsAnswered++;
    if (correct) storyProgress.correctAnswers++;
    storyProgress.lastAttempted = new Date();
  }

  function completeStory(storyId: number) {
    if (!progress.value.stories[storyId]) {
      progress.value.stories[storyId] = {
        id: storyId,
        completed: false,
        questionsAnswered: 0,
        correctAnswers: 0,
        timeSpent: 0,
      };
    }

    const storyProgress = progress.value.stories[storyId];
    storyProgress.completed = true; // Add this line to mark story as completed

    if (!progress.value.completed.includes(storyId)) {
      progress.value.completed.push(storyId);

      if (startTime.value) {
        const timeSpent = Math.floor(
          (new Date().getTime() - startTime.value.getTime()) / 1000
        );
        storyProgress.timeSpent += timeSpent;
        progress.value.totalTimeSpent += timeSpent;
      }
    }

    // Reset timer for next story
    startTime.value = new Date();
  }

  // Add getter for story completion status
  const isStoryCompleted = (storyId: number) => {
    return progress.value.completed.includes(storyId);
  };

  const stats = computed(() => ({
    totalStories: stories.length,
    completedStories: progress.value.completed.length,
    averageScore:
      Object.values(progress.value.stories).reduce(
        (acc, story) =>
          acc + (story.correctAnswers / story.questionsAnswered) * 100,
        0
      ) / Object.keys(progress.value.stories).length || 0,
    totalTimeSpent: progress.value.totalTimeSpent,
  }));

  return {
    currentStoryId,
    currentStory,
    progress,
    nextStory,
    previousStory,
    markAsCompleted,
    stats,
    startTracking,
    updateProgress,
    completeStory,
    isStoryCompleted,
  };
});
