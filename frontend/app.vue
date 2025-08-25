<template>
    <div>
        <Nav />
        <NuxtPage />
        <Footer data-aos="fade-up" data-aos-anchor-placement="top-bottom" />
    </div>
</template>

<script setup lang="ts">
import AOS from "aos";

onMounted(() => {
    AOS.init();
});
</script>
