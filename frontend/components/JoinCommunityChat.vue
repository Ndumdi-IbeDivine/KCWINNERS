<template>
    <div class="px-5 lg:px-[144px] bg-[#F5F7FA]">
        <div class="py-[32px]">
            <div class="text-center font-bold text-[40px] mx-auto lg:w-[640px]">
                Pellentesque suscipit fringilla libero eu.
            </div>
            <div class="flex flex-col md:flex-row gap-5 lg:gap-[25px] justify-center mt-[25px]">
                <button class="justify-center btn-with-arrow bg-black text-white rounded-[6px] px-[32px] py-[14px] flex gap-[8px]">
                    <span>Join Our WhatsApp Community</span>
                    <img class="arrow" src="/images/right-arrow.svg" alt="">
                </button>

                <NuxtLink to="/create-account" class="w-full md:w-fit">
                    <button class="w-full md:w-fit justify-center btn-with-arrow bg-[var(--kc-green)] text-white rounded-[6px] px-[32px] py-[14px] flex gap-[8px]">
                        <span>Get Satarted</span>
                        <img class="arrow" src="/images/right-arrow.svg" alt="">
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-with-arrow .arrow {
    transition: transform 0.3s ease-in-out;
}

.btn-with-arrow:hover {
    .arrow {
        transform: rotate(-35deg);
        transition: transform 0.3s ease-in-out;
    }
}
</style>