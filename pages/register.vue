<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
          <input
              v-model="name"
              id="name"
              type="text"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input
              v-model="email"
              id="email"
              type="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input
              v-model="password"
              id="password"
              type="password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
          />
        </div>
        <div class="mb-4">
          <label for="confirm_password" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input
              v-model="confirm_password"
              id="confirm_password"
              type="password"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Confirm your password"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { navigateTo } from '#app';

const name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();

const handleRegister = async () => {
  try {
    await authStore.register(name.value, email.value, password.value, confirm_password.value);
    navigateTo('/'); // Redirect to the home page after registration
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed';
  }
};
</script>
<style scoped>
/* Add custom styles as needed */
</style>
