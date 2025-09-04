<template>
    <div>
        <div class="lg:hidden">
            <!-- <div class="flex lg:hidden justify-end"> -->
            <div class="px-5 py-3 border-b border-slate-200 bg-[#f6f6f6] grid grid-cols-2 items-center-safe w-full">
                <NuxtLink to="/dashboard">
                    <img src="/images/logo.svg" alt="">
                </NuxtLink>
                <div class="flex justify-end">
                    <button class="rounded-md border-1 border-zinc-600 px-2.5 py-1.5 text-sm font-semibold inset-ring inset-ring-white/5" @click="open = true">
                        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#050505"><path d="M3 5H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                </div>
            </div>
            <TransitionRoot as="template" :show="open">
                <Dialog class="relative z-10" @close="open = false">
                    <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="" leave="ease-in-out duration-500" leave-from="" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-gray-900/50 transition-opacity" />
                    </TransitionChild>
        
                    <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto relative w-screen max-w-sm">
                                <div class="relative flex h-full flex-col overflow-y-auto bg-[#010206] py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                                    <div class="relative flex-1 px-4 sm:px-6">
                                        <div class="flex justify-end">
                                            <button type="button" class="px-2.5 py-1.5 border-1 border-zinc-600 relative rounded-md text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="open = false">
                                                <span class="absolute -inset-2.5" />
                                                <span class="sr-only">Close panel</span>
                                                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                            </button>
                                        </div>
                                        <div class="grid gap-4">
                                            <div class="mt-8 flex-1">
                                                <NuxtLink to="/dashboard" @click="open = false" :class="[$route.path == '/dashboard' || $route.path == '/dashboard/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                                                    <img src="/images/home.svg" alt="">
                                                    <div class="flex-1">Dashboard</div>
                                                    <img src="/images/chevron-right.svg" alt="">
                                                </NuxtLink>
                                                <NuxtLink to="/dashboard/contributions" @click="open = false" :class="[$route.path == '/dashboard/contributions' || $route.path == '/dashboard/contributions/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                                                    <img src="/images/shop.svg" alt="">
                                                    <div class="flex-1">Contributions</div>
                                                    <img src="/images/chevron-right.svg" alt="">
                                                </NuxtLink>
                                                <NuxtLink to="/dashboard/transactions" @click="open = false" :class="[$route.path == '/dashboard/transactions' || $route.path == '/dashboard/transactions/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                                                    <img src="/images/wallet.svg" alt="">
                                                    <div class="flex-1">Transactions</div>
                                                    <img src="/images/chevron-right.svg" alt="">
                                                </NuxtLink>
                                                <NuxtLink to="/dashboard/support" @click="open = false" :class="[$route.path == '/dashboard/support' || $route.path == '/dashboard/support/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                                                    <img src="/images/envelope.svg" alt="">
                                                    <div class="flex-1">Support</div>
                                                    <img src="/images/chevron-right.svg" alt="">
                                                </NuxtLink>
                                                <NuxtLink to="/dashboard/profile" @click="open = false" :class="[$route.path == '/dashboard/profile' || $route.path == '/dashboard/profile/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                                                    <img src="/images/profile.svg" alt="">
                                                    <div class="flex-1">Profile</div>
                                                    <img src="/images/chevron-right.svg" alt="">
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="px-4 sm:px-6">
                                        <hr class="border-[#63493E47]">
                                        <div class="mt-[25px] flex gap-[13px]">
                                            <div class="h-[36px] w-[36px] rounded-full bg-zinc-400"></div>
                                            <div class="text-white">
                                                <div class="font-semibold text-[16px]">Divine Ndumdi-ibe</div>
                                                <div class="text-[10px]">divinendumdiibe@gmail.com</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                        </div>
                    </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </div>
        <div class="min-h-screen lg:flex">
            <div class="hidden lg:block fixed h-full w-[253px]">
                <div class="flex flex-col bg-[#010206] min-h-full py-[19px] px-[13px]">
                    <div class="flex pb-[11px]">
                        <div class="flex-1">
                            <img src="/images/logo-white.svg" alt="">
                        </div>
                        <div class="cursor-pointer">
                            <img src="/images/streamline-flex-nav.svg" alt="">
                        </div>
                    </div>
        
                    <hr class="border-[#63493E47]">
        
                    <div class="mt-8 flex-1">
                        <NuxtLink to="/dashboard" :class="[$route.path == '/dashboard' || $route.path == '/dashboard/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                            <img src="/images/home.svg" alt="">
                            <div class="flex-1">Dashboard</div>
                            <img src="/images/chevron-right.svg" alt="">
                        </NuxtLink>
                        <NuxtLink to="/dashboard/contributions" :class="[$route.path == '/dashboard/contributions' || $route.path == '/dashboard/contributions/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                            <img src="/images/shop.svg" alt="">
                            <div class="flex-1">Contributions</div>
                            <img src="/images/chevron-right.svg" alt="">
                        </NuxtLink>
                        <NuxtLink to="/dashboard/transactions" :class="[$route.path == '/dashboard/transactions' || $route.path == '/dashboard/transactions/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                            <img src="/images/wallet.svg" alt="">
                            <div class="flex-1">Transactions</div>
                            <img src="/images/chevron-right.svg" alt="">
                        </NuxtLink>
                        <NuxtLink to="/dashboard/support" :class="[$route.path == '/dashboard/support' || $route.path == '/dashboard/support/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                            <img src="/images/envelope.svg" alt="">
                            <div class="flex-1">Support</div>
                            <img src="/images/chevron-right.svg" alt="">
                        </NuxtLink>
                        <NuxtLink to="/dashboard/profile" :class="[$route.path == '/dashboard/profile' || $route.path == '/dashboard/profile/' ? 'active-dashbord-link' : '', 'flex gap-[13px] px-[13px] py-[15px] text-white items-center rounded-[8px] cursor-pointer']">
                            <img src="/images/profile.svg" alt="">
                            <div class="flex-1">Profile</div>
                            <img src="/images/chevron-right.svg" alt="">
                        </NuxtLink>
                    </div>
        
                    <div>
                        <hr class="border-[#63493E47]">
                        <div class="mt-[25px] flex gap-[13px]">
                            <div class="h-[36px] w-[36px] rounded-full bg-zinc-400"></div>
                            <div class="text-white">
                                <div class="font-semibold text-[16px]">Divine Ndumdi-ibe</div>
                                <div class="text-[10px]">divinendumdiibe@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- </div> -->
    
            <div class="flex-1 px-5 py-5 lg:px-[34px] lg:py-[24px] bg-[#f6f6f6] lg:ml-[253px]">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)
</script>

<style scoped>
.active-dashbord-link {
    background: linear-gradient(270deg, rgba(19, 83, 34, 0.41) 16.07%, rgba(17, 78, 30, 0.87) 91.53%);

}
</style>