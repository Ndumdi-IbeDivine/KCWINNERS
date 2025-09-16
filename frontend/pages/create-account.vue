<template>
    <div class="grid px-4 md:max-w-2xl lg:max-w-4xl mx-auto min-h-screen">
        <div class="flex flex-col">
            <div class="p-3 w-fit">
                <NuxtLink to="/">
                    <img src="/images/logo.svg" alt="" />
                </NuxtLink>
            </div>
            <div class="grid gap-4 pb-1 px-5 h-full content-center">
                <div class="text-center mb-4">
                    <div class="text-[32px] font-semibold">Create your account</div>
                    <div class="font-[20px]">Start today for free</div>
                </div>

                <div>
                    <label
                        for="fname"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Full name <span>*</span></label
                    >
                    <input
                        v-model="fname"
                        type="text"
                        @keypress.enter="handleCreateAccount"
                        id="fname"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div>
                    <label
                        for="email"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Email Address <span>*</span></label
                    >
                    <input
                        v-model="email"
                        type="email"
                        @keypress.enter="handleCreateAccount"
                        id="email"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="hello@gmail.com"
                        required
                    />
                </div>

                <div>
                    <label
                        for="phone"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Phone number <span>*</span></label
                    >
                    <input
                        v-model="phone"
                        type="email"
                        @keypress.enter="handleCreateAccount"
                        id="phone"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="08000000000"
                        required
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Password <span>*</span></label
                    >
                    <input
                        v-model="password"
                        type="password"
                        @keypress.enter="handleCreateAccount"
                        id="password"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="********"
                        required
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-2 block text-sm font-bold text-gray-900"
                        >Confirm Password <span>*</span></label
                    >
                    <input
                        v-model="confirmPassword"
                        type="password"
                        @keypress.enter="handleCreateAccount"
                        id="password"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="********"
                        required
                    />
                </div>

                <div v-if="feedback">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div class="mt-4">
                    <PrimaryBtnAsync
                        :is-disabled="loading"
                        @click="handleCreateAccount"
                        custom-class="w-full rounded-lg"
                    >
                        {{ loading ? "Creating account..." : "Create account" }}
                    </PrimaryBtnAsync>
                </div>

                <div class="text-center text-[14px]">By signing up, you agree to the <NuxtLink to="/terms" class="underline cursor-pointer">Terms of Service</NuxtLink>.</div>

                <div class="text-center">
                    Already have an account?
                    <span>
                        <NuxtLink to="/login" class="font-bold text-[var(--kc-green-dark)] hover:underline">
                            Login
                        </NuxtLink>
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
// import Cookies from "js-cookie";
// import { useAuthStore } from "~/store/useAuthStore";

// const authStore = useAuthStore();
const router = useRouter();
const api = useApi();

const fname = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const isError = ref(false)
const feedback = ref("");

async function handleCreateAccount() {
    loading.value = true;
    feedback.value = "";
    isError.value = false

    if(!email.value || !password.value || !fname.value || !phone.value || !confirmPassword.value) {
        feedback.value = "All inputs are required.";
        isError.value = true
        loading.value = false;
        return;
    }

    if(password.value != confirmPassword.value) {
        isError.value = true
        feedback.value = "Password and password confirmation must match.";
        loading.value = false;
        return;
    }

    try {
        const res = await api.post("/auth/sign-up", {
            name: fname.value,
            phone: phone.value,
            email: email.value,
            password: password.value,
        });

        if(res.data.success) {
            feedback.value = "Account created successfully, taking you to the login page"
            // Cookies.set('token', res.data.token, { expires: 7 });
            // authStore.setIsAuthenticated(true);
            // authStore.setUserProfile(res.data.user);


            setTimeout(() => {
                router.push('/login')
            }, 2000)
        }
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Login failed";
        isError.value = true
        feedback.value = msg;
    } finally {
        loading.value = false;
    }
}
</script>