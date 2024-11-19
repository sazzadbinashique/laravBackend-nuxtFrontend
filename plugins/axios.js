// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });
    const instance2 = axios.create({
        baseURL: 'https://lob.bangla.gov.bd/api',
    });

  // Set a default token if available
  instance.interceptors.request.use((config) => {
    const token = useCookie('auth_token').value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

    // Set a default token if available
    instance2.interceptors.request.use((config) => {
        const token = useCookie('auth_token').value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

  // Injecting axios instance as `$axios`
  nuxtApp.provide('axios', instance)
  nuxtApp.provide('axios2', instance2)
})
