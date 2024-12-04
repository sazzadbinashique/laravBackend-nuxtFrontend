<template>
  <div class="p-2">
    <div class="w-full bg-green-100 p-6 rounded shadow-md text-center">
      <h1 class="text-3xl font-bold">Contact Us</h1>
      <p class="text-gray-700 mt-4">
        This is the Contact page where we describe our application.
      </p>
      <!-- Add a Button for Contact -->
      <div class="mt-6">
        <NuxtLink to="/about" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md capitalize">
          Go to About
        </NuxtLink>
      </div>
    </div>
    <!-- Contact Form -->
    <form @submit.prevent="submitForm" class="mt-6 bg-cyan-50 p-4 shadow rounded">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile:</label>
        <input
            type="tel"
            id="mobile"
            v-model="form.mobile"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
        <textarea
            id="message"
            v-model="form.message"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
        <input
            type="text"
            id="address"
            v-model="form.address"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>

    <!-- Submitted Messages List -->
    <div v-if="submittedMessages.length" class="mt-6">
      <h2 class="text-xl font-bold">Submitted Messages</h2>
      <ul class="mt-4 list-disc pl-6">
        <li v-for="(message, index) in submittedMessages" :key="index" class="mb-2">
          <strong>{{ message.name }}:</strong> {{ message.message }} <br />
          <small class="text-gray-600">Email: {{ message.email }}, Mobile: {{ message.mobile }}, Address: {{ message.address }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        mobile: '',
        message: '',
        address: '',
      },
      submittedMessages: [],
    };
  },
  methods: {
    submitForm() {
      // Push the current form data to the submittedMessages array
      this.submittedMessages.push({ ...this.form });

      // Clear the form after submission
      this.form.name = '';
      this.form.email = '';
      this.form.mobile = '';
      this.form.message = '';
      this.form.address = '';
    },
  },
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
