<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8 text-center">JLPT N5 Short Stories</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StoryCard v-for="story in stories" :key="story.id" :story="story" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { stories } from "~/data/stories";
</script>
