export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    authStore.initializeAuth();

/*
    if (!authStore.token && to.path !== '/login') {
        return navigateTo('/login');
    }*/

    const publicRoutes = ['/login', '/register'];

    if (!authStore.token && !publicRoutes.includes(to.path)) {
        return navigateTo('/login');
    }
});
