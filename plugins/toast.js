
import { defineNuxtPlugin } from '#app';
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        autoClose: 3000, // Toast duration
        position: 'top-right', // Position
        theme: 'light', // Theme ('light' or 'dark')
    });
});
