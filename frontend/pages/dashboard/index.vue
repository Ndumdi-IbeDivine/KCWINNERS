<template>
    <div>
        <div class="text-[33px] font-bold">Welcome Divine! 👋</div>
        <div class="text-[#747474]">Your wallet update for today!</div>
        <div class="flex mt-3 lg:justify-end">
            <DashboardModal btn-title="Fund Wallet" modal-title="Ready to fund your wallet?">
                <input class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" type="text" name="" id="">
            </DashboardModal>
        </div>

        <div class="mt-[36px]">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/money-bills.svg" alt="">
                        Wallet Balance
                    </div>
                    <div class="text-[33px] font-bold">₦1200</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/eye.svg" alt="">
                        Number of accounts
                    </div>
                    <div class="text-[33px] font-bold">12</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/ticket.svg" alt="">
                        Due Date
                    </div>
                    <div class="text-[33px] font-bold">30th Dec.</div>
                </div>
                <div class="px-8 py-[21px] bg-white rounded-lg">
                    <div class="flex gap-2.5 text-[#747474] font-[16px]">
                        <img src="/images/money-bills.svg" alt="">
                        Total contributions
                    </div>
                    <div class="text-[33px] font-bold">₦1200</div>
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

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
</script>