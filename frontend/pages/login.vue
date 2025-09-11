<template>
    <div class="grid px-4 md:max-w-2xl lg:max-w-5xl xl:px-[100px] mx-auto min-h-screen">
        <div class="flex flex-col lg:p-8">
            <div class="p-3 w-fit">
                <NuxtLink to="/">
                    <img src="/images/logo.svg" alt="" />
                </NuxtLink>
            </div>
            <div class="grid gap-4 py-4 px-5 h-full content-center">
                <div class="text-center mb-4">
                    <div class="text-[32px] font-semibold">Sign in</div>
                    <div class="lg:text-[20px]">Enter your details to login</div>
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
                        @keypress.enter="handleLogin"
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
                        @keypress.enter="handleLogin"
                        id="password"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="********"
                        required
                    />
                </div>

                <div class="grid grid-cols-2">
                    <div>
                        <input type="checkbox" id="remember" class="mr-2" />
                        <label for="remember" class="text-sm cursor-pointer">Remember me</label>
                    </div>
                    <NuxtLink
                        to="/forgot-password"
                        class="flex justify-end s-p text-[var(--sp-blue)] hover:underline"
                    >
                        Forgot password?
                    </NuxtLink>
                </div>

                <div v-if="feedback">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div>
                    <PrimaryBtnAsync
                        :is-disabled="loading"
                        @click="handleLogin"
                        custom-class="w-full rounded-lg"
                    >
                        {{ loading ? "Logging in..." : "Login" }}
                    </PrimaryBtnAsync>
                </div>

                <div class="text-center">
                    Don't have an account?
                    <NuxtLink to="/create-account" class="text-center font-bold text-[var(--kc-green-dark)] hover:underline">
                        Create an account
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- <div class="hidden xl:block lg:p-2 lg:flex justify-end w-full">
            <img
                src="/images/login-illu.png"
                class="rounded-lg h-full "
                alt=""
            />
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import Cookies from "js-cookie";
import { useAuthStore } from "~/store/useAuthStore";
import { useContribustionsStore } from "~/store/useContributionsStore";

const authStore = useAuthStore();
const contributionsStore = useContribustionsStore()
const router = useRouter();
const api = useApi();

const phone = ref("");
const password = ref("");
const loading = ref(false);
const feedback = ref("");
const isError = ref(false)

async function retry(fn: () => Promise<any>, retries = 2, delay = 1000, errorMessage = 'Something went wrong. Let\'s give it another try.') {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 1) {
            throw err;
        }
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay, errorMessage);
    }
}

async function handleLogin() {
    loading.value = true;
    feedback.value = "";
    isError.value = false

    if(!phone.value || !password.value) {
        feedback.value = "Phone number and password are required.";
        loading.value = false;
        isError.value = true
        return;
    }

    try {
        Cookies.remove('token')

        const res = await api.post("/auth/login", {
            phone: phone.value,
            password: password.value,
        });

        
        if(res.data.success && res.data.data.user.isActivated) {
            Cookies.set('token', res.data.data.token, { expires: 7 });

            Promise.all([
                retry(() => contributionsStore.getContributions()),
                retry(() => contributionsStore.getMonthlyRevenue()),
                retry(() => contributionsStore.getTransactions()),
                router.push('/dashboard')
            ])

        } else if (res.data.success && !res.data.data.user.isActivated) {
            Cookies.set('token', res.data.data.token, { expires: 7 });

            Promise.all([
                retry(() => contributionsStore.getContributions()),
                retry(() => contributionsStore.getMonthlyRevenue()),
                retry(() => contributionsStore.getTransactions()),
                router.push('/activate')
            ])

        }
        
        authStore.setIsAuthenticated(true);
        authStore.setUserProfile(res.data.data.user);

        console.log(authStore.userProfile);
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Login failed";

        if(msg == 'Invalid Password' || msg == 'User not found') {
            feedback.value = 'Incorrect username or password'
        } else {
            feedback.value = msg;
        }

        isError.value = true
    } finally {
        loading.value = false;
    }
}
</script>