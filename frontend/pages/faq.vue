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
            <!-- <div> -->
                
            <!-- </div> -->
        </div>
        <!-- <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"  
            class="px-[144px] text-center mt-[95px]"
        >
            <div>
                <div class="font-semibold text-[32px]">We Know You Have Got Questions</div>
                <div class="mt-[4px] text-[16px] text-[#717171]">Where to grow your business as a photographer: site or social media?</div>
            </div>

            <div class="mt-[24px]">
                <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span>What is Flowbite?</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-2">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                    <span>Is there a Figma file available?</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
                    <p class="text-gray-500 dark:text-gray-400">Check out the <a href="https://flowbite.com/figma/" class="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classes from Tailwind CSS and components from Flowbite.</p>
                    </div>
                </div>
                <h2 id="accordion-collapse-heading-3">
                    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                    <span>What are the differences between Flowbite and Tailwind UI?</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
                    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                    <p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                    <ul class="ps-5 text-gray-500 list-disc dark:text-gray-400">
                        <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                        <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div> -->

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
    console.log(index)
    activeFaq.value = activeFaq.value === index ? null : index;
    console.log(activeFaq.value)
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
  }
]
</script>

<style scoped>
.faq-item {
    padding: 20px 30px;
}
</style>