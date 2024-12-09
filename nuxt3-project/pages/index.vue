<!-- pages/index.vue -->
<template>
  <div class="w-full text-center">
    <h1 class="text-3xl font-bold bg-green-100 p-6 rounded-md">Latest Posts</h1>
  </div>
  <!-- Loading State -->
  <div v-if="isLoading" class="flex justify-center py-8">
    <p>Loading posts...</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6">
    <Card
        v-for="(post, index) in posts"
        :key="index"
        :title="post.title"
        :author="post.author.name"
        :description="post.description"
        :image="post.photo"
        :publishedDate="formatDate(post.published_at)"
        :category="post.category.name"
        :link="post.link"
        @click="openPostModal(post.id)"
    />


  </div>
  <div class="m-5 flex justify-center gap-2">
    <button
        :disabled="!pagination.prev_page_url"
        @click="fetchPosts(pagination.prev_page_url)"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <button
        :disabled="!pagination.next_page_url"
        @click="fetchPosts(pagination.next_page_url)"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
  <!-- Post Modal -->
  <PostModal
      :postId="selectedPostId"
      :isOpen="isPostModalOpen"
      @close="isPostModalOpen = false"
  />
<!--  <PostModal v-if="selectedPostId !== null" :postId="selectedPostId" @close="selectedPostId = null" />-->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '~/components/Card.vue'; // Import the Card component
import PostModal from "~/components/PostModal.vue"; // Import PostModal component
const { $axios } = useNuxtApp();


const posts = ref([]); // Data for posts
const pagination = ref({}); // Pagination data
const isLoading = ref(false); // Loading state
const isPostModalOpen = ref(false); // Modal visibility state
const selectedPostId = ref(null); // Selected post ID for the modal

const fetchPosts = async (url = '/posts') => {
  try {
    isLoading.value = true;
    const response = await $axios.get(url);
    posts.value = response.data.data;
    pagination.value = {
      prev_page_url: response.data.pagination.prev_page_url,
      next_page_url: response.data.pagination.next_page_url,
      current_page: response.data.pagination.current_page,
    };
    console.log('posts', posts.value);
    console.log('pagination', pagination.value);
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
    isLoading.value = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const openPostModal = (postId) => {
  selectedPostId.value = postId;
  isPostModalOpen.value = true;
};

onMounted(() => {
  fetchPosts();
});
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
