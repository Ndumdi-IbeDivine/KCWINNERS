<template>
    <div>
        <div class="font-bold text-[33px]">Transactions</div>
        <div class="grid grid-cols-2 items-center">
            <div class="text-[#747474]">Your weekly update for transactions!</div>
        </div>

        <div class="mt-[31px]">
            <div>
                <!-- Tabs -->
                <div class="border-b border-gray-200 bg-white px-[20px]">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            v-for="tab in tabs"
                            :key="tab"
                            @click="activeTab = tab"
                            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                            :class="activeTab === tab
                                ? 'border-[#232323] text-[#232323]'
                                : 'border-transparent text-[#B1B1B1] hover:text-gray-700 hover:border-gray-300'"
                        >
                        {{ tab }}
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div class="mt-[30px] rounded-lg bg-white">
                    <div v-if="activeTab === 'Weekly Deductions'" class="p-4 rounded">
                        <div class="font-bold flex items-center gap-2 p-5"><img src="/images/link.svg" alt=""> Weekly Deductions</div>

                            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead class="text-sm text-[#072635] bg-white rounded-3xl">
                                    <tr class="rounded-3xl">
                                        <th scope="col" class="px-6 py-3">
                                            Account
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Total amount
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Last transaction
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date updated
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    <tr v-for="i in 10" class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]">
                                        <td class="px-6 py-4">
                                            Primary contribution
                                        </td>
                                        <td class="px-6 py-4">
                                            10,000
                                        </td>
                                        <td class="px-6 py-4">
                                            +2,000
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center bg-[#ECFFF4] text-[10px] rounded-[10px] text-[#27B060] py-0.5 px-2.5 w-fit">
                                                Successful
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            1/1/2025
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="mt-3">
                                <nav class="w-full grid grid-cols-3 gap-x-1" aria-label="Pagination">
                                    <div class="">
                                        <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"  aria-label="Previous">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                                            </svg>

                                            <span aria-hidden="true" class="hidden sm:block">Previous</span>
                                        </button>
                                    </div>

                                    <div class="flex justify-center gap-x-1">
                                        <button
                                            type="button"
                                            class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-full focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                                            
                                            
                                        >
                                            1
                                        </button>
                                    </div>
                                    
                                    <div class="flex justify-end">
                                        <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"  aria-label="Next">
                                            <span aria-hidden="true" class="hidden sm:block">Next</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                    </div>

                    <div v-else-if="activeTab === 'Failed Transactions'" class="p-4 rounded">
                        <div class="font-bold flex items-center gap-2 p-5"><img src="/images/link.svg" alt=""> Failed Transactions</div>
                        
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead class="text-sm text-[#072635] bg-white rounded-3xl">
                                    <tr class="rounded-3xl">
                                        <th scope="col" class="px-6 py-3">
                                            Account
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Total amount
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Last transaction
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Date updated
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    <tr v-for="i in 10" class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]">
                                        <td class="px-6 py-4">
                                            Primary contribution
                                        </td>
                                        <td class="px-6 py-4">
                                            10,000
                                        </td>
                                        <td class="px-6 py-4">
                                            +2,000
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center bg-red-100 text-[10px] rounded-[10px] text-red-500 py-0.5 px-2.5 w-fit">
                                                Failed
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            1/1/2025
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="mt-3">
                                <nav class="w-full grid grid-cols-3 gap-x-1" aria-label="Pagination">
                                    <div class="">
                                        <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"  aria-label="Previous">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                                            </svg>

                                            <span aria-hidden="true" class="hidden sm:block">Previous</span>
                                        </button>
                                    </div>

                                    <div class="flex justify-center gap-x-1">
                                        <button
                                            type="button"
                                            class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-full focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none"
                                            
                                            
                                        >
                                            1
                                        </button>
                                    </div>
                                    
                                    <div class="flex justify-end">
                                        <button type="button" class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex jusify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"  aria-label="Next">
                                            <span aria-hidden="true" class="hidden sm:block">Next</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'dashboard-layout'
})

const tabs = ["Weekly Deductions", "Failed Transactions"]
const activeTab = ref(tabs[0])
</script>