<!-- components/DataCard.vue -->
<template>
  <div class="border border-gray-300 rounded-lg p-4 shadow-sm">
    <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
})
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
