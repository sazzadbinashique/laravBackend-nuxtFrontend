export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (!authStore.token && to.path !== '/login') {
        return navigateTo('/login');
    }
});
