<template>
    <div class="grid min-h-screen lg:p-8">
        <div>
            <NuxtLink to="/">
                <img src="/images/logo.svg" class="mb-10" alt="" />
            </NuxtLink>
            <div class="flex justify-center w-full h-full">
                <div class="grid gap-4 py-4 px-5 md:px-20 h-full content-center w-full lg:w-[580px]">
                    <div class="text-center mb-4">
                        <div class="text-[32px] font-semibold">Sign in</div>
                        <div class="font-[20px]">Enter your details to login</div>
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
                            @keypress.enter="handleLogin"
                            id="email"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                            placeholder="hello@gmail.com"
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
    
                    <div class="flex justify-end">
                        <NuxtLink
                            to="/forgot-password"
                            class="w-fit s-p text-[var(--sp-blue)] hover:underline"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import Cookies from "js-cookie";
import { useAuthStore } from "~/store/useAuthStore";
import { useAdminStore } from "~/store/useAdminStore";

const adminStore = useAdminStore();
const authStore = useAuthStore();
const router = useRouter();
const api = useApi();

const email = ref("");
const password = ref("");
const loading = ref(false);
const feedback = ref("");
const isError = ref(false)

async function handleLogin() {
    loading.value = true;
    isError.value = false;
    feedback.value = ''

    if(!email.value || !password.value) {
        isError.value = true
        feedback.value = "Email and password are required.";
        return;
    }

    try {
        const res = await api.post("/admin/login", {
            email: email.value,
            password: password.value,
        });
        if(res.data.success) {
            Cookies.set('token', res.data.token, { expires: 7 });
            authStore.setIsAuthenticated(true);
            authStore.setUserProfile(res.data.user);

            router.push('/dashboard')

            await adminStore.init()
        }
        // Redirect or store token logic here
    } catch (err: any) {
        const msg = err.response?.data?.message || "Login failed";
        feedback.value = msg;
        isError.value = true
    } finally {
        loading.value = false;
    }
}
</script>