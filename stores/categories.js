import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        pagination: {
            prev_page_url: null,
            next_page_url: null,
            current_page: 1,
        },
    }),

    actions: {
        async fetchCategories(pageUrl = null) {
            const nuxtApp = useNuxtApp();
            try {
                const url = pageUrl || '/categories';
                const response = await nuxtApp.$axios.get(url);
                this.categories = response.data.data; // Assuming categories are in 'data' array
                this.pagination = {
                    prev_page_url: response.data.prev_page_url,
                    next_page_url: response.data.next_page_url,
                    current_page: response.data.current_page,
                };

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },

        async createCategory(categoryData) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.post('/categories', categoryData);
                await this.fetchCategories();
                nuxtApp.$toast.success('Category created successfully!');

            } catch (error) {
                console.error('Error creating category:', error);
                nuxtApp.$toast.error('Failed to create category. Please try again.');
            }
        },
        // editCategory
        async editCategory(id) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.get(`/categories/${id}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching category:', error);
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
