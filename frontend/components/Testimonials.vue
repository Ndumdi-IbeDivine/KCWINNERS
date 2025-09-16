<template>
    <div>
        <div class="text-center">
            <div class="font-semibold text-[36px]">Testimonials</div>
            <div class="text-[#717171] mt-[8px]">What are our clients saying?</div>
        </div>

        <div class="grid lg:grid-cols-3 gap-[47px] mt-[35px]">
            <div v-for="t in testimonials" class="bg-[#F8F8F8] p-[32px] rounded-lg">
                <div>
                    <img src="/images/user-placeholder.png" class="rounded-full h-16 w-16" alt="">
                </div>
                <div class="text-20px font-bold mt-[28px]">{{t.name}}</div>
                <div class="text-[16px] mt-[11px] leading-[24px]">
                    {{ t.message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    testimonials: {
        name: string;
        message: string;
    }[]
}>()
</script>