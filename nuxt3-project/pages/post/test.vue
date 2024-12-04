<template>
  <div class="py-2">
    <Breadcrumb :crumbs="breadcrumbs" />
  </div>
  <div class="min-h-screen bg-cyan-50 py-8 flex justify-center">
    <div class="bg-white shadow-md rounded-md w-3/4 p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Edit Post</h1>

      <!-- Form for editing post -->
      <form @submit.prevent="UpdatePost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
              type="text"
              id="title"
              v-model="post.title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
          />
        </div>

        <div class="mb-4">
          <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
          <select
              id="category_id"
              v-model="post.category_id"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
          >
            <option value="">Select Category</option>
            <!-- Dynamically populate categories from store -->
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
              id="description"
              v-model="post.description"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
              required
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="photo" class="block text-sm font-medium text-gray-700">Photo</label>
          <input
              type="file"
              id="photo"
              @change="handleFileChange"
              class="mt-1 block w-full"
          />
        </div>

        <div class="flex justify-end">
          <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update Post
          </button>
        </div>
      </form>

      <!-- Loading message -->
      <!--      <p v-else>Loading...</p>-->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usePostStore } from '@/stores/posts';
import { useCategoryStore } from '@/stores/categories';  // Assuming you have a category store
import { useRouter, useRoute } from 'vue-router';
import Breadcrumb from '~/components/Breadcrumb.vue';
import { toast } from 'vue3-toastify';

const currentPost = ref({});
const categories = ref([]); // This will hold your categories
const postStore = usePostStore();
const categoryStore = useCategoryStore();  // Assuming you have a category store to manage categories
const router = useRouter();
const route = useRoute();
const postId = route.params.id;
const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Posts', link: '/post' },
  { label: 'Edit Post', link: `/post/edit/${postId}` },
];

const post = ref({});
onMounted(async () => {
  postStore.editPost(postId).then(() => {
    post.value = { ...postStore.currentPost }; // Re-assign currentPost after fetching data
  });
  // Fetch categories when the component mounts
  categoryStore.fetchCategories().then(() => {
    categories.value = categoryStore.categories; // Assign categories to the ref
  });
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    post.value.photo = file; // Assign file to the currentPost object
  }
};

const UpdatePost = async () => {
  try {
    console.log('Post:', post.value);
    await postStore.updatePost(postId, post.value);
    toast.success('Post has been updated successfully!');
    router.push('/post');
  } catch (error) {
    console.error('Error updating post:', error.message);
    toast.error('Failed to update post. Please try again.');
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
