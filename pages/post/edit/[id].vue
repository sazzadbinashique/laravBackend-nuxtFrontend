<template>
  <div class="py-2">
    <Breadcrumb :crumbs="breadcrumbs" />
  </div>
  <div class="min-h-screen bg-cyan-50 py-8 flex justify-center">
    <div class="bg-white shadow-md rounded-md w-3/4 p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Edit Post</h1>
      <PostForm
          v-if="currentPost && Object.keys(currentPost).length > 0"
          :key="currentPost.id"
          :initialData="currentPost"
          submitLabel="Update Post"
          @submit="handleSubmit"
      />

      <!-- Loading message -->
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usePostStore } from '@/stores/posts';
import { useRouter, useRoute } from 'vue-router';
import PostForm from '~/components/PostForm.vue';
import { toast } from 'vue3-toastify';

import Breadcrumb from '~/components/Breadcrumb.vue';


// Store and reactive variables
const currentPost = ref({});
const postStore = usePostStore();
const router = useRouter();
const route = useRoute();
const postId = route.params.id;
const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Posts', link: '/post' },
  { label: 'Edit Post', link: `/post/edit/${postId}` },
];



onMounted(() => {
  postStore.editPost(postId).then(() => {
    currentPost.value = { ...postStore.currentPost }; // Re-assign currentPost after fetching data
  });
});
const handleSubmit = async () => {
  try {
    await postStore.updatePost(postId, currentPost.value);
    toast.success('Post has been updated successfully!');
    router.push('/post');
  } catch (error) {
    toast.error('Failed to update post.sdfsfsdf');
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
