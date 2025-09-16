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
                    <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900">Full Name*</label>
                    <input v-model="name" type="text" id="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: Micheal Chisom" required />
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email*</label>
                    <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: michaelchisom@gmail.com" required />
                </div>
                
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">Subject*</label>
                    <input v-model="subject" type="text" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Subject" required />
                </div>
                <div>
                    <label for="tel" class="block mb-2 text-sm font-medium text-gray-900">Phone Number*</label>
                    <input v-model="phone" type="tel" id="tel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="eg: 08012345678" required />
                </div>
                <div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Message*</label>
                    <textarea v-model="message" rows="10" type="text" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
                </div>

                <div v-if="feedback">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div>
                    <PrimaryBtnAsync @click="sendMessage" :is-disabled="loading">
                        {{ loading ? 'Sending Message...' : 'Send Message' }}
                    </PrimaryBtnAsync>
                </div>
            </div>

            <div 
                data-aos="fade-up" 
                data-aos-anchor-placement="top-bottom"
                class="px-5 lg:px-[244px] grid lg:grid-cols-2 gap-[96px] my-[40px] md:my-[104px] items-center"
            >
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3963.9311683072747!2d3.3102539749929987!3d6.530377793462305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMzEnNDkuNCJOIDPCsDE4JzQ2LjIiRQ!5e0!3m2!1sen!2sng!4v1757269620528!5m2!1sen!2sng" width="100%" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div>
                    <div class="font-semibold text-[32px]">Contact Us</div>
                    <div class="grid lg:grid-cols-2 mt-[37px] gap-[54px]">
                        <div>
                            <div class="font-semibold text-[20px]">Visit Us</div>
                            <div class="my-[16px] text-[18px]">
                                Suite 1, AP Filling Station Complex, Oke-Afa, Isolo, Lagos
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

const api = useApi()

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const subject = ref('')

const loading = ref(false)
const isError = ref(false)
const feedback = ref('')

async function sendMessage() {
    try {
        loading.value = true
        isError.value = false
        feedback.value = ""

        if (
            !name.value?.trim() ||
            !email.value?.trim() ||
            !phone.value?.trim() ||
            !message.value?.trim() ||
            !subject.value?.trim()
        ) {
            isError.value = true;
            feedback.value = "All input marked with asterisk (*) are required";
            loading.value = false;
            return;
        }

        const body = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value,
            subject: subject.value
        }
        
        let res = await api.post('/contact', body)
        feedback.value = res.data.message
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Something went wrong, try again later.";
        feedback.value = msg
        isError.value = true;
    } finally {
        loading.value = false

        setTimeout(() => {
            isError.value = false
            feedback.value = ''
        }, 10000);
    }
}
</script>