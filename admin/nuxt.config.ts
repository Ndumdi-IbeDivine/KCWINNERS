import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    css: ["~/assets/css/main.css"],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
        },
    },
    modules: ["@pinia/nuxt"],
    devtools: { enabled: true },
    vite: {
        plugins: [tailwindcss()],
    },
});
