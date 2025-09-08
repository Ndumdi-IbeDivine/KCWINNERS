<template>
    <div data-aos="fade" class="grid gap-[84px]">
        <div class="relative grid lg:grid-cols-2 lg:h-[87vh] lg:pl-[50px] xl:pl-[144px]">
            <div class="flex flex-col justify-center relative px-5 z-10 md:w-[80%]">
                <h1 class="hero-text text-[42px] md:text-[64px] font-medium lg:leading-[76px] tracking-normal">"Contribute Today, <span class="hero-text text-[var(--kc-green)]">Smile Tomorrow.</span>"</h1>
                <p class="mt-[16px]">Every weekly contribution brings you closer to more rewards — extra cash in your hand and foodstuffs for your home.</p>
                <div class="grid md:flex gap-5 mt-[32px]">
                    <NuxtLink to="/create-account">
                        <PrimaryBtn class="w-full md:w-fit">Join the Contribution </PrimaryBtn>
                    </NuxtLink>
                    <a href="#how-contribution-works">
                        <button class="border-2 border-[var(--kc-green)] ease-in transition hover:bg-green-100 text-[var(--kc-green)] rounded-[6px] px-[32px] py-3 w-full md:w-fit">
                            Learn how it works
                        </button>
                    </a>
                </div>
            </div>

            <div class="hidden lg:flex justify-end my-10">
                <img src="/images/hero.jpg" class="rounded-l-2xl" alt="">
            </div>
        </div>
        
        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"
            class="px-5 lg:px-[50px] xl:px-[144px] grid lg:grid-cols-2 items-center gap-[72px]"
        >
            <div>
                <img src="/images/image-3.jpg" class="w-full rounded-lg" alt="">
            </div>
            <div>
                <div class="semi-heading leading-[44.8px]">Mission</div>
                <div class="font-bold">Empowering Families, Building Communities</div>
                <p class="mt-[16px]">KCWINNERS is committed to providing Nigerians, both home and abroad, a trusted way to support their loved ones and achieve their financial goals. Our mission is to provide a trusted system where people can grow their money through steady weekly contributions, while enjoying meaningful rewards. <br> We believe in <b>community strength, shared growth, and family happiness.</b></p>
            </div>
        </div>

        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="grid lg:grid-cols-2 px-5 gap-10 lg:gap-[95px] lg:px-[50px] xl:px-[144px] items-center"
        >
            <div>
                <div class="semi-heading">What You Gain in the Weekly Contribution</div>
                <p class="mt-[16px] leading-[20px] tracking-normal">When you join KCwinners weekly Contribution:</p>
                <ul class="mt-5">
                    <li>You contribute a set amount every week for 7 months.</li>
                    <li>At the end of the cycle, you get back your full contribution <b>plus extra cash</b>.</li>
                    <li>If you refer others, you also receive <b>20% worth of foodstuffs</b> for your household.</li>
                    <li>You can even open multiple contribution accounts for bigger payouts.</li>
                </ul> 
                <p>It’s simple, reliable, and designed for <b>families, students, hustlers, and everyone working towards a goal</b>.</p>
            </div>
            <div>
                <img src="/images/image-1.jpg" class="rounded-lg" alt="">
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[50px] xl:px-[144px]"
            id="how-contribution-works"
        >
            <div class="text-center">
                <div class="font-semibold text-[36px]">HOW CONTRIBUTING WORKS (3 SIMPLE STEPS)</div>
            </div>

            <div class="grid md:grid-cols-3 gap-10 2xl:gap-[126px] mt-[16px]">
                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-one-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Register Your Account</div>
                    <div class="text-[14px]">Sign up and click on the activate button, after making sure you're clear on the terms of contributing with us, fill the required form fields, upload a payment receipt of the registration fee, and get verified. Once verified, your primary contribution account is activated.</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-two-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Contribute Weekly</div>
                    <div class="text-[14px]"> Every Thursday, you make your contribution. Missed a week? Clear it before continuing. Staying consistent guarantees your reward.</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-three-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Cash Out and Enjoy</div>
                    <div class="text-[14px]">At the end of 7 months, receive your full contribution plus  <b>66.7% profit</b>.  Creating more accounts and referring others allows you a bigger payout and <b>20% worth of foodstuff.</b></div>
                </div>

            </div>
            <div class="mt-5 flex justify-center">
                <NuxtLink to="/create-account">
                    <button class="bg-[var(--kc-green)] ease-in transition hover:bg-[var(--kc-green-dark)] text-white rounded-[6px] px-[20px] py-[10px]">Sign up for free</button>
                </NuxtLink>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[50px] xl:px-[144px] grid lg:grid-cols-2 2xl:grid 2xl:grid-cols-2 gap-10 lg:gap-[153px] items-center"
        >
            <div class="lg:w-[436px] 2xl:w-full">
                <div class="semi-heading leading-[44.8px]">Weekly Contribution</div>
                <p class="mt-[16px]">Our <b>KCWINNERS Contribution Initiative</b> gives everyday people the chance to grow their money with ease. By contributing a fixed weekly amount for <b>7 months</b>, you get back your full contributions plus a <b>66.7% return</b>. On top of that, if you refer others, you also receive an additional <b>20% worth of foodstuffs</b>. It’s more than a contribution cycle — it’s a way to save, earn, and support your home.</p>
            </div>
            <div>
                <img src="/images/image-2.jpg" class="rounded-lg  w-full" alt="">
            </div>
        </div>


        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="bg-[#EEAD08] py-[84px]"
        >
            <div class="px-5 lg:px-[50px] xl:px-[144px] grid lg:grid-cols-2">
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
            class="px-5 lg:px-[50px] xl:px-[144px]"
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

<script setup lang="ts">
definePageMeta({
    layout: 'website-layout'
});
</script>

<style scoped>
.hero-text {
    font-family: 'glitz';
}

.box-card {
    box-shadow: 0px 2px 4px 0px #ABBED133;
    padding: 24px 16px;
}
</style>