import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { useCookie } from '#imports';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        errorMessage: '',
    }),
    actions: {

        initializeAuth() {
            const authTokenCookie = useCookie('auth_token');
            this.token = authTokenCookie.value || null; // Load token from cookie
        },
        async register(name, email, password, confirm_password) {
            const nuxtApp = useNuxtApp();
            try {
                const { data } = await nuxtApp.$axios.post('/register', {
                    name,
                    email,
                    password,
                    confirm_password,
                });
                this.token = data.token;
                this.user = data.user;
                const authTokenCookie = useCookie('auth_token');
                authTokenCookie.value = data.token;
                console.log('register', data);
                navigateTo('/');
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Registration failed');
            }
        },

        async login(email, password) {
            const nuxtApp = useNuxtApp();
            try {
                const { data } = await nuxtApp.$axios.post('/login', { email, password });
                console.log('login', data);
                this.token = data.token;
                this.user = data.user;
                const authTokenCookie = useCookie('auth_token');
                authTokenCookie.value = data.token;

                navigateTo('/');
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message || 'Login failed. Please check your credentials.';
                console.error('Login Error:', error);
            }
        },
        async logout() {
            // Clear the token and profile state
            useCookie('auth_token').value = null;
            this.user = null;
            this.token = null;
            // Optionally navigate to the login page
            navigateTo('/login');
        },
        /*async fetchUser() {
            const nuxtApp = useNuxtApp();

            const authTokenCookie = useCookie('auth_token');
            this.token = authTokenCookie.value;

            if (this.token) {
                try {
                    // Set the token for Axios requests
                    nuxtApp.$axios.setToken(this.token, 'Bearer');

                    // Fetch the profile data
                    const { data } = await nuxtApp.$axios.get('/user');
                    this.user = data;
                } catch (error) {
                    console.error('Fetch User Error:', error);
                    this.logout();
                }
            }
        },*/
    },
});
