import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { useCookie } from '#imports';
import { toast } from 'vue3-toastify';
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
        async register(name, email, mobile, role_id, password, confirm_password,address) {
            const nuxtApp = useNuxtApp();
            try {
                const { data } = await nuxtApp.$axios.post('/register', {
                    name,
                    email,
                    mobile,
                    role_id,
                    password,
                    confirm_password,
                    address,
                });
                this.token = data.token;
                this.user = data.user;
                const authTokenCookie = useCookie('auth_token',{
                    httpOnly: true,    // Prevent client-side access to cookies
                    sameSite: 'Strict', // Restrict cross-site requests
                    secure: process.env.NODE_ENV === 'production', // Use `Secure` in production
                });
                authTokenCookie.value = data.token;
                console.log('register', data);
                toast.success('User has been created successfully');
                navigateTo('/');
            } catch (error) {
                toast.error('Registration failed');
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
                toast.success('Logged in successfully');
                navigateTo('/');
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message || 'Login failed. Please check your credentials.';
                console.error('Login Error:', error);
                toast.error(this.errorMessage);
            }
        },
        async logout() {
            const nuxtApp = useNuxtApp();
            await nuxtApp.$axios.post('/logout');
            useCookie('auth_token').value = null;
            this.user = null;
            this.token = null;
            // toast.success('Logged out successfully');
            // Optionally navigate to the login page
            navigateTo('/login');
        },
        async fetchUser() {
            const nuxtApp = useNuxtApp();
            try {
                // Fetch the profile data
                const { data } = await nuxtApp.$axios.get('/user');
                this.user = data;
                console.log('fetchUser', this.user);
            } catch (error) {
                toast.error('Failed to fetch user data');
                console.error('Fetch User Error:', error);
                //this.logout();
            }
        },
    },
});
