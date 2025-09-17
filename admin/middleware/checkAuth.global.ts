import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthChecked) {
        await authStore.checkAuth();
    }

    const authRoutes = [
        "/",
        "/create-account",
        "/forgot-password",
        "/reset-password/*",
    ];

    function matchesRoute(routeList: string[], path: string): boolean {
        return routeList.some((route) => {
            const pattern = new RegExp(
                "^" + route.replace(/:[^/]+/g, "[^/]+").replace("*", ".*") + "$"
            );
            return pattern.test(path);
        });
    }

    const isAuth = authStore.isAuthenticated;

    if (isAuth && matchesRoute(authRoutes, to.path)) {
        return navigateTo('/dashboard');
    }

    if (!isAuth && !matchesRoute(authRoutes, to.path)) {
        return navigateTo("/");
    }
});
