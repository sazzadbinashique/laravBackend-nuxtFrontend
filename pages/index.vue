<!-- pages/index.vue -->
<template>
  <div class=" w-full text-center">
    <h1 class="text-3xl font-bold bg-green-100 p-6 rounded-md">Language of Bangladesh</h1>
<!--     <button @click="fetchLanguages" class="mt-4 p-2 bg-blue-500 text-white rounded">
      Fetch Languages
    </button>-->

    <div v-if="languages.length" class="bg-cyan-50 shadow-md rounded-md">
      <table class="min-w-full border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">SL</th>
          <th class="border border-gray-300 px-4 py-2 text-start">English Name</th>
          <th class="border border-gray-300 px-4 py-2 text-start">Bangla Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(lang, index) in languages" :key="index" class="hover:bg-blue-100">
          <td class="border border-gray-300 px-4 py-2 ">{{ lang.id }}</td>
          <td class="border border-gray-300 px-4 py-2 text-start">{{ lang.en_name }}</td>
          <td class="border border-gray-300 px-4 py-2 text-start">{{ lang.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
// import { ref } from 'vue'
import { ref, onMounted } from 'vue';
const { $axios } = useNuxtApp()


const languages = ref([]);

const fetchLanguages = async () => {
  try {
    const response = await $axios.get('/languages')
    languages.value = response.data  // Set the response data
    // console.log('API Response:', response.data)  // Log response to confirm Axios works
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}



onMounted(() => {
  fetchLanguages();
})

</script>
