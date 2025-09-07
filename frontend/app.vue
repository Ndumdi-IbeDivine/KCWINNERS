<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import AOS from "aos";
import { useAuthStore } from "./store/useAuthStore";
import { useContribustionsStore } from "./store/useContributionsStore";

const authStore = useAuthStore()
const contributionsStore = useContribustionsStore()

async function retry(fn: () => Promise<any>, retries = 2, delay = 1000, errorMessage = 'Something went wrong. Let\'s give it another try.') {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 1) {
            // This is the last retry and it failed
            // initLoadError.value = errorMessage;
            throw err;
        }
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay, errorMessage);
    }
}

onMounted(async () => {
    AOS.init();

    
    if(authStore.isAuthenticated) {
        Promise.all([
            retry(() => contributionsStore.getContributions()),
        ])
    }

    // initLoadError.value = ''
    // initialLoad.value = true;
});
</script>
