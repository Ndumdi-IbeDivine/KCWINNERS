<template>
    <div>
        <div class="text-[33px] font-bold">Welcome Admin! 👋</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="px-8 py-[21px] bg-white rounded-lg mt-10">
                <div class="flex gap-2.5 text-[#747474] font-[16px]">
                    Total users
                </div>
                <div class="text-[33px] font-bold">{{ users ? users.total : '...' }}</div>
            </div>
            <div class="px-8 py-[21px] bg-white rounded-lg mt-10">
                <div class="flex gap-2.5 text-[#747474] font-[16px]">
                    Pending registrations
                </div>
                <div class="text-[33px] font-bold">{{ pendingRegistrations ? pendingRegistrations.count : '...' }}</div>
            </div>
            <div class="px-8 py-[21px] bg-white rounded-lg mt-10">
                <div class="flex gap-2.5 text-[#747474] font-[16px]">
                    Pending Clearance
                </div>
                <div class="text-[33px] font-bold">{{ clearedUsers ? clearedUsers.count : '...' }}</div>
            </div>
        </div>

        <div class="mt-10">
            <div class="mt-[31px]">
            <div>
                <!-- Tabs -->
                <div class="border-b border-gray-200 bg-white px-[20px]">
                    <nav class="-mb-px space-x-4 flex md:space-x-8" aria-label="Tabs">
                        <button
                            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                            Awaiting verification
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div v-if="isInitLoaded" class="mt-[30px] rounded-lg bg-white">
                    <div class="md:p-4 rounded">
                        <div v-if="pendingRegistrations && pendingRegistrations.count > 0" class="relative">
                        <!-- Table -->
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-gray-500 border-collapse">
                            <thead class="text-sm text-[#072635] bg-white">
                                <tr>
                                <th scope="col" class="px-6 py-3 sticky left-0 bg-white">Account</th>
                                <th scope="col" class="px-6 py-3">Amount</th>
                                <th scope="col" class="px-6 py-3">Date created</th>
                                <th scope="col" class="px-6 py-3">Registration proof</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="user in pendingRegistrations.users"
                                :key="user._id"
                                class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]"
                                >
                                <td class="px-6 py-4 sticky left-0 bg-white z-10">
                                    {{ user.name }}
                                </td>
                                <td class="px-6 py-4">{{ user.phone }}</td>
                                <td class="px-6 py-4">{{ new Date(user.createdAt).toDateString() }}</td>
                                <td class="px-6 py-4 underline">
                                    <a
                                    v-if="user.registrationProofUrl"
                                    target="_blank"
                                    :href="user.registrationProofUrl"
                                    >
                                    View payment proof
                                    </a>
                                </td>
                                <td class="py-2">
                                    <PrimaryBtnAsync
                                    :is-disabled="loadingUserId !== null"
                                    @click="verifyUser(user._id)"
                                    >
                                    {{ loadingUserId == user._id ? "Verifying..." : "Verify" }}
                                    </PrimaryBtnAsync>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                        <!-- Loading Overlay -->
                        <div
                            v-if="loadingUserId"
                            class="absolute inset-0 bg-white/70 flex items-center justify-center z-20"
                        >
                            <div class="flex flex-col items-center">
                            <svg
                                class="animate-spin h-6 w-6 text-[#072635]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                                ></circle>
                                <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            <span class="mt-2 text-sm text-gray-700">Verifying user...</span>
                            </div>
                        </div>
                        </div>

                        <!-- <div v-else-if="successError" class="mt-5 mx-5">Something went wrong, try refreshing page</div> -->
                        <div v-else class="mt-5 mx-5">
                            No transactions to show
                        </div>

                    </div>
                </div>
                <div v-else>
                    <div class="flex justify-center items-center h-[100px]"><Loader /></div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/store/useAdminStore";

const api = useApi();
const adminStore = useAdminStore();
const { users, pendingRegistrations, isInitLoaded, clearedUsers } = storeToRefs(adminStore)

definePageMeta({
    layout: 'dashboard-layout'
})

const loadingUserId = ref<string | null>(null)

async function verifyUser(userId: string) {
    try {
        loadingUserId.value = userId
        
        const response = await api.post(`admin/approve-registration?userId=${userId}`)

        if (response?.data) {
            await adminStore.getPendingRegistrations()
            await adminStore.getUsers()
        }
    } catch (error) {
        console.error("Error verifying user:", error)
    } finally {
        loadingUserId.value = null
    }
}


onMounted(() => {
    // adminStore.init();
})
</script>