<template>
  <UCard>
    <template #header>
      <div class="space-y-1">
        <h3 class="text-xl font-semibold">{{ story.title.jp }}</h3>
        <p class="text-sm text-gray-500">{{ story.title.en }}</p>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-lg leading-relaxed">{{ story.content }}</p>
      <div class="text-sm text-gray-600">{{ story.translations.en }}</div>

      <div class="mt-4 p-3 bg-gray-50 rounded-lg">
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
      <UButton color="primary" @click="showQuestions = !showQuestions">
        {{ showQuestions ? "Hide Questions" : "Show Questions" }}
      </UButton>

      <div v-if="showQuestions" class="mt-4 space-y-4">
        <div
          v-for="question in story.questions"
          :key="question.id"
          class="p-4 bg-gray-50 rounded-lg"
        >
          <p class="font-medium mb-2">{{ question.question.en }}</p>
          <URadio
            v-model="answers[question.id]"
            :options="
              question.options.en.map((opt, idx) => ({
                label: opt,
                value: idx,
              }))
            "
          />
          <p v-if="answers[question.id] !== undefined" class="mt-2 text-sm">
            {{
              answers[question.id] === question.correctAnswer
                ? "✅ Correct!"
                : "❌ Try again!"
            }}
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { Story } from "~/data/stories";

const props = defineProps<{
  story: Story;
}>();

const showQuestions = ref(false);
const answers = ref<Record<number, number>>({});
</script>
