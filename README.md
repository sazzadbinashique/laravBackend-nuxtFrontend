# Laravel 11 and Nuxt 3 Authentication using Laravel Passport

This guide explains how to set up Laravel Passport for authentication in a Laravel 11 backend and Nuxt 3 frontend.

---

## Prerequisites

- Laravel 11 installed and configured.
- Nuxt 3 installed and configured.
- A configured database for the Laravel project.

---

## Laravel Setup

1. **Install Passport**
   ```bash
   composer require laravel/passport
    ```
   
2. **Publish Passport Migrations**
   ```bash
      php artisan passport:install
      ```
3.  **Run Migrations**
    ```bash
    php artisan migrate
    ```
4. Run `php artisan passport:keys` to generate the encryption keys

5. Run `php artisan passport:client --password` to create a client for password grant tokens

6. **serve the application**
   ```bash
   php artisan serve
   ```
   ```
## Nuxt Setup

1. **install and configure Nuxt Auth**
    ```bash 
    npm install @nuxt/auth-next
    ```
    ```bash
    npm install @nuxtjs/axios
    ```
2. **Add the following to the nuxt.config.js file**
    ```ts
    export default defineNuxtConfig({
        compatibilityDate: '2024-04-03',
        devtools: { enabled: false },
        plugins: [
            '~/plugins/axios.js',
        ],
        modules: [
            '@nuxtjs/tailwindcss',
            '@pinia/nuxt',
        ],
    })
    ```


3. **Dependency install and Run dev cmd **
    ```bash
    npm install
    ```
    ```bash
    npm run dev
    ```
4. **pinia install**
    ```bash
    npm install pinia
    ```


