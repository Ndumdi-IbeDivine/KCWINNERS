<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 py-[22px] px-5 lg:px-[68px] items-center">
        <NuxtLink to="/" class="w-fit">
            <img src="/images/logo.svg" alt="" class="h-6">
        </NuxtLink>
        <div class="hidden lg:flex justify-center gap-[20px] xl:gap-[50px]">
            <NuxtLink
                v-for="route in routes"
                :to="`${route.path}`" 
                :class="[$route.path === route.path ? 'font-bold' : '']"
            >
                {{ route.name }}
            </NuxtLink>
        </div>
        <div class="hidden lg:flex gap-[14px] justify-end items-center">
            <button class="bg-tansparent text-[var(--kc-green)] rounded-[8px] px-[20px] py-[10px]">Login</button>
            <button class="bg-[var(--kc-green)] ease-in transition hover:bg-[var(--kc-green-dark)] text-white rounded-[6px] px-[20px] py-[10px]">Sign Up</button>
        </div>
        <!-- sm nav -->
        <div class="flex lg:hidden justify-end">
            <button class="rounded-md border-1 border-zinc-600 px-2.5 py-1.5 text-sm font-semibold inset-ring inset-ring-white/5" @click="open = true">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#050505"><path d="M3 5H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
            <TransitionRoot as="template" :show="open">
            <Dialog class="relative z-10" @close="open = false">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="" leave="ease-in-out duration-500" leave-from="" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-900/50 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                            <div class="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                                <div class="relative flex-1 px-4 sm:px-6">
                                    <div class="flex justify-end">
                                        <button type="button" class="px-2.5 py-1.5 border-1 border-zinc-600 relative rounded-md text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="open = false">
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">Close panel</span>
                                            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#050505"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </button>
                                    </div>
                                    <div class="grid gap-4">
                                        <NuxtLink
                                            v-for="route in routes"
                                            :to="`${route.path}`" 
                                            :class="[$route.path === route.path ? 'font-bold' : '']"
                                            @click="open = false"
                                        >
                                            {{ route.name }}
                                        </NuxtLink>
                                        <button class="bg-tansparent text-[var(--kc-green)] border border-[var(--kc-green)] rounded-[8px] px-[20px] py-[10px] w-fit">Login</button>
                                        <button class="bg-[var(--kc-green)] ease-in transition hover:bg-[var(--kc-green-dark)] text-white rounded-[6px] px-[20px] py-[10px] w-fit">Sign Up</button>
                                    </div>
                                </div>
                                <NuxtLink to="/" class="px-4 w-fit" @click="open = false">
                                    <img src="/images/logo.svg" alt="">
                                </NuxtLink>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
                </div>
            </Dialog>
            </TransitionRoot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)

const routes = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
]
</script>