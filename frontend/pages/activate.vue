<template>
    <div>
        <div class="bg-black px-5 lg:px-[72px] py-[20px]">
            <NuxtLink to="/">
                <img src="/images/logo-white.svg" alt="">
            </NuxtLink>
        </div>

        <div class="py-[18px] px-5 lg:px-[61px]">
            <div>
                <button class="flex text-[16px] items-center gap-2 px-[14px] py-[35px] font-bold" @click="$router.back()">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#050505"><path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="#050505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    Go back
                </button>
            </div>

            <div class="flex justify-center my-[45px]">
                <div class="lg:w-[479px] grid justify-center">
                    <div class="text-center">
                        <div class="text-[32px] text-semibold">Activate account</div>
                        <div class="text-[20px]">Read about our terms and conditions</div>
                    </div>

                    <div class="border border-[#7474742B] rounded-2xl py-5 h-[453px] mt-6">
                        <div class="overflow-auto h-full px-7 me-2">
                            <p class="">Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus</p>

                            <div class="grid gap-3 mt-5">
                                <div>
                                    <label for="sex" class="font-semibold text-[14px]">Sex <span>*</span></label>
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
                                    <label for="bankName" class="font-semibold text-[14px]">Bank Name <span>*</span></label>
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
                                    <label for="accountNumber" class="font-semibold text-[14px]">Account Number <span>*</span></label>
                                    <input
                                        v-model="accountNumber"
                                        id="accountNumber"
                                        name="accountNumber"
                                        type="text"
                                        @input="accountNumber = accountNumber?.replace(/[^0-9]/g, '')"
                                        placeholder="Enter account number"
                                        maxlength="10"
                                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label for="residentialAddress" class="font-semibold text-[14px]">Residential Address <span>*</span></label>
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
                                    <label for="nextOfKinName" class="font-semibold text-[14px]">Next of Kin Name <span>*</span></label>
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
                                    <label for="nextOfKinPhone" class="font-semibold text-[14px]">Next of Kin Phone <span>*</span></label>
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
                                    <label for="nextOfKinAddress" class="font-semibold text-[14px]">Next of Kin Address <span>*</span></label>
                                    <input
                                        v-model="nextOfKinAddress"
                                        id="nextOfKinAddress"
                                        name="nextOfKinAddress"
                                        rows="2"
                                        placeholder="Enter next of kin's address"
                                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                    ></input>
                                </div>

                                <div>
                                    <label for="referralCode" class="font-semibold text-[14px]">Referral Code (Optional)</label>
                                    <input
                                        v-model="referralCode"
                                        id="referralCode"
                                        name="referralCode"
                                        type="text"
                                        placeholder="Enter referral code (if any)"
                                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label for="registrationFeeUrl" class="font-semibold text-[14px]">Registration Fee Receipt <span>*</span></label>
                                    <input
                                        @change="handleFileChange"
                                        id="registrationFeeUrl"
                                        name="registrationFeeUrl"
                                        type="file"
                                        accept="image/*,application/pdf"
                                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="feedback" class="mt-5">
                        <p :class="[isError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ feedback }}</p>
                    </div>

                    <div class="mt-10">
                        <PrimaryBtnAsync 
                            :is-disabled="loading"
                            custom-class="w-full rounded-lg" 
                            @click="activateAccount"
                        >
                            {{ loading ? 'Activating account' : 'Activate account' }}
                        </PrimaryBtnAsync>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import { useAuthStore } from '~/store/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()
const api = useApi()

const token = Cookies.get('token')

const sex = ref("")
const bankName = ref("")
const accountNumber = ref("")
const residentialAddress = ref("")
const nextOfKinName = ref("")
const nextOfKinPhone = ref("")
const nextOfKinAddress = ref("")
const referralCode = ref("")
const registrationFee = ref<File | null>(null);
const loading = ref(false)

const isError = ref(false)
const feedback = ref("")

const file = ref<File | null>(null);

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    file.value = target.files && target.files[0] ? target.files[0] : null;
    registrationFee.value = file.value
}

async function activateAccount() {
    try {
        console.log(token)
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
            !nextOfKinPhone.value?.trim() ||
            !registrationFee.value || (registrationFee.value instanceof File && registrationFee.value.size === 0)

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
    
    
        let formData = new FormData(); 
        // formData.append('userID', authStore?.userProfile?._id as string)  

        const body = {
            sex: sex.value,
            bankName: bankName.value,
            accountNumber: accountNumber.value,
            residentialAddress: residentialAddress.value,
            nextOfKinName: nextOfKinName.value,
            nextOfKinPhone: nextOfKinPhone.value,
            nextOfKinAddress: nextOfKinAddress.value,
            referralCode: referralCode.value,
            registrationProof: registrationFee.value
        }
    
        Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        
        let res = await api.post('/auth/activate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Brearer ${token}`
            }
        })
    
        console.log(res)
        if(res.status == 200) {
            authStore.setUserProfile(res.data.data.user)
            router.push('/dashboard')
        }
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Failed to activate account, try again later.";
        feedback.value = msg
        isError.value = true;
    } finally {
        loading.value = false
    }
}
</script>