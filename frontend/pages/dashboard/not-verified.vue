<script setup lang="ts">
const supportEmail = "kcwinners3@gmail.com";
const supportPhone = "09136757875";
</script>

<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gray-50"
    >
        <img src="/images/logo.svg" alt="">
        <div
            class="max-w-md bg-white shadow-md rounded-2xl p-8 mt-5"
        >
            <h1 class="text-2xl font-bold text-red-600 mb-4">
                Account Not Verified
            </h1>
            <p class="text-gray-600 mb-6">
                Your account is pending admin verification. You’ll be able to
                access your dashboard once an admin approves your account.
            </p>
            <p class="text-gray-500 text-sm mb-6">
                If this takes longer than expected, please contact support:
                <a
                    :href="`mailto:${supportEmail}`"
                    class="underline"
                >
                    {{ supportEmail }}
                </a>
                or call
                <a :href="`tel:${supportPhone}`" class="underline"
                    >09136757875</a
                >
            </p>
            <NuxtLink
                to="/"
            >
                <PrimaryBtn>
                    Go to Home
                </PrimaryBtn>
            </NuxtLink>
        </div>
    </div>
</template>
