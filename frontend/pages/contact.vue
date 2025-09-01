<template>
    <div>
            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
            >
                <div class="text-center px-5">
                    <div class="font-semibold text-[48px] tracking-[-3px]">Contact Us</div>
                </div>
            </div>

            <div 
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="px-5 lg:px-[244px] mt-[40px] grid gap-[30px]"
            >
                <div>
                    <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                    <input type="text" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: Micheal Chisom" required />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: michaelchisom@gmail.com" required />
                </div>
                <div>
                    <label for="tel" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input type="tel" id="tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: 08012345678" required />
                </div>
                <div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Message</label>
                    <textarea rows="10" type="text" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
                </div>

                <div>
                    <PrimaryBtn>Send Message</PrimaryBtn>
                </div>
            </div>

            <div 
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="px-5 lg:px-[244px] grid lg:grid-cols-2 gap-[96px] my-[40px] md:my-[104px]"
            >
                <div></div>
                <div>
                    <div class="font-semibold text-[32px]">Contact Us</div>
                    <div class="grid lg:grid-cols-2 mt-[37px] gap-[54px]">
                        <div>
                            <div class="font-semibold text-[20px]">Visit Us</div>
                            <div class="my-[16px] text-[18px]">
                                Suite 2 AP Filling Station, Oke-Afa, Isolo, Lagos, Nigeria. 100263
                            </div>
                        </div>
                        <div>
                            <div class="font-semibold text-[20px]">Contact</div>
                            <div class="my-[16px] text-[18px]">
                                <div>
                                    <a href="mailto:kcwinners3@gmail.com" class="hover:underline">kcwinners3@gmail.com</a>
                                </div>
                                <div>
                                    <a href="tel:+2349136757875" class="hover:underline">09136757875</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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