<template>
    <div>
        <div class="font-bold text-[33px]">Contribution Accounts</div>
        <div class="grid md:grid-cols-2 items-center gap-3">
            <div class="text-[#747474]">Your accounts update for today</div>
            <div class="flex md:justify-end">
                <DashboardModal modal-title="Add contribution accounts" btn-title="Add Account" :continue-btn="loading ? 'Creating account...' : 'Create account'" :loading="loading" @continue="addAccount">
                    <label for="refCode" class="font-semibold">Enter referral code*</label>
                    <input v-model="refCode" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="refCode" placeholder="Enter referral code">
                    <p class="text-[#7A8699] text-[14px] mt-[6px]">Opening another account? Use the referral code of the last one you opened to link them together</p>

                    <div v-if="feedback" class="mt-5">
                        <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                    </div>
                </DashboardModal>
            </div>
        </div>

        <div class="bg-white rounded-lg px-5 py-5 lg:py-[24px] lg:px-[35px] mt-[57px]" v-if="initContributionLoad">
            <div class="font-bold text-[#292B32]">Your {{ contributions.length > 1 ? "accounts" : "account" }}</div>
            <hr class="border-[#EBECEF] mt-4 mb-[30px]">
            <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-[30px]">
                <DashboardContributionCard 
                    v-for="(contribution, index) in contributions"
                    :contribution="contribution" 
                    class="col-span-2"
                    :key="index" 
                />
            </div>
        </div>

        <div v-else>
            <div class="flex justify-center items-center h-[100px]"><Loader /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useContribustionsStore } from '~/store/useContributionsStore';
import { useAuthStore } from '~/store/useAuthStore';

definePageMeta({
    layout: 'dashboard-layout',
})

const api = useApi()
const contributionsStore = useContribustionsStore()
const { contributions, initContributionLoad } = storeToRefs(contributionsStore)
const authStore = useAuthStore()

const refCode = ref('')
const loading = ref(false)
const isError = ref(false)
const feedback = ref('')

async function a() {
    await authStore.getProfile()
}
a()

async function addAccount() {
    try {
        loading.value = true
        isError.value = false
        feedback.value = ""

        if(!refCode.value) {
            isError.value = true
            feedback.value = "Referral code is required"
            loading.value = false

            setTimeout(() => {
                feedback.value = ''
            }, 7000);

            return
        }
        
        let res = await api.post('/contributions/create', {
            userId: authStore.userProfile?._id,
            referralCode: refCode.value
        })

        await contributionsStore.getContributions()

        feedback.value = res.data.message
        refCode.value = ''

        // authStore.
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Failed to create account, try again later.";
        feedback.value = msg
        isError.value = true;
    } finally {
        loading.value = false
        setTimeout(() => {
            feedback.value = ''
        }, 7000);
    }
}
</script>