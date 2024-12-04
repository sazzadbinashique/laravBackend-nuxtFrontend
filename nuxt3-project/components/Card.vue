<template>
  <div class="bg-cyan-50 rounded-xl">
    <a :href="link" class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      <div class="sm:flex sm:justify-between sm:gap-3">
        <div>
          <h3 class="text-lg font-bold text-gray-900 sm:text-xl">{{ title }}</h3>
          <p class="mt-1 text-xs font-medium text-gray-600">By {{ author }}</p>
        </div>

        <div v-if="image" class="hidden sm:block sm:shrink-0">
          <img :alt="title" :src="image" class="size-16 rounded-md object-cover shadow-sm" />
        </div>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-500">{{ description }}</p>
      </div>

      <dl class="mt-6 flex gap-4 sm:gap-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-gray-600">Published</dt>
          <dd class="text-xs text-gray-500">{{ publishedDate }}</dd>
        </div>

        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-gray-600">Category</dt>
          <dd class="text-xs text-gray-500">{{ category }}</dd>
        </div>
      </dl>
    </a>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  publishedDate: { type: String, required: true },
  category: { type: String, required: true },
  link: { type: String, required: false, default: '#' },
});
</script>