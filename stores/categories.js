// stores/categories.js
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
    }),

    actions: {
        async fetchCategories() {
            const nuxtApp = useNuxtApp();
            const authTokenCookie = useCookie('auth_token');
            try {
                const response = await nuxtApp.$axios.get('/categories');
                this.categories = response.data.data; // Assuming categories are in 'data' array
                console.log('Categories:', this.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },

        async createCategory(categoryData) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.post('/categories', categoryData);
                console.log('Categories before push:', this.categories);
                this.categories.push(response.data.data); // Add the new category to the list
                console.log('Response data:', response.data);
            } catch (error) {
                console.error('Error creating category:', error);
            }
        },

        async updateCategory(id, categoryData) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.put(`/categories/${id}`, categoryData);
                const index = this.categories.findIndex(cat => cat.id === id);
                if (index !== -1) {
                    this.categories[index] = response.data; // Update the category in the list
                }
            } catch (error) {
                console.error('Error updating category:', error);
            }
        },

        async deleteCategory(id) {
            const nuxtApp = useNuxtApp();
            try {
                await nuxtApp.$axios.delete(`/categories/${id}`);
                this.categories = this.categories.filter(cat => cat.id !== id); // Remove the deleted category
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        },
    },
});
