<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './store/useAuthStore';
import { useAdminStore } from '~/store/useAdminStore';

const authStore = useAuthStore();
const adminStore = useAdminStore();
const { users, isInitLoaded } = storeToRefs(adminStore)

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
    if(authStore.isAuthenticated) {
        Promise.all([
            retry(() => adminStore.getPendingRegistrations()),
            retry(() => adminStore.getClearedUsers()),
            retry(() => adminStore.getUsers()),
        ])

        isInitLoaded.value = true
    }

    // initLoadError.value = ''
    // initialLoad.value = true;
});
</script>
