<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Posts</h1>
    <router-link to="/post/create" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block text-center">
      Add New Post
    </router-link>
    <div v-if="postStore.posts && postStore.posts.length">
      <h2 class="text-xl font-medium mb-4">posts List</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
          <tr>
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
          <tr v-for="(post, index) in postStore.posts" :key="post.id" class="border-b">
            <td class="border border-gray-300 py-3 px-6">{{ index + 1 }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ post.title }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ post.category.name }}</td>
            <td class="border border-gray-300 py-3 px-6">
              <img
                  :src="getPostImageUrl(post.photo)"
                  alt="Post Photo"
                  class="h-16 w-16 object-cover rounded"
              />
            </td>
            <td class="border border-gray-300 py-3 px-6">{{ post.description }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ formatDate(post.created_at) }}</td>
            <td class="border border-gray-300 py-3 px-6 text-center">
              <button @click="editPost(post.id)" class="border border-amber-100 py-2 px-4 bg-green-300 rounded-md text-blue-600 hover:underline">Edit</button>
              <button @click="deletePost(post.id)" class="ml-2 border border-amber-100  py-2 px-4 bg-red-300 rounded-md text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-between">
        <button
            :disabled="!postStore.pagination.prev_page_url"
            @click="fetchPosts(postStore.pagination.prev_page_url)"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
            :disabled="!postStore.pagination.next_page_url"
            @click="fetchPosts(postStore.pagination.next_page_url)"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePostStore } from '~/stores/posts';

const postStore = usePostStore();
const posts = ref([]);

const deletePost = (id) => {
  postStore.deletePost(id);
};

const editPost = (post) => {
  // Handle post editing logic
  alert(`Edit post: ${post.title}`);
};
const fetchPosts = (url) => {
  console.log('Fetching Post from URL:', url); // Debug log
  postStore.fetchPosts(url);
};


const formatDate = (date) => {
  return new Date(date).toLocaleDateString();

};

// Generate full URL for photo
const getPostImageUrl = (photo) => {
  return `http://127.0.0.1:8000/storage/${photo}`;
  // return photo ? `${axios.baseURL}/storage/${photo}` : 'https://via.placeholder.com/150';
};



onMounted(() => {
  postStore.fetchPosts();
  posts.value = postStore.posts;
  console.log('Posts:', posts.value); // Debug log
});
</script>
