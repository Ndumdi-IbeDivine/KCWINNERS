import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore();
    await authStore.checkAuth(); // Runs before middleware
});
