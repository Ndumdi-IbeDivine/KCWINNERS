<template>
  <div>
    <Nav />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import AOS from 'aos'

onMounted(() => {
  AOS.init()
})
</script>
