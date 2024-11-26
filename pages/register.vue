<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-5 shadow-lg rounded-md w-3/4">
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
          <label for="mobile" class="block text-gray-700 font-bold mb-2">Mobile</label>
          <input
              v-model="mobile"
              id="mobile"
              type="number"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your mobile"
          />
        </div>
        <div class="mb-4">
          <label for="role_id" class="block text-gray-700 font-bold mb-2">Role</label>
          <select
              v-model="role_id"
              id="role_id"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select a role</option>
            <option v-for="(role, index) in roles" :key="index" :value="index">
              {{ role }}
            </option>
          </select>
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
        <div class="mb-4">
          <label for="address" class="block text-gray-700 font-bold mb-2">Address</label>
          <textarea
              v-model="address"
              id="address"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your address"
          ></textarea>
        </div>
        <button
            type="submit"
            class="px-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {navigateTo, useNuxtApp} from '#app';

const name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const mobile = ref('');
const role_id = ref('');
const address = ref('');
const roles = ref([]);
const errorMessage = ref('');
const authStore = useAuthStore();

const handleRegister = async () => {
  try {
    await authStore.register(name.value, email.value, mobile.value, role_id.value,password.value, confirm_password.value,address.value);
    navigateTo('/'); // Redirect to the home page after registration
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed';
  }
};

// roles list
const fetchRoles = async () => {
  try {
    const nuxtApp = useNuxtApp();
    const response = await nuxtApp.$axios.get('/roles');
    roles.value = response.data;
    console.log('roles', roles);
  } catch (error) {
    errorMessage.value = error.message || 'Failed to fetch roles';
  }
};

// mounted
onMounted(() => {
  fetchRoles();
});



</script>
<style scoped>
/* Add custom styles as needed */
</style>
