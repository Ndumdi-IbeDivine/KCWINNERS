<template>
    <div class="grid px-4 md:max-w-2xl lg:max-w-4xl mx-auto min-h-screen">
        <div class="flex flex-col">
            <div class="p-3 w-fit">
                <NuxtLink to="/">
                    <img src="/images/logo.svg" alt="" />
                </NuxtLink>
            </div>
            <div class="grid gap-4 py-4 px-5 h-full content-center">
                <div class="text-center mb-4">
                    <div class="text-[32px] font-semibold">Forgot password</div>
                </div>

                <div>
                    <label
                        for="phone"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Phone number <span>*</span></label
                    >
                    <input
                        v-model="phone"
                        type="phone"
                        @keypress.enter="handleForgotPassword"
                        id="phone"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="08000000000"
                        required
                    />
                </div>

                <div v-if="feedback">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div>
                    <PrimaryBtnAsync
                        :is-disabled="loading"
                        @click="handleForgotPassword"
                        custom-class="w-full rounded-lg"
                    >
                        {{ loading ? "Continue..." : "Continue" }}
                    </PrimaryBtnAsync>
                </div>
            </div>

            <!-- <div class="grid gap-4 py-4 px-5 md:px-20 h-full content-center">
                <div class="text-center mb-4">
                    <div class="text-[32px] font-semibold">Forgot password</div>
                    <div class="lg:text-[20px]">We sent an OTP to 09090909</div>
                </div>

                <div>
                    <label
                        for="otp"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >OTP <span>*</span></label
                    >
                    <input
                        v-model="otp"
                        type="phone"
                        @keypress.enter="handleForgotPassword"
                        id="otp"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter OTP"
                        required
                    />
                </div>

                <div v-if="feedback">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div>
                    <PrimaryBtnAsync
                        :is-disabled="loading"
                        @click="handleForgotPassword"
                        custom-class="w-full rounded-lg"
                    >
                        {{ loading ? "Continue..." : "Continue" }}
                    </PrimaryBtnAsync>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import Cookies from "js-cookie";
import { useAuthStore } from "~/store/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();
const api = useApi();

const phone = ref("");
const otp = ref("")
const newPassword = ref("")
const newPasswordConfirmation = ref("")
const step = ref(1)

const loading = ref(false);
const feedback = ref("");
const isError = ref(false)

function normalizePhone(phone: string): string | null {
    let cleaned = phone.replace(/\D/g, "");

    if (/^0\d{10}$/.test(cleaned)) {
        return "+234" + cleaned.slice(1);
    }

    if (/^234\d{10}$/.test(cleaned)) {
        return "+" + cleaned;
    }

    if (/^\+234\d{10}$/.test(phone)) {
        return phone;
    }

    return null;
}


async function handleForgotPassword() {
    loading.value = true;
    feedback.value = "";
    isError.value = false

    if(!phone.value) {
        feedback.value = "Phone number is required.";
        loading.value = false;
        isError.value = true
        return;
    }

    try {
        const res = await api.post("/auth/forgot-password", {
            phone: normalizePhone(phone.value),
        });
        
    } catch (err: any) {
        feedback.value = "Failed to send OTP, try again later"

        isError.value = true
    } finally {
        loading.value = false;
    }
}
</script>