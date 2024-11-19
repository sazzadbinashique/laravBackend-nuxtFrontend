<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Posts</h1>
    <button @click="showCreateForm = !showCreateForm" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Add New Post
    </button>

    <!-- Create Post Form -->
    <div v-if="showCreateForm">
      <input v-model="newPost.title" placeholder="Post Title" class="mb-2 p-2 border rounded"/>
      <input v-model="newPost.description" placeholder="Post Description" class="mb-2 p-2 border rounded"/>
      <button @click="createPost" class="bg-green-500 text-white px-4 py-2 rounded">Create Post</button>
    </div>

    <ul>
      <li v-for="post in posts" :key="post.id" class="border p-4 mb-2 rounded">
        <p class="font-bold">{{ post.title }}</p>
        <p>{{ post.description }}</p>
        <button @click="editPost(post)" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
        <button @click="deletePost(post.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePostStore } from '~/stores/posts';

const postStore = usePostStore();

const posts = postStore.posts;
const showCreateForm = ref(false);
const newPost = ref({ title: '', description: '' });

const createPost = () => {
  if (newPost.value.title.trim() && newPost.value.description.trim()) {
    postStore.createPost(newPost.value);
    newPost.value = { title: '', description: '' };
    showCreateForm.value = false;
  }
};

const deletePost = (id) => {
  postStore.deletePost(id);
};

const editPost = (post) => {
  // Handle post editing logic
  alert(`Edit post: ${post.title}`);
};

onMounted(() => {
  postStore.fetchPosts();
});
</script>
