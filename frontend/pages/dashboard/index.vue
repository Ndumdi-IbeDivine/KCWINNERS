<template>
    <div>
        <div class="text-[33px] font-bold">Welcome {{ userProfile?.name.split(' ')[0] }} ! 👋</div>
        <div class="text-[#747474]">Your wallet update for today!</div>
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
                        Total contributions
                    </div>
                    <div class="text-[33px] font-bold">₦{{ userProfile?.totalContributed }}</div>
                </div>
            </div>

            <div class="mt-[34px] grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
                <div class="col-span-2 p-6 bg-white rounded-lg h-fit ">
                    <div class="text-[22px]">Revenue</div>

                    <div class="mt-10 relative">
                        <Bar :data="data" :options="options" />
                    </div>
                </div>
                <div class="w-full mt-5 lg:mt-0">
                    <div class="p-6 bg-white rounded-lg">
                        <div class="flex gap-[4.5px] items-center font-semibold text-[18px]">
                            <img src="/images/trophy.svg" alt="">
                            Transactions
                        </div>
                        <div class="h-[320px] overflow-auto">
                            <div v-for="i in 30" class="grid grid-cols-3 text-[#747474] mt-5 pe-3">
                                <div class="col-span-2">Fee</div>
                                <div class="text-end">+ ₦2000</div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-[17px] mt-[29px]">
                        <button class="text-white bg-[var(--kc-green-dark)] rounded-[34px] text-[12px] p-2 py-4 hover:underline">Clear Account Defaults</button>
                        <button class="text-white bg-black rounded-[34px] text-[12px] p-2 py-4 hover:underline">Clear Contribution Account</button>
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
const { contributions } = storeToRefs(contributionStore)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const amount = ref<number | null>(null)

const data = {
    labels: months,
    datasets: [
        {
            label: 'Revenue',
            borderColor: '#E66FD2',
            data: [20, 20, 20, 17, 4, 3],
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
</script>