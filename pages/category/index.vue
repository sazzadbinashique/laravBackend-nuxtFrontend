
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-6">Categories</h1>

    <!-- Create Category Form -->
    <div class="bg-white p-6 rounded-md mb-8">
      <h2 class="text-xl font-medium mb-4">Create Category</h2>
      <form @submit.prevent="createCategory" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
          <input v-model="newCategory.name" type="text" id="name" placeholder="Enter category name"
                 class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Create Category
          </button>
        </div>
      </form>
    </div>

    <!-- Category List with Pagination -->
    <div v-if="categories && categories.length">
      <h2 class="text-xl font-medium mb-4">Category List</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
          <tr>
            <th class="border border-gray-300 py-3 px-6 text-left">SL</th>
            <th class="border border-gray-300 py-3 px-6 text-left">Name</th>
            <th class="border border-gray-300 py-3 px-6 text-left">Created At</th>
            <th class="border border-gray-300 py-3 px-6 text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(category, index) in categories" :key="category.id" class="border-b">
            <td class="border border-gray-300 py-3 px-6">{{ index + 1 }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ category.name }}</td>
            <td class="border border-gray-300 py-3 px-6">{{ category.created_at }}</td>
            <td class="border border-gray-300 py-3 px-6 text-center">
              <button @click="editCategory(category)" class="border border-amber-100 py-2 px-4 bg-green-300 rounded-md text-blue-600 hover:underline">Edit</button>
              <button @click="deleteCategory(category.id)" class="ml-2 border border-amber-100  py-2 px-4 bg-red-300 rounded-md text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-between">
        <button
            :disabled="!categories.prev_page_url"
            @click="fetchCategories(categories.prev_page_url)"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
            :disabled="!categories.next_page_url"
            @click="fetchCategories(categories.next_page_url)"
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
import { useCategoryStore } from '~/stores/categories';

const categoryStore = useCategoryStore();
const categories = ref([]);
const newCategory = ref({ name: '' });

// Methods
/*const fetchCategories = (url = '/categories') => {
  categoryStore.fetchCategories(url).then((data) => {
    if (data && data) {
      categories.value = data.data; // Assuming the categories are inside a 'data' field
    } else {
      console.error('No data received');
    } // Log up
  });
};*/

const createCategory = () => {
  if (newCategory.value.name.trim() !== '') {
    categoryStore.createCategory(newCategory.value);
    newCategory.value = { name: '' };
  }
};

const deleteCategory = (id) => {
  categoryStore.deleteCategory(id);
};

const editCategory = (category) => {
  categoryStore.updateCategory(category);
};

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>
