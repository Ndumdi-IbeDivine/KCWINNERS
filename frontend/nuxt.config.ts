import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    css: ["~/assets/css/main.css"],
    ssr: false,

    plugins: ["~/plugins/aos.client.ts"],

    devtools: { enabled: true },
    vite: {
        plugins: [tailwindcss()],
    },
    nitro: {
        preset: 'static'
    },
});
