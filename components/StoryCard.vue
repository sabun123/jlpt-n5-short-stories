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
        <p
          ref="textContent"
          class="text-lg leading-relaxed flex-1 dark:text-gray-100"
        >
          {{ story.content }}
        </p>
        <div class="flex flex-col gap-2">
          <UButton
            v-if="isSupported && !isPlaying"
            icon="i-heroicons-play-circle"
            color="primary"
            variant="ghost"
            :loading="speaking"
            @click="startAudio"
            tooltip="Play Audio"
          />
          <UButton
            v-if="isSupported && isPlaying"
            icon="i-heroicons-stop-circle"
            color="red"
            variant="ghost"
            class="animate-pulse"
            @click="stopAudio"
            tooltip="Stop Audio"
          />
          <UDropdown
            v-if="isSupported"
            :items="[speedOptions]"
            :ui="{
              container: 'w-16', // This controls the dropdown menu width
              width: 'w-16',
            }"
          >
            <UButton
              color="gray"
              variant="ghost"
              :tooltip="`Speed: ${speechRate}x`"
            >
              {{ speechRate }}x
            </UButton>
            <template #item="{ item }">
              <span :class="{ 'font-bold': item.value === speechRate }">
                {{ item.label }}
              </span>
            </template>
          </UDropdown>
          <UButton
            color="gray"
            variant="ghost"
            :tooltip="showTranslation ? 'Hide English' : 'Show English'"
            @click="showTranslation = !showTranslation"
          >
            {{ showTranslation ? "EN" : "JP" }}
          </UButton>
        </div>
      </div>
      <div
        v-if="showTranslation"
        class="text-sm text-gray-600 dark:text-gray-400"
      >
        {{ story.translations.en }}
      </div>

      <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <!-- Make parent flex container take full height and expand -->
        <div class="flex items-stretch h-full">
          <!-- Left side with fixed width and wrapping -->
          <div class="w-1/3 shrink-0">
            <h4 class="font-semibold mb-2">Focus Word</h4>
            <p class="mb-2 break-words">
              <span class="text-xs text-gray-600 dark:text-gray-400"
                >Meaning:</span
              >
              <br />
              {{ story.focusWord.meaning.en }}
            </p>
            <div class="text-sm space-y-1">
              <template
                v-if="
                  story.focusWord.type === 'kanji' && story.focusWord.readings
                "
              >
                <p
                  v-if="story.focusWord.readings.onyomi?.length"
                  class="break-words"
                >
                  Onyomi: <br />
                  {{ story.focusWord.readings.onyomi.join(", ") }}
                </p>
                <p
                  v-if="story.focusWord.readings.kunyomi?.length"
                  class="break-words"
                >
                  Kunyomi: <br />
                  {{ story.focusWord.readings.kunyomi.join(", ") }}
                </p>
              </template>
            </div>
          </div>

          <!-- Right side with focus word - make sure it fills the height -->
          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div
              class="font-bold leading-none text-right mt-0"
              :class="{
                'text-5xl md:text-6xl xl:text-7xl':
                  story.focusWord.type === 'kanji',
                'text-3xl md:text-4xl xl:text-5xl':
                  story.focusWord.type !== 'kanji',
              }"
            >
              {{ story.focusWord.word }}
            </div>
            <UBadge
              :color="getTypeColor(story.focusWord.type)"
              variant="subtle"
              class="capitalize self-end mb-0"
            >
              {{ story.focusWord.type }}
            </UBadge>
          </div>
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
import type { BadgeColor } from "#ui/types";
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useAudio } from "~/composables/useAudio";
import { useStoryStore } from "~/stores/stories";
import type { Story, WordType } from "~/data/stories";
import { stories } from "~/data/stories";

const toast = useToast();
const storyStore = useStoryStore(); // Move store initialization to the top

const props = defineProps<{
  story: Story;
}>();

const currentQuestionIndex = ref(0);
const showQuestions = ref(false);
const answers = ref<Record<number, number>>({});

// Update this line to include currentWordIndex
const {
  speak,
  stop,
  isSupported,
  error,
  isPlaying,
  currentWordIndex,
  speechRate,
  setRate,
} = useAudio();
const speaking = ref(false);

const textContent = ref<HTMLElement | null>(null);
const currentWordStart = ref(-1);
const currentWordEnd = ref(-1);

// Add a new function to handle initial focus word highlighting
const highlightFocusWord = (text: string) => {
  // Escape any special RegExp characters in the focus word
  const escapedWord = props.story.focusWord.word.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
  // Create a RegExp that matches the whole word
  const wordRegex = new RegExp(escapedWord, "g");
  return text.replace(
    wordRegex,
    `<span class="text-primary-500 dark:text-primary-400 font-medium">${props.story.focusWord.word}</span>`
  );
};

// Update highlightCurrentWord to not handle focus word
const highlightCurrentWord = () => {
  if (!textContent.value || currentWordStart.value === -1) return;

  // First, get the raw text content
  const text = props.story.content;

  // Split the text and apply focus word highlighting to each part
  const before = text.slice(0, currentWordStart.value);
  const current = text.slice(currentWordStart.value, currentWordEnd.value);
  const after = text.slice(currentWordEnd.value);

  // Apply both focus word highlighting and speech highlighting
  const fullHighlightedText = `${highlightFocusWord(
    before
  )}<span class="bg-primary-100 dark:bg-primary-900/50">${highlightFocusWord(
    current
  )}</span>${highlightFocusWord(after)}`;

  textContent.value.innerHTML = fullHighlightedText;
};

// Add a new initialization function
const initializeContent = () => {
  if (textContent.value) {
    nextTick(() => {
      textContent.value!.innerHTML = highlightFocusWord(props.story.content);
    });
  }
};

// Update onMounted to be more robust
onMounted(() => {
  resetAnswers();
  // Add a small delay to ensure DOM is ready
  setTimeout(() => {
    initializeContent();
  }, 0);
});

// Add a watch on the textContent ref itself
watch(textContent, (newContent) => {
  if (newContent) {
    // Text content ref changed
    initializeContent();
  }
});

// Update the story change watch
watch(
  () => props.story.id,
  () => {
    resetAnswers();
    initializeContent();
  }
);

// Update startAudio and stopAudio to preserve focus word highlighting
const startAudio = async () => {
  speaking.value = true;
  try {
    if (!isSupported.value) {
      toast.add({
        title: "Audio not ready",
        description: "Please wait while we initialize the audio...",
        color: "yellow",
      });

      console.log("Waiting for audio support...");

      await new Promise<void>((resolve) => {
        const checkVoices = () => {
          if (isSupported.value) resolve();
          else setTimeout(checkVoices, 100);
        };
        checkVoices();
      });
    }

    // Reset text before starting, preserving focus word highlight
    if (textContent.value) {
      textContent.value.innerHTML = highlightFocusWord(props.story.content);
    }

    await speak(props.story.content, (start, end) => {
      currentWordStart.value = start;
      currentWordEnd.value = end;
      nextTick(() => highlightCurrentWord());
    });
  } catch (e) {
    // console.error("Speech error:", e);
    // toast.add({
    //   title: "Audio Error",
    //   description: "Could not play audio. Please try again.",
    //   color: "red",
    // });
  } finally {
    speaking.value = false;
    currentWordStart.value = -1;
    currentWordEnd.value = -1;
    // Reset text when done, preserving focus word highlight
    if (textContent.value) {
      textContent.value.innerHTML = highlightFocusWord(props.story.content);
    }
  }
};

const stopAudio = () => {
  stop();
  speaking.value = false;
  if (textContent.value) {
    textContent.value.innerHTML = highlightFocusWord(props.story.content);
  }
  currentWordStart.value = -1;
  currentWordEnd.value = -1;
};

// Reset text when audio stops
watch(isPlaying, (playing) => {
  if (!playing && textContent.value) {
    textContent.value.innerHTML = highlightFocusWord(props.story.content);
  }
});

// Update watch handlers
watch(error, (newError) => {
  if (newError) {
    console.error("Speech error:", newError);
    // toast.add({
    //   title: "Audio Error",
    //   description: newError,
    //   color: "red",
    // });
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
    nextTick(() => {
      if (textContent.value) {
        textContent.value.innerHTML = highlightFocusWord(props.story.content);
      }
    });
  }
);

// Add shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Fixed: shuffled[i] instead of i
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

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Add speed options
interface DropdownItem {
  label: string;
  click?: () => void;
  value?: number;
}

const speedOptions = computed<DropdownItem[]>(() =>
  [
    { label: "0.5x", value: 0.5 },
    { label: "0.75x", value: 0.75 },
    { label: "1x", value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
  ].map((option) => ({
    ...option,
    click: () => setRate(option.value),
  }))
);

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

const showTranslation = ref(false); // Add this near the top with other refs
</script>

<style>
/* Remove all previous styles and replace with these */
.transition-colors {
  transition: all 0.15s ease-out;
}

.bg-primary-100 {
  background-color: rgb(
    var(--color-primary-500) / 0.25
  ); /* Increased from 0.1 to 0.25 */
}

.dark .bg-primary-900\/50 {
  background-color: rgb(
    var(--color-primary-900) / 0.75
  ); /* Increased from 0.5 to 0.75 */
}

/* Add this new style */
.px-0 {
  padding-left: 0;
  padding-right: 0;
}

/* Add these new styles */
.max-w-fit {
  max-width: fit-content;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.whitespace-normal {
  white-space: normal;
}
</style>
