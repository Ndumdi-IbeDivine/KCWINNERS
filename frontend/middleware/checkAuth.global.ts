import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    const authRoutes = [
        "/login",
        "/create-account",
        "/forgot-password",
        "/reset-password/*",
    ];
    const userRoutes = ["/dashboard", "/dashboard/*"];
    const activateRoutes = ["/activate"];

    function matchesRoute(routeList: string[], path: string): boolean {
        return routeList.some((route) => {
            const pattern = new RegExp(
                "^" +
                    route
                        .replace(/:[^/]+/g, "[^/]+")
                        .replace("*", ".*") + // wildcards
                    "$"
            );
            return pattern.test(path);
        });
    }

    const isAuth = authStore.isAuthenticated;
    const isActivated = authStore.userProfile?.isActivated ?? false;

    console.log('isAuth', isAuth)
    console.log('isActivated', isActivated)

    if (isAuth && matchesRoute(authRoutes, to.path)) {
        return navigateTo("/dashboard");
    }

    if (!isAuth && matchesRoute(userRoutes, to.path)) {
        return navigateTo("/login");
    }

    if (isAuth && !isActivated) {
        if (matchesRoute(userRoutes, to.path)) {
            return navigateTo("/activate");
        }
    }

    if (isAuth && isActivated) {
        if (matchesRoute(activateRoutes, to.path) || matchesRoute(authRoutes, to.path)) {
            return navigateTo("/dashboard");
        }
    }
});
