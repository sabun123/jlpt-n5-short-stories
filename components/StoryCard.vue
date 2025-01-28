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
          <UButton color="primary" @click="toggleQuestions">
            {{ showQuestions ? "Hide Questions" : "Show Questions" }}
          </UButton>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Question {{ currentQuestionIndex + 1 }}/{{ story.questions.length }}
          </p>
        </div>

        <div v-if="showQuestions" class="space-y-6">
          <div
            v-if="currentQuestion"
            class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="mb-4">
              <p class="font-medium mb-2 dark:text-gray-100">
                {{ currentQuestion.question.en }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ currentQuestion.question.jp }}
              </p>
            </div>

            <div class="space-y-2">
              <div
                v-for="(option, idx) in currentQuestion.options.en"
                :key="idx"
                class="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{
                  'bg-green-100 dark:bg-green-900':
                    answers[currentQuestion.id] === idx &&
                    idx === currentQuestion.correctAnswer,
                  'bg-red-100 dark:bg-red-900':
                    answers[currentQuestion.id] === idx &&
                    idx !== currentQuestion.correctAnswer,
                  'opacity-50':
                    answers[currentQuestion.id] !== undefined &&
                    answers[currentQuestion.id] !== idx,
                }"
                @click="selectAnswer(currentQuestion.id, idx)"
              >
                <div class="flex-1">
                  <p class="dark:text-gray-100">{{ option }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ currentQuestion.options.jp[idx] }}
                  </p>
                </div>
                <UIcon
                  v-if="answers[currentQuestion.id] === idx"
                  :name="
                    idx === currentQuestion.correctAnswer
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-x-circle'
                  "
                  :class="
                    idx === currentQuestion.correctAnswer
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                />
              </div>
            </div>

            <div
              v-if="answers[currentQuestion.id] !== undefined"
              class="mt-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
            >
              <p class="text-sm dark:text-gray-100">
                {{
                  answers[currentQuestion.id] === currentQuestion.correctAnswer
                    ? "✅ Correct! Press next to continue."
                    : "❌ Not quite right. Try again!"
                }}
              </p>
            </div>
          </div>

          <div class="flex justify-between">
            <UButton
              icon="i-heroicons-arrow-left"
              :disabled="currentQuestionIndex === 0"
              @click="previousQuestion"
            >
              Previous
            </UButton>
            <UButton
              icon-right="i-heroicons-arrow-right"
              :disabled="currentQuestionIndex >= story.questions.length - 1"
              @click="nextQuestion"
            >
              Next
            </UButton>
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

const currentQuestion = computed(
  () => props.story.questions[currentQuestionIndex.value]
);

const toggleQuestions = () => {
  showQuestions.value = !showQuestions.value;
  if (showQuestions.value) {
    currentQuestionIndex.value = 0;
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < props.story.questions.length - 1) {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
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
      setTimeout(() => {
        if (currentQuestionIndex.value < props.story.questions.length - 1) {
          nextQuestion();
        }
      }, 1500);
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
</script>
