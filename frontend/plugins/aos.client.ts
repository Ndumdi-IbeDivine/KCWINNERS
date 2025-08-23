import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin(() => {
    if (process.client) {
        AOS.init({
            duration: 800, // animation duration
            once: true, // whether animation should happen only once
        });
    }
});
