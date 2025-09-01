<template>
    <div class="bg-[#263238] pt-[64px] pb-[75px] px-5 lg:px-[144px]">
        <div>
            <div class="grid lg:grid-cols-3 text-white gap-10 lg:gap-0">
                <div class="grid h-fit gap-[40px]">
                    <img src="/images/logo-white.svg" alt="">
                    <div class="text-[#F5F7FA]">Copyright © {{ new Date().getFullYear() }} KCWINNERS Ltd. <br>All rights reserved.</div>
                    <div class="flex gap-[16px]">
                        <a href="https://www.facebook.com/share/1B6ZxSuh7d/" target="_blank">
                            <div class="h-[32px] w-[32px] rounded-full flex items-center justify-center bg-[#3b464c]">
                                <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        </a>
                        <a href="https://vm.tiktok.com/ZSHtR7ev57UJy-gN2IQ/" target="_blank">
                            <div class="h-[32px] w-[32px] rounded-full flex items-center justify-center bg-[#3b464c]">
                                <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        </a>

                        <a href="https://chat.whatsapp.com/LF6TB3IHLBp8aStTpTKvae?mode=ac_t" target="_blank">
                            <div class="h-[32px] w-[32px] rounded-full flex items-center justify-center bg-[#3b464c]">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M22 12C22 17.5228 17.5228 22 12 22C10.1786 22 8.47087 21.513 7 20.6622L2 21.5L2.83209 16C2.29689 14.7751 2 13.4222 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.9604 13.8683L15.0399 13.4624L17 14.2149V16.0385C17 16.6449 16.4783 17.1073 15.8901 16.9783C14.3671 16.6444 11.5997 15.8043 9.67826 13.8683C7.84859 12.0248 7.22267 9.45734 7.01039 8.04128C6.92535 7.47406 7.3737 7 7.94306 7H9.83707L10.572 8.96888L10.1832 11.0701" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                        </a>
                    </div>
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