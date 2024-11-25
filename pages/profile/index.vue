<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8">
    <!-- Profile Card -->
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div class="flex flex-col items-center">
        <!-- User Avatar -->
        <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-4">
          <img :src="user.avatar || defaultAvatar" alt="User Avatar" class="w-full h-full object-cover" />
        </div>

        <!-- User Name -->
        <h1 class="text-2xl font-bold text-gray-800">{{ user.name || 'Guest User' }}</h1>
        <p class="text-gray-600">{{ user.email }}</p>
      </div>

      <hr class="my-6 border-gray-300" />

      <!-- User Details -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-700 font-medium">Role:</span>
          <span class="text-gray-900">{{ user.role || 'N/A' }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-700 font-medium">Joined:</span>
          <span class="text-gray-900">{{ formattedJoinDate }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-center gap-4">
        <button @click="editProfile" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <button @click="logout" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Use the auth store
const authStore = useAuthStore();
const user = computed(() => authStore.user || {});
console.log('user', user);
const router = useRouter();

// Default avatar
const defaultAvatar = 'https://via.placeholder.com/150';

// Formatted join date
const formattedJoinDate = computed(() => {
  if (!user.value?.created_at) return 'N/A';
  return new Date(user.value.created_at).toLocaleDateString();
});

// Edit profile action
const editProfile = () => {
  router.push('/edit-profile');
};

// Logout action
const logout = () => {
  authStore.logout();
};

// Load user profile
onMounted(async () => {
  await authStore.fetchUser(); // Call the fetchUser method from the store
});
</script>

<style scoped>
/* Custom styles (optional) */
</style>
