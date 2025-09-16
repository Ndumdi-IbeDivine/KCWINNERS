<template>
    <div>
        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"  
            class="h-[250px] lg:h-[449px]" style="background-image:linear-gradient(#000000A1, #000000A1), url('/images/image-4.jpg'); background-size: cover; background-position: center;"
        >
            <!-- <img src="/images/image.jpg" alt=""> -->
             <div class="flex justify-center items-center h-full text-white font-semibold text-[48px] text-center px-4">Frequently Asked Questions</div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"  
            class="px-5 lg:px-[227px] text-center mt-[95px]"
        >
            <div class="">
                <div class="grid gap-[24px] h-auto">
                    <div v-for="(faq, index) in faqs" :key="index" @click="toggleFaq(index)" class="bg-[#E9E9E9] h-auto faq-item border-b border-[#F0F0F0] cursor-pointer rounded">
                        <h6>
                            <button type="button" class="flex h-auto items-center justify-between w-full">
                                <span class="text-start">{{ faq.question }}</span>
                                <span class="flex justify-center items-center h-[20px] w-[20px]">
                                    <img v-if="activeFaq != index" src="/images/cheveron-down.svg" alt="">
                                    <img v-else class="rotate-[180deg]" src="/images/cheveron-down.svg" alt="">
                                </span>
                            </button>
                        </h6>
                        <div class="h-auto">
                            <div class="h-auto">
                                <div
                                    v-if="activeFaq === index"
                                    class="lg:py-5 py-1 text-[--partner-institution-grey] h-auto"
                                >
                                    <p class="text-start text-[#737373]" v-html="faq.answer"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"  
            class="mt-[50px] lg:mt-[188px]"
        >
            <JoinCommunityChat />
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'website-layout'
});

const activeFaq = ref<null | number>(null);

const toggleFaq = (index: number) => {
    activeFaq.value = activeFaq.value === index ? null : index;
};


const faqs = [
  {
    question: "What is KCwinners?",
    answer: "KCwinners is a global industry and distribution company in Nigeria. We work in real estate, property sales, building materials distribution, and also run a weekly contribution initiative that allows members to grow their money with guaranteed returns and food rewards."
  },
  {
    question: "How does the weekly contribution initiative work?",
    answer: "Members contribute a fixed amount of 2000 naira every week for 7 months. At the end of the cycle, you receive your total contributions back plus 66.7% profit. If you refer others, you also earn 20% worth of foodstuffs."
  },
  {
    question: "Who can join the contribution plan?",
    answer: "Anyone above 18 years old with a valid means of identification and bank account can register. Both individuals and groups are welcome to participate."
  },
  {
    question: "How do I register for the contribution plan?",
    answer: "You can register through our platform by filling in your details and paying a registration fee. Once your account is verified, you can start making weekly contributions."
  },
  {
    question: "Is KCWINNERS’ contribution safe?",
    answer: "Yes. KCwinners is a registered company with a strong reputation in real estate and distribution, and we ensure that all contributions are properly recorded and managed."
  },
  {
    question: "What happens if I miss a weekly payment?",
    answer: "Members are expected to stay consistent. If you miss a payment, you will need to clear all missed weeks at the end of the savings period before you can withdraw savings."
  },
  {
    question: "What kind of building materials does KCwinners supply?",
    answer: "We provide blocks, bricks, interlocking stones, and other materials used in constructing houses, estates, and roads."
  },
  {
    question: "Does KCwinners sell properties too?",
    answer: "Yes, we are involved in real estate sales and property development. Whether you’re looking for land, houses, or investment opportunities, KCwinners can connect you to the right option."
  },
  {
    question: "Can organizations partner with KCwinners?",
    answer: "Absolutely. We partner with organizations and individuals for outreach programs, food distribution, and building projects."
  },
  {
    question: "How do I contact KCwinners?",
    answer: "You can reach us through our official website, email, phone lines, or by visiting our office. We also respond quickly on our social media platforms."
  },
  {
    question: "Why does it count as one even if I refer many people on the same account?",
    answer: "Our referral system works like a chain. Each account can only start one chain, so no matter how many people you refer under that account, it still counts as one referral reward. If you want to earn more referral rewards, simply open another account and start a new chain."
  }
]
</script>

<style scoped>
.faq-item {
    padding: 20px 30px;
}
</style>