<template>
  <!-- Breadcrumb -->
  <Breadcrumb :crumbs="breadcrumbs" />

  <div class="bg-gray-100 min-h-screen flex flex-col items-center py-8 mt-3">
    <!-- Profile Card -->
    <div class="bg-white shadow-lg rounded-md p-6 w-full max-w-lg">
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
      <div class="space-y-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <!-- Role -->
        <div class="flex justify-between items-center border-b border-gray-300 py-2">
          <span class="text-gray-700 font-medium">Role:</span>
          <span class="text-gray-900 font-semibold">{{ user.role?.name || 'N/A' }}</span>
        </div>

        <!-- Joined -->
        <div class="flex justify-between items-center border-b border-gray-300 py-2">
          <span class="text-gray-700 font-medium">Joined:</span>
          <span class="text-gray-900">{{ formattedJoinDate }}</span>
        </div>

        <!-- Mobile -->
        <div class="flex justify-between items-center border-b border-gray-300 py-2">
          <span class="text-gray-700 font-medium">Mobile:</span>
          <span class="text-gray-900">{{ user.mobile || 'N/A' }}</span>
        </div>

        <!-- Address -->
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-700 font-medium">Address:</span>
          <span class="text-gray-900">{{ user.address || 'N/A' }}</span>
        </div>
      </div>


      <!-- Action Buttons -->
      <div class="mt-6 flex justify-end gap-4">
<!--        <button @click="editProfile" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Edit Profile
        </button>-->
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
import { toast } from 'vue3-toastify';
import Breadcrumb from "~/components/Breadcrumb.vue";

// Use the auth store
const authStore = useAuthStore();
// const user = computed(() => authStore.user || {});
const user = computed(() => authStore.user || { role: {} });
const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Profile', link: '/profile' },
];
console.log('user not computed', user);
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
  router.push('/login');
  toast.success('Logged out successfully');
};

// Load user profile
onMounted(async () => {
  await authStore.fetchUser(); // Call the fetchUser method from the store
});
</script>

<style scoped>
/* Custom styles (optional) */
</style>
