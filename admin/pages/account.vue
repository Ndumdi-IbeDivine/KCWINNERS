<template>
  <div class="">
        <div class="grid justify-center items-center mt-20 mb-10">
            <div class="font-bold">Email: {{ userProfile?.email ? userProfile?.email : '...' }}</div>
        </div>
        <div class="grid gap-5 md:mx-[150px] xl:mx-[300px]">
            <div>
                <label for="curPass" class="font-bold text-sm">Current Password*</label>
                <input @keydown.enter="changePassword" v-model="password" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="password" name="" id="curPass">
            </div>
            <div>
                <label for="newPass" class="font-bold text-sm">New Password*</label>
                <input @keydown.enter="changePassword" v-model="newPassword" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="password" name="" id="newPass">
            </div>
            <div>
                <label for="confirmNewPass" class="font-bold text-sm">Confirm New Password*</label>
                <input @keydown.enter="changePassword" v-model="confirmNewPassword" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="password" name="" id="confirmNewPass">
            </div>

            <div v-if="changePasswordFeedback" class="mt-5">
                <p :class="[changePasswordisError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ changePasswordFeedback }}</p>
            </div>

            <PrimaryBtnAsync @click="changePassword" :is-disabled="changePasswordLoading">Change Password</PrimaryBtnAsync>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';

definePageMeta({
    layout: "dashboard-layout"
})

const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const api = useApi()

const newPassword = ref("")
const password = ref("")
const confirmNewPassword = ref("")
const changePasswordFeedback = ref("")
const changePasswordisError = ref(false)
const changePasswordLoading = ref(false)

async function changePassword() {
    try {
        changePasswordFeedback.value = ''
        changePasswordLoading.value = true
        changePasswordisError.value = false

        if(!password.value.trim() || !newPassword.value.trim() || !confirmNewPassword.value.trim()) {
            changePasswordisError.value = true;
            changePasswordFeedback.value = "All input marked with asterisk (*) are required";
            changePasswordLoading.value = false;

            setTimeout(() => {
                changePasswordFeedback.value = ''
                changePasswordisError.value = false
            }, 10000);
            return;
        }

        if(newPassword.value != confirmNewPassword.value) {
            changePasswordisError.value = true;
            changePasswordFeedback.value = "Password and password confirmation must match";
            changePasswordLoading.value = false;

            setTimeout(() => {
                changePasswordFeedback.value = ''
                changePasswordisError.value = false
            }, 10000);
            return;
        }

        let res = await api.patch('auth/change-password', {
            oldPassword: password.value,
            newPassword: newPassword.value
        })
        
        changePasswordFeedback.value = res.data.message
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Failed to update profile, try again later.";
        changePasswordFeedback.value = msg
        changePasswordisError.value = true;
    } finally {
        changePasswordLoading.value = false

        setTimeout(() => {
            changePasswordFeedback.value = ''
            changePasswordisError.value = false
        }, 4000);
    }
}

onMounted(() => {
    authStore.getProfile()
})
</script>