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
                            <div class="mt-[17px]">
                            <div class="font-bold text-[#292B32]">Terms & Conditions</div>
                            These are the terms and conditions that every member of KC
                            Winners must follow to enjoy the contribution scheme and get
                            their full reward:
                            <ol>
                                <li>
                                    <strong>Contribution:</strong> You must contribute
                                    ₦2,000 every week for 30 weeks (7 months) — payment must
                                    be made on or before every Thursday.
                                </li>
                                <li>
                                    <strong>Registration Fee:</strong> First-time
                                    registration (activation) is ₦3,500 — this opens your
                                    first (primary) contribution account.
                                </li>
                                <li>
                                    <strong>Extra Accounts:</strong> Adding another
                                    contribution account costs ₦3,000 each — this money will
                                    be taken straight from your wallet.
                                </li>
                                <li>
                                    <strong>Wallet Funding:</strong> Your contributions are
                                    deducted from your wallet automatically every Thursday —
                                    make sure your wallet has money before Thursday to avoid
                                    missing a payment.
                                </li>
                                <li>
                                    <strong>Defaults (Missed Payments):</strong> If you miss
                                    a weekly payment, you must pay double the total amount
                                    owed before your account can be considered up to date.
                                    <br />
                                    You can clear your defaults anytime — during the 30-week
                                    contribution period or even after you finish
                                    contributing — but you must clear them before you can
                                    withdraw your payout.
                                </li>
                                <li>
                                    <strong>Referrals:</strong> Every account must have at
                                    least one referral within 3 months of activation or
                                    account creation to get foodstuff incentives at the end.
                                </li>
                                <li>
                                    <strong>Referral Code:</strong> Your referral is tied to
                                    your account. Either get a new person to register with
                                    your referral code or open another account with your own
                                    code to meet the requirement.
                                </li>
                                <li>
                                    <strong>No Money Transfer Between Members:</strong> You
                                    cannot send money to another person’s account — every
                                    member must complete their own contributions.
                                </li>
                                <li>
                                    <strong>Large Accounts:</strong> If you are running 50
                                    accounts or more, you must complete payments in 4 parts
                                    as agreed.
                                </li>
                                <li>
                                    <strong>Death or Emergency:</strong> If a member dies or
                                    something serious happens, the Next of Kin must finish
                                    the contributions and pay any defaults within one month
                                    (4 weeks) of reporting to the organization.
                                </li>
                                <li>
                                    <strong>No Refunds:</strong> ⚠️ No refund of money will
                                    be given if you break any of these rules.
                                </li>
                            </ol>
                        </div>

                        <div class="mt-10">
                            <div class="font-bold text-[#292B32]">How to Activate Your Account and Start Contributing</div>
                            <ol>
                                <li>
                                    <strong>Fill Form:</strong> Complete the activation form below with your details (name, address, account details, next of kin info).
                                </li>
                                <li>
                                    <strong>Pay & Upload Proof:</strong> Pay ₦3,500 to the official KC Winners bank account and upload the payment receipt in the form.
                                </li>
                                <li>
                                    <strong>Wait for Approval:</strong> The admin will verify your payment and activate your account.
                                </li>
                                <li>
                                    <strong>Wallet & Account Created:</strong> Your wallet and first contribution account will be set up automatically.
                                </li>
                                <li>
                                    <strong>Fund Your Wallet:</strong> Deposit money into your wallet so your contributions can be deducted.
                                </li>
                                <li>
                                    <strong>Start Contributions:</strong> Every Thursday, ₦2,000 will be deducted for 30 weeks.
                                </li>
                                <li>
                                    <strong>Share Your Referral Code:</strong> Make sure you get at least one referral within 3 months to qualify for foodstuff incentives.
                                </li>
                                <li>
                                    <strong>Clear Defaults:</strong> If you miss a week, pay up your missed weeks (double payment) to receive payout.
                                </li>
                                <li>
                                    <strong>Pay Clearance Fee:</strong> After your 30 weeks are done, pay ₦2,000 clearance fee from your wallet.
                                </li>
                                <li>
                                    <strong>Get Paid:</strong> Withdraw ₦100,000 and receive your foodstuff incentives (if referral condition was met).
                                </li>
                            </ol>
                        </div>

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