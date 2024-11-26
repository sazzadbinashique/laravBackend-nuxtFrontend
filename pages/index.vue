<!-- pages/index.vue -->
<template>
  <div class="w-full text-start">
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
        :image="getPostImageUrl(post.photo)"
        :publishedDate="formatDate(post.created_at)"
        :category="post.category.name"
        :link="post.link"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '~/components/Card.vue'; // Import the Card component
const { $axios } = useNuxtApp();

const languages = ref([]);
const posts = ref([]); // Data for posts
const isLoading = ref(false); // Loading state

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await $axios.get('/posts');
    posts.value = response.data.data;
    isLoading.value = false;
    console.log('posts', posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Generate full URL for photo
const getPostImageUrl = (photo) => `${import.meta.env.VITE_BASE_URL}/storage/${photo}`;

onMounted(() => {
  fetchPosts();
});

</script>
