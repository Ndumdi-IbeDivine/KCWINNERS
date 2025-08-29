<template>
    <div data-aos="fade" class="grid gap-[84px]">
        <div class="relative grid lg:grid-cols-2 2xl:gap-40 bg-[#114E1E] h-[87vh] px-5 lg:px-[50px] xl:px-[144px]">
  <!-- Background image + overlay (only on sm/md) -->
            <div 
                class="absolute inset-0 lg:hidden bg-cover md:bg-contain bg-no-repeat bg-[40vw] md:bg-[70vw]"
                style="background-image: url('/images/hero.png')"
            >
                <!-- dark overlay -->
                <div class="absolute inset-0 bg-black/50"></div>
            </div>

            <div class="flex flex-col justify-center text-white relative z-10 md:w-[70%] lg:w-full">
                <h1 class="hero-text text-[42px] md:text-[64px] font-medium lg:leading-[76px] tracking-normal">Your Path to Smarter Wealth</h1>
                <p class="mt-[16px]">“Grow your money stress-free with KC Winners — safe savings, 20% returns, and real rewards.”</p>
                <div class="mt-[32px]">
                    <PrimaryBtn class="border-1 border-[var(--kc-green-dark)]">Register</PrimaryBtn>
                </div>
            </div>

            <div class="hidden lg:flex justify-end">
                <img src="/images/hero.png" class="h-full object-cover" alt="">
            </div>
        </div>


        <div 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="grid md:grid-cols-2 px-5 gap-10 lg:gap-[95px] lg:px-[50px] xl:px-[144px] items-center"
        >
            <div>
                <img src="/images/image-1.jpg" class="rounded-lg" alt="">
            </div>
            <div>
                <div class="font-bold text-[36px]">Your Path to Smarter Wealth</div>
                <p class="mt-[16px] leading-[20px] tracking-normal">KC Winners is running a <b>Wealth Solution Initiative</b> that gives everyday people a simple way to grow their money. By contributing a fixed amount weekly, you don’t just keep your money safe — you multiply it. At the end of your cycle, you get your full savings back with a <b>20% bonus</b>, and you can even enjoy food packages and extra rewards when you bring others on board.</p>
                <div class="mt-[32px]">
                    <PrimaryBtn>Learn More</PrimaryBtn>
                </div>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[50px] xl:px-[144px]"
        >
            <div class="text-center">
                <div class="font-semibold text-[36px]">KC Winners in 3 Steps</div>
            </div>

            <div class="grid md:grid-cols-3 gap-10 2xl:gap-[126px] mt-[16px]">
                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-one-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Join the Winners Family</div>
                    <div class="text-[14px]">Register with KC Winners and choose your weekly contribution plan. Once you’re in, you’re part of a growing community of Nigerians securing their future.</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-two-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Keep Up with Your Contributions</div>
                    <div class="text-[14px]">Every week, you make your set payment. It’s simple, straightforward, and keeps you on track to cash out big in the end.</div>
                </div>

                <div class="box-card text-center">
                    <div class="mb-[16px] flex justify-center">
                        <img src="/images/card-three-icon.svg" alt="">
                    </div>
                    <div class="font-bold text-[28px] leading-[26px] mb-[8px]">Cash Out and Celebrate</div>
                    <div class="text-[14px]">At the end of your cycle, KC Winners pays you back all your contributions plus a 20% bonus, and adds food items to support your home. If you’ve referred friends or family, you enjoy even more rewards. That’s the KC Winners way — everybody wins.</div>
                </div>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom" 
            class="px-5 lg:px-[50px] xl:px-[144px] grid lg:flex 2xl:grid 2xl:grid-cols-2 gap-10 lg:gap-[153px] items-center"
        >
            <div class="lg:w-[436px] 2xl:w-full">
                <div class="font-bold text-[28px] leading-[44.8px]">Save with Confidence, Enjoy with Ease</div>
                <p class="mt-[16px]">With KC Winners, there’s no plenty talk — your money is safe, your returns are sure, and the benefits are real. We’ve built a system that works for families, workers, and hustlers who want their money to grow without stress. Every contribution moves you closer to cash-out time, when you get back more than you put in, plus extra goodies to support your home. That’s how KC Winners makes wealth simple.</p>
            </div>
            <div class="lg:flex-1">
                <img src="/images/image-2.jpg" class="rounded-lg lg:h-[500px] w-full" alt="">
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"
            class="px-5 lg:px-[50px] xl:px-[144px] grid lg:grid-cols-2 items-center gap-[72px]"
        >
            <div class="hidden lg:block">
                <img src="/images/home-illu.svg" class="w-full" alt="">
            </div>
            <div>
                <div class="font-bold text-[28px] leading-[44.8px]">Our Mission</div>
                <p class="mt-[16px]">To Make Wealth Possible for Everyone <br>At KC Winners, our mission is to help Nigerians grow their money in a safe, reliable, and rewarding way. We know the hustle is real, so we created a platform that turns your weekly contributions into something bigger — with cash bonuses, food support, and referral rewards that give you even more value.</p>

                <p class="mt-[16px]">We are not just running a savings cycle; we are building a community where people win together, support one another, and see real results. For us, it’s not just about money — it’s about lifting homes, empowering dreams, and making life a little easier for everyone who joins KC Winners.</p>
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