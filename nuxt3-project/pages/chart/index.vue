<template>
  <div class="w-full bg-green-100 p-6 rounded-md text-center">
    <h1 class="text-3xl font-bold">Language Collection Time</h1>
    <p class="text-gray-700 mt-4">
      This is a collection of languages from Bangladesh. We have collected forty languages from Bangladesh.
    </p>

    <!-- Button to go back to Home -->
    <div class="mt-6">
      <NuxtLink to="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </NuxtLink>
    </div>

    <!-- Chart Component -->
    <div class="mt-8">
      <LanguageBarChart />
    </div>
  </div>
</template>

<script setup>
import LanguageBarChart from '@/components/LanguageBarChart.vue';
</script>
