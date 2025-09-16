import { useAuthStore } from "~/store/useAuthStore";
import Cookies from "js-cookie";

export default defineNuxtPlugin(async () => {
    if(Cookies.get('token')) {
        const authStore = useAuthStore();
        await authStore.checkAuth();

        console.log(authStore.userProfile)
        console.log(authStore.isAuthenticated)
        console.log('Auth store initialized');
    }

});
