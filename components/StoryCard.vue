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
          <UButton color="primary" @click="showQuestions = !showQuestions">
            {{ showQuestions ? "Hide Questions" : "Show Questions" }}
          </UButton>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ questionsCompleted }}/{{ story.questions.length }} Questions
            Completed
          </p>
        </div>

        <div v-if="showQuestions" class="space-y-6">
          <div
            v-for="question in story.questions"
            :key="question.id"
            class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="mb-4">
              <p class="font-medium mb-2 dark:text-gray-100">
                {{ question.question.en }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ question.question.jp }}
              </p>
            </div>

            <div class="space-y-2">
              <div
                v-for="(option, idx) in question.options.en"
                :key="idx"
                class="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{
                  'bg-green-100 dark:bg-green-900':
                    answers[question.id] === idx &&
                    idx === question.correctAnswer,
                  'bg-red-100 dark:bg-red-900':
                    answers[question.id] === idx &&
                    idx !== question.correctAnswer,
                  'opacity-50':
                    answers[question.id] !== undefined &&
                    answers[question.id] !== idx,
                }"
                @click="selectAnswer(question.id, idx)"
              >
                <div class="flex-1">
                  <p class="dark:text-gray-100">{{ option }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ question.options.jp[idx] }}
                  </p>
                </div>
                <UIcon
                  v-if="answers[question.id] === idx"
                  :name="
                    idx === question.correctAnswer
                      ? 'i-heroicons-check-circle'
                      : 'i-heroicons-x-circle'
                  "
                  :class="
                    idx === question.correctAnswer
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                />
              </div>
            </div>

            <div
              v-if="answers[question.id] !== undefined"
              class="mt-4 p-2 rounded bg-gray-100 dark:bg-gray-700"
            >
              <p class="text-sm dark:text-gray-100">
                {{
                  answers[question.id] === question.correctAnswer
                    ? "✅ Correct! Let's continue to the next question."
                    : "❌ Not quite right. Try again!"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useAudio } from "~/composables/useAudio";
import { useStoryStore } from "~/stores/stories";
import type { Story } from "~/data/stories";

const toast = useToast();
const storyStore = useStoryStore(); // Move store initialization to the top

const props = defineProps<{
  story: Story;
}>();

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

watch(answers, (newAnswers) => {
  const allAnswered = props.story.questions.every(
    (q) => typeof newAnswers[q.id] !== "undefined"
  );
  const allCorrect = props.story.questions.every(
    (q) => newAnswers[q.id] === q.correctAnswer
  );

  if (allAnswered && allCorrect) {
    storyStore.completeStory(props.story.id);
    emit("completed", props.story.id);

    toast.add({
      title: "Story Completed!",
      description: "Great job! You can now move to the next story.",
      timeout: 3000,
      color: "green",
    });
  }
});

const questionsCompleted = computed(
  () =>
    props.story.questions.filter((q) => answers.value[q.id] === q.correctAnswer)
      .length
);

const selectAnswer = (questionId: number, answer: number) => {
  const question = props.story.questions.find((q) => q.id === questionId);
  // Only allow selection if not already answered correctly
  if (
    answers.value[questionId] === undefined ||
    (question && answers.value[questionId] !== question.correctAnswer)
  ) {
    answers.value[questionId] = answer;
    handleAnswer(questionId, answer);
  }
};
</script>
