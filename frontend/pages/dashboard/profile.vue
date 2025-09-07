<template>
    <div>
        <div class="text-[33px] font-bold">Profile</div>
        <div class="grid md:grid-cols-2 gap-3 md:gap-0 items-center">
            <div class="text-[#747474]">Edit your profile</div>
            <div class="flex md:justify-end">
                <DashboardModal btn-title="Fund Wallet" modal-title="Ready to fund your wallet?">
                    <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="">
                </DashboardModal>
            </div>
        </div>

        <div class="bg-white rounded-lg p-5 lg:p-[40px] mt-[57px]">
            <div class="font-bold text-[#292B32]">General</div>
            <div class="mt-[17px]">
                <div class="grid lg:grid-cols-2 gap-5">
                    <div>
                        <label for="fname" class="font-semibold text-[14px]">Full name</label>
                        <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="fname" placeholder="Enter full name" readonly :value="userProfile?.name"></input>
                    </div>
                    <div>
                        <label for="email" class="font-semibold text-[14px]">Email</label>
                        <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="email" name="" id="email"  placeholder="Enter email" readonly :value="userProfile?.email"></input>
                    </div>
                    <div>
                        <label for="phone" class="font-semibold text-[14px]">Phone</label>
                        <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="phone"  placeholder="Enter email" readonly :value="userProfile?.phone"></input>
                    </div>
                    <div>
                        <label for="sex" class="font-semibold text-[14px]">Sex</label>
                        <select
                            v-model="sex"
                            id="sex"
                            name="sex"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label for="bankName" class="font-semibold text-[14px]">Bank Name</label>
                        <input
                            v-model="bankName"
                            id="bankName"
                            name="bankName"
                            type="text"
                            placeholder="Enter bank name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label for="accountNumber" class="font-semibold text-[14px]">Account Number</label>
                        <input
                            v-model="accountNumber"
                            id="accountNumber"
                            name="accountNumber"
                            type="text"
                            placeholder="Enter account number"
                            maxlength="10"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label for="residentialAddress" class="font-semibold text-[14px]">Residential Address</label>
                        <input
                            v-model="residentialAddress"
                            id="residentialAddress"
                            name="residentialAddress"
                            rows="2"
                            placeholder="Enter your residential address"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        ></input>
                    </div>

                    <div>
                        <label for="nextOfKinName" class="font-semibold text-[14px]">Next of Kin Name</label>
                        <input
                            v-model="nextOfKinName"
                            id="nextOfKinName"
                            name="nextOfKinName"
                            type="text"
                            placeholder="Enter next of kin's name"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label for="nextOfKinPhone" class="font-semibold text-[14px]">Next of Kin Phone</label>
                        <input
                            v-model="nextOfKinPhone"
                            id="nextOfKinPhone"
                            name="nextOfKinPhone"
                            type="tel"
                            placeholder="Enter next of kin's phone"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label for="nextOfKinAddress" class="font-semibold text-[14px]">Next of Kin Address</label>
                        <input
                            v-model="nextOfKinAddress"
                            id="nextOfKinAddress"
                            name="nextOfKinAddress"
                            rows="2"
                            placeholder="Enter next of kin's address"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        ></input>
                    </div>

                    <!-- <div>
                        <label for="referralCode" class="font-semibold text-[14px]">Referral Code (Optional)</label>
                        <input
                            id="referralCode"
                            name="referralCode"
                            type="text"
                            placeholder="Enter referral code (if any)"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label for="registrationFeeUrl" class="font-semibold text-[14px]">Registration Fee Receipt</label>
                        <input
                            id="registrationFeeUrl"
                            name="registrationFeeUrl"
                            type="file"
                            accept="image/*,application/pdf"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div> -->

                </div>

                <div v-if="feedback" class="mt-5">
                    <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                </div>

                <div class="mt-10">
                    <PrimaryBtnAsync 
                        @click="updateProfile"
                        :is-disabled="loading" 
                        custom-class="bg-black text-white px-8 rounded-lg hover:bg-gray-800 transition"
                    >{{ loading ? 'Saving' :'Save' }}</PrimaryBtnAsync>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';

definePageMeta({
    layout: 'dashboard-layout'
})

const api = useApi()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)

const sex = ref(userProfile.value?.sex)
const bankName = ref(userProfile.value?.bankName)
const accountNumber = ref(userProfile.value?.accountNumber)
const residentialAddress = ref(userProfile.value?.residentialAddress)
const nextOfKinName = ref(userProfile.value?.nextOfKin.name)
const nextOfKinPhone = ref(userProfile.value?.nextOfKin.phone)
const nextOfKinAddress = ref(userProfile.value?.nextOfKin.address)

const feedback = ref('')
const isError = ref(false)
const loading = ref(false)

async function updateProfile() {
    try {
        loading.value = true
        isError.value = false
        feedback.value = ""

        if (
            !sex.value?.trim() ||
            !bankName.value?.trim() ||
            !accountNumber.value?.trim() ||
            !residentialAddress.value?.trim() ||
            !nextOfKinAddress.value?.trim() ||
            !nextOfKinName.value?.trim() ||
            !nextOfKinPhone.value?.trim()
        ) {
            isError.value = true;
            feedback.value = "All input marked with asterisk (*) are required";
            loading.value = false;
            return;
        }

        if(accountNumber.value.length !== 10) {
            isError.value = true
            feedback.value = "Invalid account number"
            loading.value = false
            return
        }

        const body = {
            sex: sex.value,
            bankName: bankName.value,
            accountNumber: accountNumber.value,
            residentialAddress: residentialAddress.value,
            nextOfKinName: nextOfKinName.value,
            nextOfKinPhone: nextOfKinPhone.value,
            nextOfKinAddress: nextOfKinAddress.value
        }

        let res = await api.patch('/auth/update-profile', body)
        
        feedback.value = res.data.message
        authStore.setUserProfile(res.data.user)
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Failed to update profile, try again later.";
        feedback.value = msg
        isError.value = true;
    } finally {
        loading.value = false
    }
}
</script>