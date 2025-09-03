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

        <div class="bg-white rounded-lg p-[40px] mt-[57px]">
            <div class="font-bold text-[#292B32]">Genereal</div>
            <div class="mt-[17px]">
                <div class="grid grid-cols-2 gap-5">
                    <div>
                        <label for="fname" class="font-semibold text-[14px]">Full name</label>
                        <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="fname" placeholder="Enter full name"></input>
                    </div>
                    <div>
                        <label for="email" class="font-semibold text-[14px]">Email</label>
                        <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="email" name="" id="email"  placeholder="Enter email"></input>
                    </div>
                    <div>
                    <label for="sex" class="font-semibold text-[14px]">Sex</label>
                    <select
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
                    </div>

                </div>

                <div class="mt-10">
                    <BlackBtn>Save</BlackBtn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout'
})
</script>