<template>
  <div class="w-full bg-green-100 p-6 rounded-md text-center">
    <h1 class="text-3xl font-bold">About Us</h1>
    <p class="text-gray-700 mt-4">
      This is the about page where we describe our application.
    </p>
    <!-- Add a Button for Contact -->
    <div class="mt-6">
      <NuxtLink to="/contact" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Contact
      </NuxtLink>
    </div>
  </div>
  <div class="flex p-2 space-x-2 h-min-100">
    <!-- Left Side: Submitted Messages List -->
    <div class="w-1/2 bg-cyan-100 p-4 rounded-md">
      <h2 class="text-xl font-bold">Submitted Messages</h2>
      <ul class="mt-4 list-disc pl-6">
        <li
            v-for="(message, index) in submittedMessages"
            :key="index"
            class="mb-2 border-b border-gray-300 pb-2 hover:bg-cyan-200 transition-colors duration-200 cursor-pointer"
            @click="openModal(message)"
        >
          <div class="p-2">
            <strong>{{ message.name }}</strong> <br />
            <small class="text-gray-600">Email: {{ message.email }}</small><br />
            <small class="text-gray-600">Mobile: {{ message.mobile }}</small><br />
            <small class="text-gray-600">Address: {{ message.address }}</small><br />
            <p class="mt-1">{{ message.message }}</p>
          </div>
        </li>
      </ul>
      <div v-if="!submittedMessages.length" class="mt-4 text-gray-600">
        <p>No messages submitted yet.</p>
      </div>
    </div>

    <!-- Right Side: Contact Form -->
    <div class="w-1/2 bg-gray-100 p-4 rounded shadow-lg">
      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="mt-6">
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
          <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
          <input
              type="text"
              id="address"
              v-model="form.address"
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



        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>

    <!-- Modal for Viewing Single Message -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 class="text-xl font-bold mb-4">Message Details</h2>
        <table class="min-w-full border border-gray-300">
          <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-left">Field</th>
            <th class="border border-gray-300 p-2 text-left">Details</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="border border-gray-300 p-2">Name</td>
            <td class="border border-gray-300 p-2">{{ selectedMessage.name }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Email</td>
            <td class="border border-gray-300 p-2">{{ selectedMessage.email }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Mobile</td>
            <td class="border border-gray-300 p-2">{{ selectedMessage.mobile }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Address</td>
            <td class="border border-gray-300 p-2">{{ selectedMessage.address }}</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Message</td>
            <td class="border border-gray-300 p-2">{{ selectedMessage.message }}</td>
          </tr>
          </tbody>
        </table>
        <button
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            @click="closeModal"
        >
          Close
        </button>
      </div>
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
      isModalOpen: false,
      selectedMessage: {},
    };
  },
  created() {
    // Load submitted messages from local storage
    const messages = localStorage.getItem('submittedMessages');
    if (messages) {
      this.submittedMessages = JSON.parse(messages);
    }
  },
  methods: {
    submitForm() {
      // Push the current form data to the submittedMessages array
      this.submittedMessages.push({ ...this.form });

      // Store the submitted messages in local storage
      localStorage.setItem('submittedMessages', JSON.stringify(this.submittedMessages));

      // Clear the form after submission
      this.form.name = '';
      this.form.email = '';
      this.form.mobile = '';
      this.form.message = '';
      this.form.address = '';
    },
    openModal(message) {
      this.selectedMessage = message;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedMessage = {};
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>
