<template>
  <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div
        class="bg-white w-full max-w-2xl rounded-lg overflow-hidden shadow-lg max-h-screen flex flex-col"
    >
      <!-- Header -->
      <header
          class="sticky top-0 z-10 px-4 py-3 flex items-center justify-between bg-gray-100 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold truncate">{{ post.title }}</h2>
        <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      </header>

      <!-- Body -->
      <div class="overflow-y-auto flex-1">
        <div class="px-4 py-6">
          <div class="text-sm text-gray-500 flex items-center justify-between mb-4">
            <!-- Author Section -->
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img
                    v-if="post.author.name"
                    :src="getCoverImageUrl(post.author.avatar)"
                    :alt="post.author.name"
                    class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs bg-gray-300">
                  {{ post.author.name.charAt(0).toUpperCase() }}
                </div>
              </div>
              <span class="font-medium text-gray-700">By {{ post.author.name }}</span>
            </div>

            <!-- Publish Time -->
            <div class="flex items-center gap-2 text-gray-500">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6l4 2m4-1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ formattedPublishTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="post.photo" class="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 shadow-md mb-6">
          <!-- Cover Image -->
          <img
              :src="getCoverImageUrl(post.photo)"
              :alt="post.title"
              class="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />

          <!-- Title Overlay -->
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 text-white p-4 flex items-center">
            <h2 class="text-lg font-semibold truncate">{{ post.title }}</h2>
          </div>
        </div>

        <!-- Description Section -->
        <div class="px-4 py-6 bg-white rounded-lg shadow-md">
          <h3 class="text-lg font-semibold text-gray-700">Description:</h3>
          <p class="text-gray-700 leading-relaxed">
            {{ post.description }}
          </p>
        </div>
        <div class="px-4 py-6 bg-white">
            <h3 class="text-lg font-semibold text-gray-700">Category:</h3>
            <span class="px-3 py-1.5 text-xs font-semibold text-white bg-blue-500 rounded-md">
            {{ post.category.name }}
            </span>
        </div>
      </div>



      <!-- Footer -->
      <footer class="sticky bottom-0 px-4 py-3 bg-gray-100 border-t border-gray-200 text-right">
        <button
            @click="closeModal"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import {useNuxtApp} from "#app";

// Props
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emit event for closing the modal
const emit = defineEmits(["close"]);

// State
const post = ref({});

// Fetch post details
const fetchPost = async () => {
  const nuxtApp = useNuxtApp();
  try {
    console.log('postId', props.postId);
    const response = await nuxtApp.$axios.get(`/posts/${props.postId}`);
    console.log('response', response);
    post.value = response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};
const getCoverImageUrl = (photo) => {
  return `${import.meta.env.VITE_BASE_URL}/storage/${photo}`;
};
// Format publish time
const formattedPublishTime = computed(() =>
    new Date(post.value.published_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
);

// Close modal
const closeModal = () => {
  emit("close");
};

// Watch for changes in `postId` and fetch the post
watch(() => props.postId, fetchPost);

onMounted(fetchPost);
</script>

<style scoped>
/* Add any custom modal styles if needed */
</style>
