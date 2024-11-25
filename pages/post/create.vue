<template>
  <div class="min-h-screen bg-gray-100 py-8 flex justify-center">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Post</h1>

      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="mb-4">
          <label for="title" class="block text-gray-700 font-medium">Title</label>
          <input
              id="title"
              v-model="post.title"
              type="text"
              placeholder="Enter post title"
              class="w-full mt-2 p-2 border rounded focus:ring focus:ring-blue-300"
          />
          <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        </div>

        <!-- Category -->
        <div class="mb-4">
          <label for="category_id" class="block text-gray-700 font-medium">Category</label>
          <select
              id="category_id"
              v-model="post.category_id"
              class="w-full mt-2 p-2 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.category_id" class="text-red-500 text-sm">{{ errors.category_id }}</p>
        </div>

        <!-- Photo -->
        <div class="mb-4">
          <label for="photo" class="block text-gray-700 font-medium">Photo</label>
          <input
              id="photo"
              type="file"
              @change="handleFileUpload"
              class="w-full mt-2 p-2 border rounded focus:ring focus:ring-blue-300"
          />
          <p v-if="errors.photo" class="text-red-500 text-sm">{{ errors.photo }}</p>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-gray-700 font-medium">Description</label>
          <textarea
              id="description"
              v-model="post.description"
              placeholder="Enter post description"
              rows="4"
              class="w-full mt-2 p-2 border rounded focus:ring focus:ring-blue-300"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {usePostStore} from '@/stores/posts';
import {useCategoryStore} from '@/stores/categories';
import {toast} from 'vue3-toastify';
import { useRoute, useRouter } from 'vue-router';

const postStore = usePostStore();
const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();

const post = ref({
  title: '',
  category_id: '',
  description: '',
  photo: null,
});

const errors = ref({});

const categories = ref([]);

onMounted(async () => {
  await categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  post.value.photo = file;
};

const validateForm = () => {
  errors.value = {};
  if (!post.value.title) errors.value.title = 'Title is required.';
  if (!post.value.category_id) errors.value.category_id = 'Category is required.';
  if (!post.value.description) errors.value.description = 'Description is required.';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the validation errors.');
    return;
  }

  const formData = new FormData();
  formData.append('title', post.value.title);
  formData.append('category_id', post.value.category_id);
  formData.append('description', post.value.description);
  if (post.value.photo) {
    formData.append('photo', post.value.photo);
  }

  try {
    await postStore.createPost(formData);
    toast.success('Post has been created successfully!');
    router.push('/post');
  } catch (error) {
    toast.error('Failed to create the post. Please try again.');
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
