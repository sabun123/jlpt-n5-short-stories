<template>
  <UNotifications />
  <UCard>
    <template #header>
      <div class="space-y-1">
        <h3 class="text-xl font-semibold">{{ story.title.jp }}</h3>
        <p class="text-sm text-gray-500">{{ story.title.en }}</p>
      </div>
    </template>

    <div class="space-y-4">
      <div class="flex items-start gap-2">
        <p class="text-lg leading-relaxed flex-1 dark:text-gray-100">
          {{ story.content }}
        </p>
        <UButton
          v-if="isSupported"
          icon="i-heroicons-speaker-wave"
          color="primary"
          variant="ghost"
          :loading="speaking"
          @click="playAudio(story.content)"
        />
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        {{ story.translations.en }}
      </div>

      <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 class="font-semibold mb-2">
          Focus Kanji: {{ story.focusKanji.kanji }}
        </h4>
        <p>Meaning: {{ story.focusKanji.meaning.en }}</p>
        <div class="text-sm">
          <p v-if="story.focusKanji.readings.onyomi.length">
            Onyomi: {{ story.focusKanji.readings.onyomi.join(", ") }}
          </p>
          <p v-if="story.focusKanji.readings.kunyomi.length">
            Kunyomi: {{ story.focusKanji.readings.kunyomi.join(", ") }}
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <UButton color="primary" @click="toggleQuestions">
              {{ showQuestions ? "Hide Questions" : "Show Questions" }}
            </UButton>
            <UButton
              v-if="showQuestions"
              size="sm"
              color="gray"
              variant="ghost"
              @click="showTranslations = !showTranslations"
            >
              {{ showTranslations ? "Hide EN" : "Show EN" }}
            </UButton>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Question {{ currentQuestionIndex + 1 }}/{{ story.questions.length }}
          </p>
        </div>

        <div v-if="showQuestions" class="space-y-6">
          <div
            ref="questionsSection"
            v-if="currentQuestion"
            class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="mb-4">
              <p class="font-medium mb-1 text-lg dark:text-gray-100">
                {{ currentQuestion.question.jp }}
              </p>
              <p
                v-if="showTranslations"
                class="text-sm text-gray-600 dark:text-gray-400"
              >
                {{ currentQuestion.question.en }}
              </p>
            </div>

            <div class="space-y-2">
              <div
                v-for="(option, idx) in currentQuestionOptions"
                :key="idx"
                class="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{
                  'bg-green-100 dark:bg-green-900':
                    answers[currentQuestion.id] === option.originalIndex &&
                    option.originalIndex === currentQuestion.correctAnswer,
                  'bg-red-100 dark:bg-red-900':
                    answers[currentQuestion.id] === option.originalIndex &&
                    option.originalIndex !== currentQuestion.correctAnswer,
                }"
                @click="selectAnswer(currentQuestion.id, option.originalIndex)"
              >
                <div class="flex items-center gap-3 flex-1">
                  <span class="text-gray-400 dark:text-gray-500">•</span>
                  <div class="flex-1">
                    <p class="dark:text-gray-100 font-medium">
                      {{ option.jp }}
                    </p>
                    <p
                      v-if="showTranslations"
                      class="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ option.en }}
                    </p>
                  </div>
                </div>
                <UIcon
                  v-if="answers[currentQuestion.id] === option.originalIndex"
                  :name="
                    option.originalIndex === currentQuestion.correctAnswer
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-x-circle'
                  "
                  :class="
                    option.originalIndex === currentQuestion.correctAnswer
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                />
              </div>
            </div>

            <div
              v-if="answers[currentQuestion.id] !== undefined"
              class="mt-4 p-2 rounded bg-gray-100 dark:bg-gray-700 relative overflow-hidden"
            >
              <p class="text-sm dark:text-gray-100 relative z-10">
                {{
                  answers[currentQuestion.id] === currentQuestion.correctAnswer
                    ? "✅ Correct! Next question incoming..."
                    : "❌ Not quite right. Try again!"
                }}
              </p>
              <!-- Simplified progress bar implementation -->
              <div
                v-if="
                  answers[currentQuestion.id] ===
                    currentQuestion.correctAnswer &&
                  currentQuestionIndex < story.questions.length - 1
                "
                class="absolute bottom-0 left-0 right-0 h-1 bg-primary-500/20"
              >
                <div
                  class="h-full w-full bg-primary-500 origin-left"
                  :style="{
                    transform: `scaleX(${progressScale})`,
                    transition: 'transform 1.5s linear',
                  }"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <UTooltip
              text="This is the first question"
              :ui="{ width: 'w-auto' }"
              :disabled="currentQuestionIndex > 0"
            >
              <UButton
                icon="i-heroicons-arrow-left"
                :disabled="currentQuestionIndex === 0"
                :color="currentQuestionIndex > 0 ? 'primary' : 'gray'"
                @click="previousQuestion"
              >
                Previous
              </UButton>
            </UTooltip>

            <UTooltip
              text="This is the last question"
              :ui="{ width: 'w-auto' }"
              :disabled="currentQuestionIndex < story.questions.length - 1"
            >
              <UButton
                icon-right="i-heroicons-arrow-right"
                :disabled="currentQuestionIndex >= story.questions.length - 1"
                :color="
                  currentQuestionIndex < story.questions.length - 1
                    ? 'primary'
                    : 'gray'
                "
                @click="nextQuestion"
              >
                Next
              </UButton>
            </UTooltip>
          </div>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useAudio } from "~/composables/useAudio";
import { useStoryStore } from "~/stores/stories";
import type { Story } from "~/data/stories";
import { stories } from "~/data/stories";

const toast = useToast();
const storyStore = useStoryStore(); // Move store initialization to the top

const props = defineProps<{
  story: Story;
}>();

const currentQuestionIndex = ref(0);
const showQuestions = ref(false);
const answers = ref<Record<number, number>>({});

const { speak, isSupported, error } = useAudio();
const speaking = ref(false);

const playAudio = async (text: string) => {
  speaking.value = true;
  try {
    await speak(text);
  } catch (e) {
    console.error("Speech error:", e);
  } finally {
    speaking.value = false;
  }
};

// Update watch handlers
watch(error, (newError) => {
  if (newError) {
    toast.add({
      title: "Audio Error",
      description: newError,
      color: "red",
    });
  }
});

const emit = defineEmits<{
  completed: [storyId: number];
}>();

const handleAnswer = (questionId: number, answer: number) => {
  const question = props.story.questions.find((q) => q.id === questionId);
  if (question) {
    const correct = answer === question.correctAnswer;
    storyStore.updateProgress(props.story.id, correct);
  }
};

const isLastStory = computed(() => props.story.id === stories.length);

// Replace the existing watch with this updated version
watch(
  () => Object.values(answers.value),
  () => {
    const allAnswered = props.story.questions.every(
      (q) => typeof answers.value[q.id] !== "undefined"
    );
    const allCorrect = props.story.questions.every(
      (q) => answers.value[q.id] === q.correctAnswer
    );

    if (allAnswered && allCorrect) {
      storyStore.completeStory(props.story.id);

      // Force the emit to happen after store update
      nextTick(() => {
        emit("completed", props.story.id);

        toast.add({
          title: isLastStory.value ? "Congratulations! 🎉" : "Story Completed!",
          description: isLastStory.value
            ? "You've completed all the stories! Great work on your Japanese learning journey!"
            : "Great job! You can now move to the next story.",
          timeout: isLastStory.value ? 5000 : 3000,
          color: isLastStory.value ? "primary" : "primary", // Use valid color
        });
      });
    }
  },
  { deep: true }
);

// Update the selectAnswer function to ensure immediate state update
const selectAnswer = (questionId: number, answer: number) => {
  const question = props.story.questions.find((q) => q.id === questionId);
  if (!question) return;

  // Only allow selection if not already answered correctly
  if (
    answers.value[questionId] === undefined ||
    answers.value[questionId] !== question.correctAnswer
  ) {
    answers.value = {
      ...answers.value,
      [questionId]: answer,
    };
    handleAnswer(questionId, answer);
  }
};

// Add type for question options
type QuestionOption = {
  en: string;
  jp: string;
  originalIndex: number;
};

const showTranslations = ref(false); // Changed to false by default
const currentQuestionOptions = ref<QuestionOption[]>([]);

// Update shuffleArray usage in computed
const currentQuestion = computed(() => {
  const question = props.story.questions[currentQuestionIndex.value];
  if (question && !currentQuestionOptions.value.length) {
    currentQuestionOptions.value = shuffleArray(
      question.options.en.map((en, idx) => ({
        en: question.options.en[idx],
        jp: question.options.jp[idx],
        originalIndex: idx,
      }))
    );
  }
  return question;
});

const questionsSection = ref<HTMLElement | null>(null);

const toggleQuestions = () => {
  showQuestions.value = !showQuestions.value;
  if (showQuestions.value) {
    currentQuestionIndex.value = 0;
    // Wait for DOM update then scroll
    nextTick(() => {
      questionsSection.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < props.story.questions.length - 1) {
    clearCurrentOptions();
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    clearCurrentOptions();
    currentQuestionIndex.value--;
  }
};

// Update questionsCompleted computed
const questionsCompleted = computed(
  () =>
    props.story.questions.filter((q) => answers.value[q.id] === q.correctAnswer)
      .length
);

// When an answer is correct, automatically move to next question after a delay
watch(
  () => answers.value,
  (newAnswers) => {
    const currentQ = currentQuestion.value;
    if (currentQ && newAnswers[currentQ.id] === currentQ.correctAnswer) {
      if (currentQuestionIndex.value < props.story.questions.length - 1) {
        // Reset and start progress animation
        progressScale.value = 0;
        // Force a reflow
        requestAnimationFrame(() => {
          progressScale.value = 1;
        });

        setTimeout(() => {
          nextQuestion();
          progressScale.value = 0;
        }, 1500);
      }
    }
  },
  { deep: true }
);

const resetAnswers = () => {
  answers.value = {};
  currentQuestionIndex.value = 0;
  showQuestions.value = false;
};

// Add a watch for story changes to reset state
watch(
  () => props.story.id,
  () => {
    resetAnswers();
  }
);

// When component is mounted, ensure clean state
onMounted(() => {
  resetAnswers();
});

// Add shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Clear options when moving to next/prev question
const clearCurrentOptions = () => {
  currentQuestionOptions.value = [];
  progressScale.value = 0;
};

// Single state for progress tracking
const progressScale = ref(0);
</script>
