import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();
    await authStore.checkAuth(); // Runs before middleware

    console.log('Auth store initialized');
    console.log(authStore.userProfile)
    console.log(authStore.isAuthenticated)
});
