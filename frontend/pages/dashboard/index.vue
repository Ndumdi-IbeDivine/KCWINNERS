<template>
    <div>
        <div class="text-[33px] font-bold">Welcome {{ userProfile?.name.split(' ')[0] }} ! 👋</div>
        <div class="text-[#747474]">Consistency today is the celebration tomorrow!</div>
        <div class="flex mt-3 lg:justify-end">
            <DashboardModal btn-title="Fund Wallet" modal-title="Ready to fund your wallet?" @continue="fundWallet" :loading="loadingFundWallet">
                <label for="amount" class="font-semibold mb-2">Amount *</label>
                <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="amount" placeholder="Enter amount" v-model="amount">

                <div v-if="fundWalletFeedback">
                    <p :class="[isFundWalletError ? 'text-red-500' : 'text-green-500', 'text-[17px]']">{{ fundWalletFeedback }}</p>
                </div>
            </DashboardModal>
        </div>

        <div class="mt-[36px]">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/money-bills.svg" alt="">
                        Wallet Balance
                    </div>
                    <div class="text-[33px] font-bold">₦{{ userProfile?.walletBalance }}</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/eye.svg" alt="">
                        Number of accounts
                    </div>
                    <div class="text-[33px] font-bold">{{ contributions.length }}</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/ticket.svg" alt="">
                        Due Date
                    </div>
                    <div class="text-[33px] font-bold">{{ contributions.length ? useFormatDate(closestContributionDueDate()?.dueDate as string) : '...' }}</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/money-bills.svg" alt="">
                        Total contribution
                    </div>
                    <div class="text-[33px] font-bold">₦{{ userProfile?.totalContributed }}</div>
                </div>
            </div>

            <div class="mt-[34px] grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
                <div class="col-span-2 p-6 bg-white rounded-lg h-fit ">
                    <div class="text-[22px]">Revenue</div>

                    <div class="mt-10 relative">
                        <Bar v-if="chartData.labels.length" :data="chartData" :options="options" />
                        <div v-else class="flex justify-center items-center h-[100px]"><Loader /></div>
                    </div>
                </div>
                <div class="w-full mt-5 lg:mt-0">
                    <div class="p-6 bg-white rounded-lg">
                        <div class="flex gap-2.5 items-center font-semibold text-[18px]">
                            <img src="/images/trophy.svg" alt="">
                            <div>
                                Transactions <span class="text-[#747474]">(Last {{ transactions.count }} transactions)</span>
                            </div>
                        </div>
                        <div class="h-[320px] overflow-auto" v-if="transactionsLoad">
                            <div v-if="transactions?.count">
                                <div v-for="transaction in transactions.data" class="grid grid-cols-2 text-sm text-[#747474] mt-5 pe-3 gap-2">
                                    <div class="break-all wrap-anywhere hyphens-auto">{{ formatTransactionType(transaction.type) }}</div>
                                    <div class="flex gap-2 justify-end items-center"> <span :class="[transaction.status == 'success' ? 'flex items-center bg-[#ECFFF4] text-[10px] rounded-[10px] text-[#27B060] py-0.5 px-2.5 w-fit h-fit' : 'h-fit flex items-center bg-red-100 text-[10px] rounded-[10px] text-red-500 py-0.5 px-2.5 w-fit']">{{ transaction.status }}</span> ₦{{ transaction.amount }}</div>
                                </div>
                            </div>
                            <div v-else class="mt-5">
                                No transaction to show
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex justify-center items-center h-[100px]"><Loader /></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-[17px] mt-[29px]">
                        <DashboardModal 
                            custom-class="w-full text-white bg-[var(--kc-green-dark)] rounded-[34px] text-[12px] p-2 py-4 hover:underline" 
                            btn-title="Clear Account Defaults" 
                            modal-title="Clear Account Defaults" 
                            :loading="loadingFundWallet"
                            :show-only-cancel="true"
                        >
                            <div v-if="contributions.some((c) => c.defaults > 0)">
                                <div class="py-1.5" v-for="contribution in contributions">
                                    <div class="bg-[#f6f6f6] rounded p-3">
                                        <div class="flex items-center gap-3">
                                            <div class="flex-1">
                                                <div>{{ contribution.isPrimary ? 'Primary Contribution' : `Contribution ${contribution.code}` }}</div>
                                                <div>Defaults: {{ contribution.defaults }}</div>
                                                <div>Total: {{ contribution.defaults * 2000 }}</div>
                                            </div>
                                            <PrimaryBtnAsync
                                                @click="clearAccountDefault(contribution._id)"
                                                :is-disabled="loadingClearMap[contribution._id]"
                                            >
                                                <template v-if="loadingClearMap[contribution._id]">Clear...</template>
                                                <template v-else>Clear</template>
                                            </PrimaryBtnAsync>
                                        </div>
                                        <div v-if="feedbackMap[contribution._id]" class="mt-1">
                                            <p
                                                :class="[
                                                    errorMap[contribution._id] ? 'text-red-500' : 'text-green-500',
                                                    'text-[15px]'
                                                ]"
                                            >
                                                {{ feedbackMap[contribution._id] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                You don't have any defaults
                            </div>
                        </DashboardModal>
                        
                        <DashboardModal 
                            custom-class="w-full text-white bg-black rounded-[34px] text-[12px] p-2 py-4 hover:underline" 
                            btn-title="Clear Contribution Accounts" 
                            modal-title="Clear Contribution Accounts"
                            :loading="loadingFundWallet"
                            :show-only-cancel="true"
                        >
                            <div v-if="contributions.some((c) => c.status == 'eligible_for_withdrawal')">
                                <div class="py-1.5" v-for="contribution in contributions">
                                    <div class="bg-[#f6f6f6] rounded p-3" v-if="contribution.status == 'active'">
                                    <!-- <div class="bg-[#f6f6f6] rounded p-3"> -->
                                        <div class="flex items-center gap-3">
                                            <div class="flex-1">
                                                <div>{{ contribution.isPrimary ? 'Primary Contribution' : `Contribution ${contribution.code}` }}</div>
                                                <div>Total: {{ contribution.totalPaid }}</div>
                                            </div>
                                            <PrimaryBtnAsync
                                                @click="clearanceAccount(contribution._id)"
                                                :is-disabled="loadingClearanceMap[contribution._id]"
                                            >
                                                <template v-if="loadingClearanceMap[contribution._id]">Withdraw...</template>
                                                <template v-else>Withdraw</template>
                                            </PrimaryBtnAsync>
                                        </div>
                                        <div v-if="clearanceFeedbackMap[contribution._id]" class="mt-1">
                                            <p
                                                :class="[
                                                    cleranceErrorMap[contribution._id] ? 'text-red-500' : 'text-green-500',
                                                    'text-[15px]'
                                                ]"
                                            >
                                                {{ clearanceFeedbackMap[contribution._id] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                You don't have any completed account
                            </div>
                        </DashboardModal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement, ArcElement
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useAuthStore } from '~/store/useAuthStore'
import { useContribustionsStore } from '~/store/useContributionsStore'
import type { Revenue } from '../../types/base'

definePageMeta({
    layout: 'dashboard-layout',
})

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement
)

const api = useApi()
const authStore = useAuthStore()
const { userProfile } = storeToRefs(authStore)
const contributionStore = useContribustionsStore()
const { contributions, monthlyRevenue, transactions, transactionsLoad } = storeToRefs(contributionStore)

const amount = ref<number | null>(null)
const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

function expandMonthlyData(revenue: Revenue[]) {
    if (!monthlyRevenue.value.length) return { labels: [], data: [] }

    // 1. Normalize and sort by date
    const sorted = monthlyRevenue.value
        .map(c => {
        const [m, y] = c.month.split("-").map(Number)
        return { ...c, date: new Date(y, m - 1, 1) }
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime())

    const startDate = sorted[0].date
    const endDate = sorted[sorted.length - 1].date

    // 2. Expand all months between start and end
    const expanded: { label: string; total: number }[] = []
    let current = new Date(startDate)

    while (current <= endDate) {
        const label = `${months[current.getMonth()]} ${current.getFullYear()}`
        const found = sorted.find(c => c.date.getTime() === current.getTime())
        expanded.push({ label, total: found ? found.total : 0 })

        // go to next month
        current.setMonth(current.getMonth() + 1)
    }

    // 3. If more than 12, keep only last 12
    const last12 = expanded.slice(-12)

    return {
        labels: last12.map(e => e.label),
        data: last12.map(e => e.total),
    }
}

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


const chartData = computed(() => {
  const monthlyContributions = contributions.value.map((c: any) => ({
    month: c.month,
    total: c.total,
  }))
  const { labels, data } = expandMonthlyData(monthlyContributions)
  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        borderColor: '#E66FD2',
        data,
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: '#E66FD2',
        pointHoverRadius: 8,
        pointBorderWidth: 2,
        pointBorderColor: '#fff',
      }
    ],
  }
})


const options = ref({
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                filter: (legendItem: any, chartData: any) => {
                return legendItem.text !== 'Revenue';
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
    }
})

function closestContributionDueDate() {
    const now = new Date();

    // Filter contributions that have a dueDate after "now"
    const upcoming = contributions.value.filter(c => new Date(c.dueDate) >= now);

    if (!upcoming.length) return null;

    // Find the one with the smallest time difference
    return upcoming.reduce((closest, current) => {
        const closestDate = new Date(closest.dueDate).getTime();
        const currentDate = new Date(current.dueDate).getTime();

        return currentDate < closestDate ? current : closest;
  });
}

const loadingFundWallet = ref(false)
const isFundWalletError = ref(false)
const fundWalletFeedback = ref("")

async function fundWallet() {
    try {
        loadingFundWallet.value = true
        fundWalletFeedback.value = "";
        isFundWalletError.value = false

        if(!amount.value || isNaN(amount.value)) {
            fundWalletFeedback.value = "Please enter amount.";
            loadingFundWallet.value = false;
            isFundWalletError.value = true
            return;
        }

        if(amount.value && !(amount.value >= 100)) {
            fundWalletFeedback.value = "Minimum amount is 100 naira.";
            loadingFundWallet.value = false;
            isFundWalletError.value = true
            return;
        }

        let res = await api.post('/wallet/fund-initiate', {
            amount: amount.value
        })

        window.location = res.data.checkoutUrl
        console.log(res.data)
    } catch (err: any) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Login failed";
        fundWalletFeedback.value = msg;
        isFundWalletError.value = true
    } finally {
        loadingFundWallet.value = false;
    }
}

const loadingClearMap = ref<{ [key: string]: boolean }>({})
const feedbackMap = ref<{ [key: string]: string }>({})
const errorMap = ref<{ [key: string]: boolean }>({})

async function clearAccountDefault(id: string) {
    try {
        loadingClearMap.value[id] = true
        feedbackMap.value[id] = ""
        errorMap.value[id] = false

        if (!id) {
            feedbackMap.value[id] = "Something went wrong, try again later."
            errorMap.value[id] = true

            setTimeout(() => {
                feedbackMap.value[id] = ""
                errorMap.value[id] = false
            }, 5000);
            return
        }

        const res = await api.post(`/contributions/clear-default/${id}`)
        feedbackMap.value[id] = "Defaults cleared successfully"
        errorMap.value[id] = false

    } catch (err: any) {
        const msg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Something went wrong, try again later."
        feedbackMap.value[id] = msg
        errorMap.value[id] = true
    } finally {
        loadingClearMap.value[id] = false

        setTimeout(() => {
            feedbackMap.value[id] = ""
            errorMap.value[id] = false
        }, 5000)
    }
}

const loadingClearanceMap = ref<{ [key: string]: boolean }>({})
const clearanceFeedbackMap = ref<{ [key: string]: string }>({})
const cleranceErrorMap = ref<{ [key: string]: boolean }>({})

async function clearanceAccount(id: string) {
    try {
        loadingClearanceMap.value[id] = true
        clearanceFeedbackMap.value[id] = ""
        cleranceErrorMap.value[id] = false

        if (!id) {
            clearanceFeedbackMap.value[id] = "Something went wrong, try again later."
            cleranceErrorMap.value[id] = true

            setTimeout(() => {
                clearanceFeedbackMap.value[id] = ""
                cleranceErrorMap.value[id] = false
            }, 5000);
            return
        }

        const res = await api.post(`/contributions/pay-clearance/${id}`)
        clearanceFeedbackMap.value[id] = "Defaults cleared successfully"
        cleranceErrorMap.value[id] = false

    } catch (err: any) {
        const msg =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Something went wrong, try again later."
        clearanceFeedbackMap.value[id] = msg
        cleranceErrorMap.value[id] = true
    } finally {
        loadingClearanceMap.value[id] = false

        setTimeout(() => {
            clearanceFeedbackMap.value[id] = ""
            cleranceErrorMap.value[id] = false
        }, 5000)
    }
}


</script>