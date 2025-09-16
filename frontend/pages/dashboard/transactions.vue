<template>
    <div>
        <div class="font-bold text-[33px]">Transactions</div>
        <div>
            <div class="text-[#747474]">Your weekly update for transactions!</div>
        </div>

        <div class="mt-[31px]">
            <div>
                <!-- Tabs -->
                <div class="border-b border-gray-200 bg-white px-[20px]">
                    <nav class="-mb-px space-x-4 flex md:space-x-8" aria-label="Tabs">
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
                <div v-if="!loading" class="mt-[30px] rounded-lg bg-white">
                    <div v-if="activeTab === 'Weekly Deductions'" class="md:p-4 rounded">
                        <div class="font-bold flex items-center gap-2 p-5"><img src="/images/link.svg" alt=""> Weekly Deductions</div>
                        <div v-if="successfulTransactions?.data.length">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-gray-500 border-collapse">
                                    <thead class="text-sm text-[#072635] bg-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 sticky left-0 bg-white">Account</th>
                                        <th scope="col" class="px-6 py-3">Amount</th>
                                        <th scope="col" class="px-6 py-3">Status</th>
                                        <th scope="col" class="px-6 py-3">Date updated</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="transaction in successfulTransactions?.data" class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]">
                                        <td class="px-6 py-4 sticky left-0 bg-white z-10">
                                            {{ formatTransactionType(transaction.type) }}
                                        </td>
                                        <td class="px-6 py-4">{{ transaction.amount }}</td>
                                        <td class="px-6 py-4">
                                        <div class="flex items-center bg-[#ECFFF4] text-[10px] rounded-[10px] text-[#27B060] py-0.5 px-2.5 w-fit">
                                            Successful
                                        </div>
                                        </td>
                                        <td class="px-6 py-4">{{ new Date(transaction.createdAt).toDateString() }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="mt-3">
                                 <nav class="w-full grid grid-cols-3 gap-x-1" aria-label="Pagination">
                                    <!-- Previous -->
                                    <div>
                                        <button
                                            type="button"
                                            class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                            :disabled="successfulTransactions.page === 1"
                                            aria-label="Next"
                                            @click="goToPage(successfulTransactions.page - 1, 'success')"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                                            </svg>
                                            <span aria-hidden="true" class="hidden sm:block">Previous</span>
                                        </button>
                                    </div>

                                    <!-- Pages -->
                                    <div class="flex justify-center gap-x-1">
                                        <button
                                            v-for="(pageNum, index) in successfulPageNumbers"
                                            :key="index"
                                            type="button"
                                            class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-full transition-all duration-300"
                                            :class="[
                                            successfulTransactions.page === pageNum
                                                ? 'bg-zinc-100'
                                                : 'bg-white border border-[#0000001A] text-gray-800 hover:bg-gray-100'
                                            ]"
                                            @click="goToPage(pageNum as number, 'success')"
                                        >
                                            {{ pageNum }}
                                        </button>
                                    </div>

                                    <!-- Next -->
                                    <div class="flex justify-end">
                                        <button
                                            type="button"
                                            class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                            :disabled="successfulTransactions.page === successfulTransactions.totalPages"
                                            aria-label="Next"
                                            @click="goToPage(successfulTransactions.page + 1, 'success')"
                                        >
                                            <span aria-hidden="true" class="hidden sm:block">Next</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div v-else-if="successError" class="mt-5 mx-5">Something went wrong, try refreshing page</div>
                        <div v-else class="mt-5 mx-5">
                            No transactions to show
                        </div>

                    </div>

                    <div v-else-if="activeTab === 'Failed Transactions'" class="md:p-4 rounded">
                        <div class="font-bold flex items-center gap-2 p-5"><img src="/images/link.svg" alt=""> Failed Transactions</div>
                        <div v-if="failedTransactions?.data.length">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-gray-500 border-collapse">
                                    <thead class="text-sm text-[#072635] bg-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 sticky left-0 bg-white">Account</th>
                                        <th scope="col" class="px-6 py-3">Amount</th>
                                        <th scope="col" class="px-6 py-3">Status</th>
                                        <th scope="col" class="px-6 py-3">Date updated</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="transaction in failedTransactions.data" class="bg-white border-b border-gray-200 text-[14px] text-[#072635] hover:bg-[#F6F7F8]">
                                        <td class="px-6 py-4 sticky left-0 bg-white z-10">
                                            {{ formatTransactionType(transaction.type) }}
                                        </td>
                                        <td class="px-6 py-4">{{ transaction.amount }}</td>
                                        <td class="px-6 py-4">
                                        <div class="flex items-center bg-red-100 text-[10px] rounded-[10px] text-red-500 py-0.5 px-2.5 w-fit">
                                            Failed
                                        </div>
                                        </td>
                                        <td class="px-6 py-4">{{ new Date(transaction.createdAt).toDateString() }}</td>
                                    </tr>
                                    </tbody>
                                </table>
        
        
                                <div class="mt-3">
                                    <nav class="w-full grid grid-cols-3 gap-x-1" aria-label="Pagination">
                                            <!-- Previous -->
                                            <div>
                                                <button
                                                    type="button"
                                                    class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                                    :disabled="failedTransactions.page === 1"
                                                    aria-label="Next"
                                                    @click="goToPage(failedTransactions.page - 1, 'failed')"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7-7l-7 7 7 7" />
                                                    </svg>
                                                    <span aria-hidden="true" class="hidden sm:block">Previous</span>
                                                </button>
                                            </div>
        
                                            <!-- Pages -->
                                            <div class="flex justify-center gap-x-1">
                                                <button
                                                    v-for="(pageNum, index) in failedPageNumbers"
                                                    :key="index"
                                                    type="button"
                                                    class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-full transition-all duration-300"
                                                    :class="[
                                                    failedTransactions.page === pageNum
                                                        ? 'bg-zinc-100'
                                                        : 'bg-white border border-[#0000001A] text-gray-800 hover:bg-gray-100'
                                                    ]"
                                                    @click="goToPage(pageNum as number, 'failed')"
                                                >
                                                    {{ pageNum }}
                                                </button>
                                            </div>
        
                                            <!-- Next -->
                                            <div class="flex justify-end">
                                                <button
                                                    type="button"
                                                    class="min-h-9.5 min-w-9.5 py-2 px-3.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 bg-white border border-[#0000001A] focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-500 hover:transition-all hover:duration-300 cursor-pointer"
                                                    :disabled="failedTransactions.page === failedTransactions.totalPages"
                                                    aria-label="Next"
                                                    @click="goToPage(failedTransactions.page + 1, 'failed')"
                                                >
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
                        <div v-else-if="failedError" class="mt-5 mx-5">Something went wrong, try refreshing page</div>
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
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import type { TransactionsResponse } from "../../types/base"

definePageMeta({
    layout: 'dashboard-layout'
})

const api = useApi()
const open = ref(false)

const tabs = ["Weekly Deductions", "Failed Transactions"]
const activeTab = ref(tabs[0])
const loading = ref(false)
const successfulTransactions = ref<TransactionsResponse | null>(null)
const failedTransactions = ref<TransactionsResponse | null>(null)
const successError = ref(false)
const failedError = ref(false)

function formatTransactionType(type: string): string {
    if (!type) return "";

    return type
        .split("_")
        .map((word, i) =>
        i === 0
            ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            : word.toLowerCase()
        )
        .join(" ");
}

async function retry(fn: () => Promise<any>, retries = 3, delay = 1000, errorMessage = 'Something went wrong. Let\'s give it another try.') {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 1) {
            // This is the last retry and it failed
            // initLoadError.value = errorMessage;
            throw err;
        }
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay, errorMessage);
    }
}

const goToPage = (page: number, type: string) => {
    if(type == 'success') {
        if (page > 0 && page <= successfulTransactions.value.totalPages) {
            getSuccessfulTransactions(page)
        }
    } else {
        if (page > 0 && page <= failedTransactions.value.totalPages) {
            getFailedTransactions(page)
        }
    }
}

const successfulPageNumbers = computed(() => {
  if (!successfulTransactions.value) return []

  const { page, totalPages } = successfulTransactions.value
  const pages: (number | string)[] = []

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    // Always show first 2
    pages.push(1, 2)

    if (page > 4) {
      pages.push("…")
    }

    // Show current page ±1 (if not near edges)
    const start = Math.max(3, page - 1)
    const end = Math.min(totalPages - 2, page + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (page < totalPages - 3) {
      pages.push("…")
    }

    // Always show last 2
    pages.push(totalPages - 1, totalPages)
  }

  return pages
})

const failedPageNumbers = computed(() => {
  if (!failedTransactions.value) return []

  const { page, totalPages } = failedTransactions.value
  const pages: (number | string)[] = []

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    // Always show first 2
    pages.push(1, 2)

    if (page > 4) {
      pages.push("…")
    }

    // Show current page ±1 (if not near edges)
    const start = Math.max(3, page - 1)
    const end = Math.min(totalPages - 2, page + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (page < totalPages - 3) {
      pages.push("…")
    }

    // Always show last 2
    pages.push(totalPages - 1, totalPages)
  }

  return pages
})

async function getSuccessfulTransactions(page: number = 1) {
    try {
        loading.value = true
        let res = await api.get(`/wallet/transactions?status=success&page=${page}`)
        successfulTransactions.value = res.data
    } catch (error: any) {
        successError.value = true
    } finally {
        loading.value = false
    }
}

async function getFailedTransactions(page: number = 1) {
    try {
        loading.value = true

        let res = await api.get(`/wallet/transactions?status=failed&page=${page}`)
        failedTransactions.value = res.data
    } catch (error) {
        failedError.value = true
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    Promise.all([
        retry(async () => await getSuccessfulTransactions()),
        retry(async() => await getFailedTransactions())
    ])
})
</script>