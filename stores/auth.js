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
        async login(email, password) {
            const nuxtApp = useNuxtApp();
            try {
                const { data } = await nuxtApp.$axios.post('/login', { email, password });
                console.log(data);
                this.token = data.token;
                this.user = data.user;
                useCookie('auth_token').value = token;
                //nuxtApp.$axios.setToken(token, 'Bearer');
                this.token = token;
                this.user = user;
                navigateTo('/');
            } catch (error) {
                this.errorMessage = error.data?.data?.message || 'Login failed';
            }
        },
        async logout() {
            useCookie('auth_token').value = null;
            this.user = null;
            this.token = null;
        },
        async fetchUser() {
            const nuxtApp = useNuxtApp();
            if (!this.token) {
                this.token = localStorage.getItem('token');
                if (this.token) {
                    nuxtApp.$axios.setToken(this.token, 'Bearer');
                }
            }
            if (this.token) {
                try {
                    const { data } = await nuxtApp.$axios.get('/user');
                    this.user = data;
                } catch (error) {
                    console.error(error);
                    this.logout();
                }
            }
        },
    },
});
