<template>
    <div>
        <div class="text-[33px] font-bold">Users</div>

        <div class="mt-10">
            <div class="mt-[31px]">
            <div>
                <!-- Tabs -->
                <div class="border-b border-gray-200 bg-white px-[20px]">
                    <nav class="-mb-px space-x-4 flex md:space-x-8" aria-label="Tabs">
                        <button
                            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        >
                            Users
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div v-if="isInitLoaded" class="mt-[30px] rounded-lg bg-white">
                    <div class="md:p-4 rounded relative">
                        <div v-if="users">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-gray-500 border-collapse">
                                    <thead class="text-sm text-[#072635] bg-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 sticky left-0 bg-white">Account</th>
                                        <th scope="col" class="px-6 py-3">Phone</th>
                                        <th scope="col" class="px-6 py-3">Email</th>
                                        <th scope="col" class="px-6 py-3">Address</th>
                                        <th scope="col" class="px-6 py-3">Is verified</th>
                                        <th scope="col" class="px-6 py-3">Date created</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in users.users" class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]">
                                        <td class="px-6 py-4 sticky left-0 bg-white z-10">
                                            {{ user.name }}
                                        </td>
                                        <td class="px-6 py-4">{{ user.phone }}</td>
                                        <td class="px-6 py-4">{{ user.email }}</td>
                                        <td class="px-6 py-4">{{ user.residentialAddress }}</td>
                                        <td class="px-6 py-4">
                                        <div :class="[user.isVerified ? 'text-[#27B060] bg-[#ECFFF4]' : 'bg-red-100 text-red-400', 'flex items-center text-[10px] rounded-[10px] py-0.5 px-2.5 w-fit']">
                                            {{ user?.isVerified ? 'Verified' : 'Not verified' }}
                                        </div>
                                        </td>
                                        <td class="px-6 py-4">{{ new Date(user.createdAt).toDateString() }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-3">
                                    <nav
                                        class="w-full grid grid-cols-3 gap-x-1"
                                        aria-label="Pagination"
                                    >
                                        <div>
                                            <button
                                                type="button"
                                                class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                                :disabled="!users.hasPrevPage"
                                                @click="
                                                    goToPage(
                                                        users.currentPage - 1
                                                    )
                                                "
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    class="w-5 h-5"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 12H5m7-7l-7 7 7 7"
                                                    />
                                                </svg>
                                                <span
                                                    aria-hidden="true"
                                                    class="hidden sm:block"
                                                    >Previous</span
                                                >
                                            </button>
                                        </div>

                                        <div
                                            class="flex justify-center gap-x-1"
                                        >
                                            <button
                                                v-for="pageNum in users.totalPages"
                                                :key="pageNum"
                                                type="button"
                                                class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-full transition-all duration-300"
                                                :class="[
                                                    users.currentPage ===
                                                    pageNum
                                                        ? 'bg-zinc-100'
                                                        : 'bg-white border border-[#0000001A] text-gray-800 hover:bg-gray-100',
                                                ]"
                                                @click="goToPage(pageNum)"
                                            >
                                                {{ pageNum }}
                                            </button>
                                        </div>

                                        <div class="flex justify-end">
                                            <button
                                                type="button"
                                                class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                                :disabled="!users.hasNextPage"
                                                @click="
                                                    goToPage(
                                                        users.currentPage + 1
                                                    )
                                                "
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    class="hidden sm:block"
                                                    >Next</span
                                                >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    class="w-5 h-5"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 12h14M13 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </nav>
                            </div>
                            <div
                            v-if="loading"
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
                                <span class="mt-2 text-sm text-gray-700">Loading...</span>
                            </div>
                        </div>
                        </div>

                            <div v-else class="mt-5 mx-5">No user to show</div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="flex justify-center items-center h-[100px]">
                            <Loader />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/store/useAdminStore";

const adminStore = useAdminStore();
const { users, isInitLoaded } = storeToRefs(adminStore);

definePageMeta({
    layout: "dashboard-layout",
});

const loading = ref(false);

const goToPage = async (page: number) => {
    loading.value = true;
    await adminStore.getUsers(page)
    loading.value = false;
}

onMounted(() => {
    if (!isInitLoaded.value) {
        adminStore.init();
    }
});
</script>
