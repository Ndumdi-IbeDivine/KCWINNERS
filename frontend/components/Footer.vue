<template>
    <div class="bg-[#263238] pt-[64px] pb-[75px] px-[165px]">
        <div>
            <div class="grid grid-cols-3 text-white">
                <div class="grid h-fit gap-[40px]">
                    <img src="/images/logo-white.svg" alt="">
                    <div class="text-[#F5F7FA]">Copyright © {{ new Date().getFullYear() }} KCWINNERS Ltd. <br>All rights reserved.</div>
                    <div>social icons</div>
                </div>
                <div class="grid h-fit text-white">
                    <div class="text-white font-semibold mb-[24px] text-[20px]">Company</div>
                    <div class="grid gap-[12px]">
                        <NuxtLink to="/">Home</NuxtLink>
                        <NuxtLink to="/about">About us</NuxtLink>
                        <NuxtLink to="/faq">FAQ</NuxtLink>
                        <NuxtLink to="/contact">Contact us</NuxtLink>
                    </div>
                </div>
                <div class="grid h-fit text-white">
                    <div class="text-white font-semibold mb-[24px] text-[20px]">Support</div>
                    <div class="grid gap-[12px]">
                        <div>Help center</div>
                        <div>Terms of service</div>
                        <div>Legal</div>
                        <div>Privacy policy</div>
                        <div>Status</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>