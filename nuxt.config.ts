// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  plugins: [
    '~/plugins/axios.js', // Include your custom Axios plugin
  ],
  modules: ['@nuxtjs/tailwindcss'],
})
// nuxt.config.js
// export default defineNuxtConfig({
//   // Global page headers
//   app: {
//     head: {
//       title: 'My Nuxt 3 App',
//       meta: [
//         { name: 'description', content: 'My Nuxt 3 application' },
//         { charset: 'utf-8' },
//         { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       ],
//     },
//   },
//   // Plugins
//   plugins: [
//     '~/plugins/axios.js', // Include your custom Axios plugin
//   ],

//   // Modules
//   modules: [
//     '@nuxtjs/tailwindcss', // Tailwind CSS module
//   ],


//   runtimeConfig: {
//     public: {
//       // Define public runtime config
//       apiBase: 'https://lob.bangla.gov.bd/api', // Example of base URL
//     },
//   },
// })
