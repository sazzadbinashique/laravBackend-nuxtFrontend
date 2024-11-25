// stores/posts.js
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import { toast } from 'vue3-toastify';
export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        pagination: {
            prev_page_url: null,
            next_page_url: null,
            current_page: 1,
        },
    }),

    actions: {
        async fetchPosts(pageUrl = null) {
            const nuxtApp = useNuxtApp();
            try {
                const url = pageUrl || '/posts';
                const response = await nuxtApp.$axios.get(url);
                this.posts = response.data.data;
                this.pagination = {
                    prev_page_url: response.data.prev_page_url,
                    next_page_url: response.data.next_page_url,
                    current_page: response.data.current_page,
                };
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },

        async createPost(postData) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.post('/posts', postData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.posts.push(response.data);
            } catch (error) {
                toast.error('Failed to create Post! main');
            }
        },

        async updatePost(id, postData) {
            try {
                const response = await useNuxtApp().$axios.put(`/posts/${id}`, postData);
                const index = this.posts.findIndex(post => post.id === id);
                if (index !== -1) {
                    this.posts[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        },

        async deletePost(id) {
            try {
                await useNuxtApp().$axios.delete(`/posts/${id}`);
                this.posts = this.posts.filter(post => post.id !== id);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        },
    },
});
