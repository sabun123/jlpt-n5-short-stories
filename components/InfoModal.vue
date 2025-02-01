<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="text-xl font-bold">About JLPT N5 Stories</div>
      </template>

      <div class="space-y-4 max-h-[60vh] overflow-y-auto">
        <div>
          <h3 class="font-bold mb-2">What is this app?</h3>
          <p class="text-gray-600 dark:text-gray-400">
            A collection of simple Japanese short stories designed to help you
            practice for the JLPT N5 exam. Short stories with a focus on a
            single word.
          </p>
        </div>

        <div>
          <h3 class="font-bold mb-2">Developed by</h3>
          <p class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            Yusuf Ismail bin Shukor
            <a
              href="https://github.com/sabun123"
              class="text-primary-500 hover:underline"
              target="_blank"
            >
              <UIcon name="i-simple-icons-github" />
            </a>
            <a
              href="https://my.linkedin.com/in/yusuf-ismail-bin-shukor"
              class="text-primary-500 hover:underline"
              target="_blank"
            >
              <UIcon name="i-simple-icons-linkedin" />
            </a>
          </p>
        </div>

        <div>
          <h3 class="font-bold mb-2">How to Learn with the App</h3>
          <ul
            class="list-outside list-disc ml-4 text-gray-600 dark:text-gray-400 space-y-2"
          >
            <li class="pl-1">
              Read each story based on the word you're practicing
            </li>
            <li class="pl-1">
              Practice reading the Japanese text without relying on translations
            </li>
            <li class="pl-1">
              Take the quiz after each story to test your comprehension
            </li>
            <li class="pl-1">
              Review completed stories regularly to reinforce learning
            </li>
            <li class="pl-1">
              You should be able to read hiragana and katakana
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-2">App Features</h3>
          <ul
            class="list-outside list-disc ml-4 text-gray-600 dark:text-gray-400 space-y-2"
          >
            <li class="pl-1">
              Browse stories in grid view or read them one by one
            </li>
            <li class="pl-1">
              Toggle between light and dark mode for comfortable reading
            </li>
            <li class="pl-1">Track your progress and completion stats</li>
            <li class="pl-1">
              Practice reading comprehension with each story's quiz
            </li>
            <li class="pl-1">
              Practice reading comprehension with each story's quiz
            </li>
            <li class="pl-1">
              Playback audio of the text when you're unsure of the pronunciation
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-2">Requirements</h3>
          <div class="space-y-3 text-gray-600 dark:text-gray-400">
            <p>Text to Speech supported browsers:</p>
            <ul class="list-outside list-disc ml-4 space-y-2">
              <li class="pl-1 flex items-center gap-2 text-purple-500">
                <UIcon name="i-simple-icons-safari" class="h-5 w-5" />
                Safari
              </li>
              <li class="pl-1 flex items-center gap-2 text-yellow-500">
                <UIcon name="i-simple-icons-googlechrome" class="h-5 w-5" />
                Chrome
              </li>
              <li class="pl-1 flex items-center gap-2 text-blue-500">
                <UIcon name="i-simple-icons-microsoftedge" class="h-5 w-5" />
                Microsoft Edge
              </li>
            </ul>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-signal" class="h-5 w-5" />
              <p>
                Initial internet connection required for first load. Afterwards,
                the app can be used offline as there's no data download needed.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-device-phone-mobile" class="h-5 w-5" />
              <p>
                Optimized for mobile browsers, but fully functional on
                desktop/laptop devices.
              </p>
            </div>
            <div class="flex justify-center items-center gap-2 pt-2">
              <p>Made in Malaysia 🇲🇾</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton color="gray" @click="isOpen = false">Close</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>("modelValue");
</script>
