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
        currentPost: {},
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

        async editPost(id) {
            const nuxtApp = useNuxtApp();
            try {
                const response = await nuxtApp.$axios.get(`/posts/${id}`);
                this.currentPost = response.data;
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        },

        async updatePost(id, postData) {
            const nuxtApp = useNuxtApp();
            if (!postData || Object.keys(postData).length === 0) {
                nuxtApp.$toast.error('postData data is invalid.');
                return;
            }

            try {
                const response = await nuxtApp.$axios.put(`/posts/${id}`, postData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Debug the response structure
                console.log('Response:', response);
                const index = this.posts.findIndex(cat => cat.id === id);
                if (index !== -1) {
                    this.posts[index] = { ...this.posts[index], ...response.data };
                } else {
                    console.warn(`posts with ID ${id} not found in the list.`);
                }

            } catch (error) {
                console.error('Update failed:', error.response || error);
                throw new Error(error.message || 'Failed to update the category.');
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
