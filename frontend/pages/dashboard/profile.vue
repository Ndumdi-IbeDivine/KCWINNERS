<template>
    <div>
        <div class="text-[33px] font-bold">Profile</div>
        <div class="grid grid-cols-2 items-center">
            <div class="text-[#747474]">Edit your profile</div>
            <div class="flex justify-end">
                <DashboardModal btn-title="Fund Wallet" modal-title="Ready to fund your wallet?">
                    <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="">
                </DashboardModal>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout'
})
</script>