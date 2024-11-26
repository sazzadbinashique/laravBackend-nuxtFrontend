

<template>
  <div>
    <!-- Breadcrumb -->
    <Breadcrumb :crumbs="breadcrumbs" />

    <!-- Header Section -->
    <div class="flex justify-between py-2">
      <h2 class="text-3xl font-bold mb-4">Posts Lists</h2>
      <router-link to="/post/create" class="bg-blue-500 text-white px-4 py-1.5 rounded mb-4 text-center">
        Add New Post
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-8">
      <p>Loading posts...</p>
    </div>

    <!-- Post Table -->
    <div v-else-if="postStore.posts && postStore.posts.length" class="overflow-x-auto bg-cyan-50 shadow-md rounded-md">
      <table class="min-w-full border border-gray-300 shadow-lg rounded-lg">
        <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 py-3 px-6 text-left">SL</th>
          <th class="border border-gray-300 py-3 px-6 text-left">Name</th>
          <th class="border border-gray-300 py-3 px-6 text-left">Category</th>
          <th class="border border-gray-300 py-3 px-6 text-left">Photo</th>
          <th class="border border-gray-300 py-3 px-6 text-left">Description</th>
          <th class="border border-gray-300 py-3 px-6 text-left">Created At</th>
          <th class="border border-gray-300 py-3 px-6 text-center">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(post, index) in postStore.posts" :key="post.id" class="hover:bg-blue-100">
          <td class="border border-gray-300 py-3 px-6">{{ index + 1 }}</td>
          <td class="border border-gray-300 py-3 px-6">{{ post.title }}</td>
          <td class="border border-gray-300 py-3 px-6">{{ post.category.name }}</td>
          <td class="border border-gray-300 py-3 px-6">
            <img :src="getPostImageUrl(post.photo)" alt="Post Photo" class="h-16 w-16 object-cover rounded" />
          </td>
          <td class="border border-gray-300 py-3 px-6">{{ post.description }}</td>
          <td class="border border-gray-300 py-3 px-6">{{ formatDate(post.created_at) }}</td>
          <td class="border border-gray-300 py-3 px-6 text-center">
            <button @click="editPost(post)" class="border border-amber-100 py-2 px-4 bg-green-300 rounded-md text-blue-600 hover:underline">Edit</button>
            <button @click="deletePost(post.id)" class="ml-2 border border-amber-100 py-2 px-4 bg-red-300 rounded-md text-red-600 hover:underline">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="m-5 flex justify-end gap-2">
        <button
            :disabled="!postStore.pagination.prev_page_url"
            @click="fetchPosts(postStore.pagination.prev_page_url)"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
            :disabled="!postStore.pagination.next_page_url"
            @click="fetchPosts(postStore.pagination.next_page_url)"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- No Posts Found -->
    <div v-else class="text-center py-8">
      <p>No posts found.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostStore } from '~/stores/posts';
import Breadcrumb from '@/components/Breadcrumb.vue';

// Store and reactive variables
const postStore = usePostStore();
const posts = ref([]);
const isLoading = ref(false);
const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Posts', link: '/post' },
];

// Fetch Posts
const fetchPosts = async (url = null) => {
  isLoading.value = true;
  await postStore.fetchPosts(url);
  posts.value = postStore.posts;
  isLoading.value = false;
};

// Utility Functions
const formatDate = (date) => new Date(date).toLocaleDateString();
const getPostImageUrl = (photo) => `${import.meta.env.VITE_BASE_URL}/storage/${photo}`;

// Actions
const deletePost = (id) => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    postStore.deletePost(id);
  }
};


const editPost = (id) => {
  postStore.editPost(id);
  // Redirect to the edit page
  router.push(`/post/edit/${id}`);
};

// Lifecycle Hook
onMounted(() => {
  fetchPosts();
});
</script>