
<template>
  <div >
    <!-- Breadcrumb -->
    <Breadcrumb :crumbs="breadcrumbs" />
    <!-- Header Section -->
    <!-- Create Category Form -->
    <div class="bg-cyan-100 p-6 rounded-md mb-4 mt-4">
      <h2 class="text-xl font-medium mb-4">Create Category</h2>
      <form @submit.prevent="createCategory" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
          <input v-model="newCategory.name" type="text" id="name" placeholder="Enter category name"
                 class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <button type="submit" class="px-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Create
          </button>
        </div>
      </form>
    </div>
    <div v-if="isLoading" class="flex justify-center py-8">
      <p>Loading Categories...</p>
    </div>
    <!-- Category List with Pagination -->
    <div v-if="categoryStore.categories && categoryStore.categories.length">
      <h2 class="text-3xl font-bold mb-4">Category Lists</h2>
      <div class="overflow-x-auto bg-cyan-50 shadow-md rounded-md">
        <table class="min-w-full border border-gray-300 shadow-md rounded-md">
          <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 py-3 px-6 text-left">SL</th>
            <th class="border border-gray-300 py-3 px-6 text-left">Name</th>
            <th class="border border-gray-300 py-3 px-6 text-left">Created At</th>
            <th class="border border-gray-300 py-3 px-6 text-left">Updated At</th>
            <th class="border border-gray-300 py-3 px-6 text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(category, index) in categoryStore.categories" :key="category.id" class="hover:bg-blue-100">
            <td class="border border-gray-300 py-3 px-6">{{ index + 1 }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ category.name }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ formatDate(category.created_at) }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ formatDate(category.updated_at) }}</td>
            <td class="border border-gray-300 py-3 px-6 text-center">
              <button @click="editCategory(category.id)" class="border border-amber-100 py-2 px-4 bg-green-300 rounded-md text-blue-600 hover:underline">Edit</button>
              <button @click="deleteCategory(category.id)" class="ml-2 border border-amber-100  py-2 px-4 bg-red-300 rounded-md text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- Pagination -->
        <div class="m-5 flex justify-end gap-2">
          <button
              :disabled="!categoryStore.pagination.prev_page_url"
              @click="fetchCategories(categoryStore.pagination.prev_page_url)"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <button
              :disabled="!categoryStore.pagination.next_page_url"
              @click="fetchCategories(categoryStore.pagination.next_page_url)"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <p>No Category found.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '~/stores/categories';
import { toast } from 'vue3-toastify';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useRoute, useRouter } from 'vue-router';

const categoryStore = useCategoryStore();
const categories = ref([]);
const newCategory = ref({ name: '' });
const isLoading = ref(false);
const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Categories', link: '/category' },
];
const router = useRouter();

const createCategory = () => {
  if (newCategory.value.name.trim() !== '') {
    try {
      categoryStore.createCategory(newCategory.value);
      toast.success('Category created successfully!');
      newCategory.value = { name: '' };
    } catch (error) {
      toast.error('Failed to create category. Please try again.');
      console.error('Error:', error);
    }
  }
};

const editCategory = (id) => {
  categoryStore.editCategory(id);
  router.push(`/category/edit/${id}`);
};

const deleteCategory = (id) => {
  categoryStore.deleteCategory(id);
  toast.success('Category deleted successfully!');
};



const fetchCategories = (url) => {
  isLoading.value = true;
  console.log('Fetching categories from URL:', url); // Debug log
  categoryStore.fetchCategories(url);
  categories.value = categoryStore.categories;
  isLoading.value = false;
};
// format date all categories created_at field
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();

};

onMounted(() => {
  categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
  // console.log('Categories in store:', categoryStore.categories);
});
</script>
