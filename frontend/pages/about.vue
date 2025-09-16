<template>
    <div class="md:mt-[60px]">
        <div class="px-5 lg:px-[144px]">
            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
            >
                <div class="text-center">
                    <div class="font-semibold text-[48px] tracking-[-3px]">About Us</div>
                </div>
                <div class="grid lg:grid-cols-2 lg:h-[500px] w-full bg-slate-500 mt-[42px]">
                    <img src="/images/image-3.jpg" class="lg:h-[500px] w-full" alt="">
                    <img src="/images/image-6.jpg" class="hidden lg:block lg:h-[500px] w-full" alt="">
                </div>
            </div>

            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="mt-[48px]"
            >
                <p class="mt-[20px]"><b>KCwinners</b> is a global industry and distribution company that provides real solutions for families, communities, and businesses. Over the years, we have established ourselves in real estate, property sales, and building materials distribution, becoming a trusted name for both individuals and organizations. <br>
                Our work is rooted in excellence, integrity, and community impact — values that guide everything we do.</p>

                <div class="semi-heading mt-10">What we do</div>
                <p class="mt-5">At KCwinners our services delivery is redefined with the aim of a seamless path to guaranteed investment while attending to other family needs. Our property arm is ever ready to simplify the problem of property sourcing, sales and management. There is also opportunity to help clients in need of financial assistance to own property of their choice, whether it is land, homes or real estate projects to secure investment for future benefit.</p>
                <ul class="mt-5">
                    <li><b>Real Estate & Property Sales:</b> KCwinners provides reliable access to properties — from affordable housing to investment opportunities. Whether it’s land, homes, or estate projects, we connect people with secure investments for the future.</li>
                    <li><b>Building Materials Distribution:</b>   We supply high-quality blocks, bricks, and interlocking stones used in constructing homes, estates, and even roads. Our distribution arm ensures durability and affordability of materials and goods meet with international approved standards.</li>
                    <li><b>Wealth Contribution Initiative:</b> As part of our community-focused drive, KCwinners also runs a weekly contribution program that allows members to contribute consistently for a set period and enjoy rewards in both cash and food items. This initiative has already gained the trust of over 100 families, making it a practical way for many to meet their financial goals.</li>
                </ul>
            </div>

             <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="mt-[80px] px-5 grid lg:grid-cols-2 items-center gap-[72px]"
            >
                <div class="hidden lg:block">
                    <img src="/images/image-3.jpg" class="w-full rounded-lg" alt="">
                </div>
                <div>
                    <div class="semi-heading leading-[44.8px]">Mission</div>
                    <div class="font-bold">Rendering Services that transform lives and create wealth.</div>
                    <p class="mt-[16px]">KCwinners exists to provide opportunities that make life better for families and communities. From real estate and property sales to material distribution and financial initiatives, we are committed to ensuring that consistency and commitment are always rewarded.</p>
                </div>
            </div>

            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom" 
                class="grid lg:grid-cols-2 mt-[80px] items-center gap-[80px]"
            >
                <div>
                    <!-- <div class="font-semibold text-[32px]">Activity program</div> -->
                    <div></div>
                    <p class="mt-[20px]">
                        At KCwinners, we are expanding beyond business into <b>community impact</b>. We are opening our doors for partnerships with individuals and organizations to:
                    </p>
                    <div class="mt-5 grid gap-3 h-fit">
                        <ul>
                            <li>Support building projects.</li>
                            <li>Carry out outreach programs that distribute food and materials to families and communities in need.</li>
                        </ul>
                    </div>
                </div>
                <div class="w-full bg-slate-500 rounded">
                    <img src="/images/image-7.jpg" class="rounded" alt="">
                </div>
            </div>

            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="mt-[80px]"
            >
                <Testimonials :testimonials="testimonials" />
            </div>
        </div>

        <div>
            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="mt-[80px]"
            >
                <JoinCommunityChat />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'website-layout'
});

const testimonials = [
    {
        name: 'Blessing I.',
        message: ' “Consistency pays.” I missed some contributions at first but cleared my defaults and stayed committed. Today, I received ₦100,000 plus foodstuff. I’m telling everyone, if you stay faithful, you will surely collect. God bless KC Winners!”'
    },
    {
        name: 'Tolu A.',
        message: '“Family project.” I opened 2 accounts for myself and 1 each for my brother and cousin. Today, all four accounts matured and I have collected ₦400,000! We even used part of it to buy new furniture for our parents. KC Winners is a blessing.”'
    },
    {
        name: 'Emeka N.',
        message: '“From doubt to joy.” Honestly, I was skeptical at first, but after my first ₦100k alert dropped, I quickly opened another account. KC Winners is legit – they really pay. I’m already on my second cycle.”'
    },
]
</script>