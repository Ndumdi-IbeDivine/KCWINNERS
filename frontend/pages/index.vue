<script setup lang="ts">
import PrimaryBtn from '~/components/PrimaryBtn.vue';

</script>

<template>
    <div data-aos="fade" class="grid gap-[84px]">
        <div class="grid grid-cols-2 gap-40 bg-[#114E1E] h-[87vh] px-5 lg:px-[144px]">
            <div class="flex flex-col justify-center text-white">
                <h1 class="hero-text text-[32px] lg:text-[64px] font-medium lg:leading-[76px] tracking-normal">Lorem ipsum text that captivates</h1>
                <p class="mt-[16px]">Where to grow your business as a photographer: site or social media?</p>
                <div class="mt-[32px]">
                    <PrimaryBtn>Register</PrimaryBtn>
                </div>
            </div>
        </div>

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="grid lg:grid-cols-2 px-5 lg:px-[144px]"
        >
            <div></div>
            <div>
                <div class="font-bold text-[36px]">The unseen of spending three years at Pixelgrade</div>
                <p class="mt-[16px] leading-[20px] tracking-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.</p>
                <div class="mt-[32px]">
                    <PrimaryBtn>Learn More</PrimaryBtn>
                </div>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[144px]"
        >
            <div class="text-center">
                <div class="font-semibold text-[36px]">Manage your entire</div>
                <div class="text-[#717171] mt-[8px]">Who is Nextcent suitable for?</div>
            </div>

            <div class="grid md:grid-cols-3 gap-10 lg:gap-[126px] mt-[16px]">
                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-one-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Membership Organisations</div>
                    <div class="text-[14px]">Our membership management software provides full automation of membership renewals and payments</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-two-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Membership Organisations</div>
                    <div class="text-[14px]">Our membership management software provides full automation of membership renewals and payments</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-three-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Membership Organisations</div>
                    <div class="text-[14px]">Our membership management software provides full automation of membership renewals and payments</div>
                </div>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[144px] grid lg:grid-cols-2"
        >
            <div class="lg:w-[436px]">
                <div class="font-bold text-[28px] leading-[44.8px]">How to design your site footer like we did</div>
                <p class="mt-[16px]">Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.</p>
            </div>
            <div></div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"
            class="px-5 lg:px-[144px] grid lg:grid-cols-2 items-center gap-[72px]"
        >
            <div>
                <img src="/images/home-illu.svg" alt="">
            </div>
            <div>
                <div class="font-bold text-[28px] leading-[44.8px]">How to design your site footer like we did</div>
                <p class="mt-[16px]">Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.</p>
            </div>
        </div>

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="bg-[#EEAD08] py-[84px]"
        >
            <div class="px-5 lg:px-[144px] grid lg:grid-cols-2">
                <div class="lg:w-[408px]">
                    <div class="font-bold text-[36px] leading-[44.8px]">Helping a local <span class="text-[var(--kc-green)]">business reinvent itself</span></div>
                    <p class="mt-[16px] text-[#18191F]">We reached here with our hard work and dedication.</p>
                </div>
                <div class="grid grid-cols-2 gap-y-[40px] gap-x-[30px]">
                    <div v-for="i in 4" class="w-fit">
                        <div class="text-[#181920] font-bold text-[28px]">
                            <MetricCounter :target="i * 250" :duration="2000" />
                        </div>
                        <div class="text-[#717171]">Members</div>
                    </div>
                </div>
            </div>
        </div>

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[144px]"
        >
            <Testimonials />
        </div>

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"
        >
            <JoinCommunityChat />
        </div>
    </div>
</template>

<style scoped>
.hero-text {
    font-family: 'glitz';
}

.box-card {
    box-shadow: 0px 2px 4px 0px #ABBED133;
    padding: 24px 16px;
}
</style>