<template>
    <div class="m-1 py-[25px] px-[20px] border border-[#EAEAEA] rounded-[10px] hover:border-[#DB77DB] transition ease-in">
        <div class="flex">
            <div>
                <svg width="24px" stroke-width="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19 20H5C3.89543 20 3 19.1046 3 18V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20Z" stroke="#000000" stroke-width="1.5"></path><path d="M16.5 14C16.2239 14 16 13.7761 16 13.5C16 13.2239 16.2239 13 16.5 13C16.7761 13 17 13.2239 17 13.5C17 13.7761 16.7761 14 16.5 14Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 7V5.60322C18 4.28916 16.7544 3.33217 15.4847 3.67075L4.48467 6.60409C3.60917 6.83756 3 7.63046 3 8.53656V9" stroke="#000000" stroke-width="1.5"></path></svg>
            </div>
            <div class="flex-1 flex justify-end">
                <div class="flex items-center bg-[#ECFFF4] text-[10px] rounded-[10px] text-[#27B060] py-0.5 px-2.5 w-fit uppercase">
                    {{ contribution.status }}
                </div>
            </div>
        </div>
        <div class="mt-[4px]">
            <div class="text-[#232323] text-[19px]">{{ contribution.isPrimary ? 'Primary Contribution' : `Contribution ${contribution.code}` }}</div>
            <div class="bg-[#F4F4F5] text-[7px] py-1 px-2 w-fit rounded-[11px] text-[#6D6D6D] font-bold">REFERRAL CODE: {{ contribution.referralCode }} <br> REFERRAL COUNT: 1</div>
        </div>
        <div @click="copyReferralCode" class="w-fit mt-3 text-[14px] flex gap-1 items-center hover:underline cursor-pointer">
            <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H15.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path></svg>
            Copy referral code
        </div>
        <div class="grid grid-cols-2 mt-[21px] items-center">
            <div class="font-semibold text-[#27B060]">{{ contribution.totalPaid }} 
                <!-- <sup class="text-[10px]">+2000</sup> -->
            </div>
            <div class="flex justify-end">
                <div class="rounded-full bg-[#F4F4F5] h-6 px-3 text-[#838484] text-[12px] flex items-center justify-center">Defaults: {{ contribution.defaults }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Contribution } from '../../types/base'

const props= defineProps<{
    contribution: Contribution
}>()

const { show } = useToast()

function copyReferralCode() {
  if (props.contribution.referralCode) {
    navigator.clipboard.writeText(props.contribution.referralCode)
      .then(() => {
        show("Referral code copied!", "success")
      })
      .catch(() => {
        show("Failed to copy referral code", "error")
      })
  }
}
</script>