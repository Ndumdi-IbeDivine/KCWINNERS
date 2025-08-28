<template>
    <div>
        <div
            data-aos="fade-up" 
            data-aos-anchor-placement="top-bottom"  
            class="h-[449px]" style="background-image:linear-gradient(#000000A1, #000000A1), url('/images/image.jpg'); background-size: cover; background-position: center;"
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
    question: "What is KC Winners?",
    answer: "KC Winners is an organisation and a platform that simplifies study abroad applications, IELTS training, IELTS test registration, and visa application processes for students and professionals aiming to study in the UK, Canada, USA, Australia, New Zealand, and other countries."
  },
  {
    question: "What services does KC Winners? offer?",
    answer: "Study Abroad Application Assistance, IELTS Training (Self-paced and Instructor-led), IELTS Test Registration Guidance/Assistance, Visa Application Services (UK and Canada)"
  },
  {
    question: "Who can use the KC Winners? platform?",
    answer: "Students, professionals, and parents seeking reliable guidance and support for studying abroad or taking the IELTS test can use the EduBureau platform."
  },
]
</script>

<style scoped>
.faq-item {
    padding: 20px 30px;
}
</style>