// plugins/axios.js
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'https://lob.bangla.gov.bd/api', // Set your base API URL here
  })

  // Injecting axios instance as `$axios`
  nuxtApp.provide('axios', instance)
})
