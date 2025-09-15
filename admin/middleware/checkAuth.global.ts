import { useAuthStore } from "~/store/useAuthStore";
import { useAdminStore } from "~/store/useAdminStore";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const adminStore = useAdminStore();

  const authRoutes = [
    "/",
    "/create-account",
    "/forgot-password",
    "/reset-password/*",
  ];

  function matchesRoute(routeList: string[], path: string): boolean {
    return routeList.some((route) => {
      const pattern = new RegExp(
        "^" +
          route
            .replace(/:[^/]+/g, "[^/]+") // dynamic params
            .replace("*", ".*") + // wildcard
          "$"
      );
      return pattern.test(path);
    });
  }

  const isAuth = authStore.isAuthenticated;


  if (isAuth && matchesRoute(authRoutes, to.path)) {
    return navigateTo("/dashboard");
  }

  if (!isAuth && !matchesRoute(authRoutes, to.path)) {
    return navigateTo("/");
  }
});
