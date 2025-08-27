<template>
    <div>
            <div
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
            >
                <div class="text-center px-5">
                    <div class="font-semibold text-[48px] tracking-[-3px]">Contact Us</div>
                    <div class="mt-[4px] text-[16px] text-[#717171]">Where to grow your business as a photographer: site or social media?</div>
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
                                2972 Westheimer Rd. Santa Ana, Illinois 85486
                            </div>
                        </div>
                        <div>
                            <div class="font-semibold text-[20px]">Contact</div>
                            <div class="my-[16px] text-[18px]">
                                <p>contact@gmail.com</p>
                                <p>1234567890</p>
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