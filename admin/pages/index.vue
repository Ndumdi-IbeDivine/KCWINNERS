<template>
    <div class="grid min-h-screen lg:p-8">
        <div>
            <NuxtLink to="/">
                <img src="/images/logo.svg" class="mb-10" alt="" />
            </NuxtLink>
            <div class="flex justify-center w-full h-full">
                <div class="grid gap-4 py-4 px-5 md:px-20 h-full content-center lg:w-[580px]">
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
    
                    <div>
                        <PrimaryBtnAsync
                            :is-disabled="loading"
                            @click="handleLogin"
                            custom-class="w-full rounded-lg"
                        >
                            {{ loading ? "Logging in..." : "Login" }}
                        </PrimaryBtnAsync>
                    </div>
    
                    <div class="flex justify-center gap-2">
                        Don't have an account?
                        <NuxtLink to="/create-account">
                            <div
                                class="text-center font-bold text-[var(--kc-green-dark)] hover:underline"
                            >
                                Create an account
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
// import Cookies from "js-cookie";
// import { useAuthStore } from "~/store/useAuthStore";
// import { useCartAndWishListStore } from "~/store/useCartAndWishlistStore";

// const cartAndWishlistStore = useCartAndWishListStore()
// const { localCart } = storeToRefs(cartAndWishlistStore)
// const authStore = useAuthStore();
// const router = useRouter();
// const api = useApi();

const email = ref("");
const password = ref("");
const loading = ref(false);
// const error = ref("");

// const toast = inject('toast') as Ref<{ showToast: (msg: string, success: boolean) => void } | undefined>

async function handleLogin() {
    // loading.value = true;
    // error.value = "";

    // if(!email.value || !password.value) {
    //     error.value = "Email and password are required.";
    //     toast?.value?.showToast("Email and password are required.", false);
    //     loading.value = false;
    //     return;
    // }

    // try {
    //     const res = await api.post("/auth/login", {
    //         email: email.value,
    //         password: password.value,
    //     });

    //     toast?.value?.showToast(res.data.message, res.data.success);

    //     if(res.data.success) {
    //         Cookies.set('token', res.data.token, { expires: 7 });
    //         authStore.setIsAuthenticated(true);
    //         authStore.setUserProfile(res.data.user);

    //         console.log(authStore.userProfile);
    //         cartAndWishlistStore.getCart()
    //         router.push('/')

    //         if(localCart.value?.items) {
    //             cartAndWishlistStore.addToCart(null, 0, localCart.value?.items)
    //             setTimeout(() => {
    //                 localCart.value = null
    //                 localStorage.removeItem('localStorage')
    //             }, 2000);
    //         }
    //     }
    //     // Redirect or store token logic here
    // } catch (err: any) {
    //     const msg = err.response?.data?.message || "Login failed";
    //     error.value = msg;
    //     toast?.value?.showToast(msg, false);
    // } finally {
    //     loading.value = false;
    // }
}
</script>