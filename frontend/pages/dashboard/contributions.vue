<template>
    <div>
        <div class="font-bold text-[33px]">Contribution Accounts</div>
        <div class="grid grid-cols-2 items-center">
            <div class="text-[#747474]">Your wallet update for today</div>
            <div class="flex justify-end">
                <DashboardModal modal-title="Add contribution accounts" btn-title="Add Account">
                    <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="" placeholder="Enter referral code">
                    <p class="text-[#7A8699] text-[14px] mt-[6px]">Max.: 10 accounts. <span class="text-green-500">9 left</span></p>
                </DashboardModal>
            </div>
        </div>

        <div class="bg-white rounded-lg py-[24px] px-[35px] mt-[57px]">
            <div class="font-bold text-[#292B32]">Your accounts</div>
            <hr class="border-[#EBECEF] mt-4 mb-[30px]">
            <div class="grid grid-cols-5 gap-[30px]">
                <DashboardContributionCard v-for="i in 3" class="col-span-2" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout',
})
</script>