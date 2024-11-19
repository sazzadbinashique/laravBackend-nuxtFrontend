<template>
  <div>
    <!-- Global Header / Navbar -->
    <header class="bg-blue-600 text-white py-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/" class="text-white hover:text-gray-200">Nuxt App</NuxtLink>
        </h1>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/chart" class="nav-link">LanguageChart</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/emi" class="nav-link">EMIWithGrace</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/calculator" class="nav-link">EMICalculator</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
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
// No specific setup required here unless you want to add global logic or data
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
