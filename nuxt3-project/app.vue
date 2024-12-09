<template>
  <div>
    <!-- Global Header / Navbar -->
    <header class="bg-blue-600 text-white py-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/" class="text-white hover:text-gray-200">{{$t('Nuxt App')}}</NuxtLink>
        </h1>
        <ul class="flex space-x-4">
          <li>
<!--            <NuxtLink to="/" class="nav-link">Home</NuxtLink>-->
            <NuxtLink to="/" class="nav-link">{{ $t('Home') }}</NuxtLink>
          </li>
          <li><NuxtLink to="/post" class="nav-link">{{$t('Posts')}}</NuxtLink></li>
          <li><NuxtLink to="/category" class="nav-link">{{$t('Category')}}</NuxtLink></li>
<!--          <li><NuxtLink to="/chart" class="nav-link">LanguageChart</NuxtLink></li>
          <li><NuxtLink to="/calculator" class="nav-link">EMICalculator</NuxtLink></li>-->
          <li><NuxtLink to="/emi" class="nav-link">{{$t('EMIWithGrace')}}</NuxtLink></li>
          <li><NuxtLink to="/about" class="nav-link">{{$t('About')}}</NuxtLink></li>
<!--          <li><NuxtLink to="/contact" class="nav-link">Contact</NuxtLink></li>-->
          <li v-if="!isLoggedIn">
            <NuxtLink to="/register" class="nav-link">Sign Up</NuxtLink>
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
          </li>
          <li v-else>
            <NuxtLink to="/profile" class="nav-link">{{$t('Profile')}}</NuxtLink>
          </li>
          <li>
            <select v-model="locale" @change="changeLocale" class="text-blue-600 rounded px-4 py-2">
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="container p-5 mx-auto">
      <NuxtPage />
    </main>

    <!-- Global Footer -->
    <footer class="bg-cyan-100 py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 My Nuxt App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Assuming your store is in stores/auth.js
import {useI18n} from "vue-i18n";
const { locale } = useI18n();
const authStore = useAuthStore();

// Check if the profile is logged in
const isLoggedIn = computed(() => !!authStore.token);

// Logout method
const logout = () => {
  authStore.logout();
};

const changeLocale = (event) => {
  locale.value = event.target.value;
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');

body {
  font-family: 'Ubuntu', sans-serif;
}

.nav-link {
  @apply text-white hover:text-gray-200 transition-colors duration-300 text-lg p-2 uppercase border border-transparent hover:border-gray-300; /* Uppercase, border and padding */
}

.nav-link.router-link-exact-active {
  @apply text-amber-700 font-bold border-b-2 rounded-md bg-amber-400 border-yellow-400; /* Add border to the active link */
}

/* Background color for the menu */
nav {
  @apply bg-blue-600; /* You can change this to any other color you prefer */
}
</style>
