<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import AOS from "aos";

onMounted(() => {
    AOS.init();
});
</script>
