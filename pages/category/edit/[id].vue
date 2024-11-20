<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-6">Edit Category</h1>

    <div v-if="categoryStore.currentCategory" class="bg-white p-6 rounded-md mb-8">
      <h2 class="text-xl font-medium mb-4">Edit Category</h2>
      <form @submit.prevent="updateCategory" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
          <input v-model="categoryStore.currentCategory.name" type="text" id="name" placeholder="Enter category name"
                 class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <button type="submit" class="w-1/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Update Category
          </button>
        </div>
      </form>
    </div>

    <div v-else class="text-center">
      <p>Loading category...</p>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '~/stores/categories';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

// Fetch the category by ID when the page loads
const categoryId = route.params.id;
onMounted(() => {
  categoryStore.editCategory(categoryId);
});

const updateCategory = async () => {
  try {
    await categoryStore.updateCategory(categoryStore.currentCategory);
    toast.success('Category updated successfully!');
    router.push('/categories');  // Redirect to category list
  } catch (error) {
    toast.error('Failed to update category. Please try again.');
    console.error('Error:', error);
  }
};
</script>
