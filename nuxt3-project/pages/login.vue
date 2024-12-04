<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 class="mb-6 text-2xl font-semibold text-center text-gray-700">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
              v-model="email"
              type="email"
              placeholder="Email"
              required
              class="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
            type="submit"
            class="w-full py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="mt-4 text-sm text-center text-red-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('sazzad.sumon35@gmail.com');
const password = ref('q1w2e3r4t5');
const errorMessage = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
    console.error('Login failed:', error); // Log the error for debugging
  }
};
</script>

<style scoped>

</style>
