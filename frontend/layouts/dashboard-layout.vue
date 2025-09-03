<template>
    <div class="min-h-screen flex">
        <div class="fixed h-full w-[253px]">
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
        <div class="flex-1 px-[34px] py-[24px] bg-[#f6f6f6] ml-[253px]">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.active-dashbord-link {
    background: linear-gradient(270deg, rgba(19, 83, 34, 0.41) 16.07%, rgba(17, 78, 30, 0.87) 91.53%);

}
</style>