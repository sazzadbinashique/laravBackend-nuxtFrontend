// stores/posts.js
import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
    }),

    actions: {
        async fetchPosts() {
            try {
                const response = await useNuxtApp().$axios.get('/posts');
                this.posts = response.data;
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },

        async createPost(postData) {
            try {
                const response = await useNuxtApp().$axios.post('/posts', postData);
                this.posts.push(response.data);
            } catch (error) {
                console.error('Error creating post:', error);
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
