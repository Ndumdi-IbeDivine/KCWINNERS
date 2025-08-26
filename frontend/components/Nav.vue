<template>
    <div class="grid grid-cols-3 py-[22px] px-[68px] items-center">
        <NuxtLink to=/>
            <img src="/images/logo.svg" alt="">
        </NuxtLink>
        <div class="flex justify-center gap-[50px]">
            <NuxtLink
                v-for="route in routes"
                :to="`${route.path}`" 
                :class="[$route.path === route.path ? 'font-bold' : '']"
            >
                {{ route.name }}
            </NuxtLink>
        </div>
        <div class="flex gap-[14px] justify-end items-center">
            <button class="bg-tansparent text-[var(--kc-green)] rounded-[8px] px-[20px] py-[10px]">Login</button>
            <button class="bg-[var(--kc-green)] ease-in transition hover:bg-[var(--kc-green-dark)] text-white rounded-[6px] px-[20px] py-[10px]">Sign Up</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const routes = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
]
</script>