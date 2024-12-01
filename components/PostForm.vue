<template>
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
      <!-- If the post is new (create) or the file is uploaded -->
      <div v-if="post.photo" class="mt-2">
        <img :src="getPostImageUrl(post.photo)" alt="Post Photo" class="w-32 h-32 object-cover rounded-md" />
      </div>
      <!-- If it's an edit and post already has a photoUrl -->
      <div v-else-if="post.photoUrl" class="mt-2">
        <img :src="getPostImageUrl(post.photoUrl)" alt="Post Photo" class="w-32 h-32 object-cover rounded-md" />
      </div>

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
    <div class="flex mt-6 justify-end">
      <button
          type="submit"
          class="px-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import {ref, watch} from 'vue';
import {useCategoryStore} from '@/stores/categories';
const emit = defineEmits(['submit']);

const props = defineProps({
  initialData: {
    type: Object,
    required: true,
  },
  submitLabel: {
    type: String,
    default: 'Submit',
  },
});

const categories = ref([]);
const post = ref({
  title: props.initialData.title || '',
  category_id: props.initialData.category_id || '',
  description: props.initialData.description || '',
  photo: null,
  photoUrl: props.initialData.photo || null, // Assuming the photo URL is available
});

const errors = ref({});
const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchCategories();
  categories.value = categoryStore.categories;
});
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  post.value.photo = file;
  post.value.photoUrl = URL.createObjectURL(file); // Show preview of the uploaded image
};

const validateForm = () => {
  errors.value = {};
  if (!post.value.title) errors.value.title = 'Title is required.';
  if (!post.value.category_id) errors.value.category_id = 'Category is required.';
  if (!post.value.description) errors.value.description = 'Description is required.';
  return Object.keys(errors.value).length === 0;
};

watch(() => props.initialData, (newData) => {
  post.value = {...newData, photoUrl: newData.photo || null};
});


const getPostImageUrl = (photo) => {
  // If the photo is a file object (i.e., during file upload), use the URL.createObjectURL for the preview
  if (photo instanceof File) {
    return URL.createObjectURL(photo); // Temporary URL for the uploaded file
  } else {
    return `${import.meta.env.VITE_BASE_URL}/storage/${photo}`; // Existing photo URL (for edit)
  }
};
const handleSubmit = () => {
  if (!validateForm()) return;
  const formData = new FormData();
  formData.append('title', post.value.title);
  formData.append('category_id', post.value.category_id);
  formData.append('description', post.value.description);
  if (post.value.photo) formData.append('photo', post.value.photo);

  console.log('Form data being emitted:', formData);

  emit('submit', formData);
};

</script>

<style scoped>
/* Add any custom styles if needed */
</style>
