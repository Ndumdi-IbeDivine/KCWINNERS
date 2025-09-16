import { defineStore } from "pinia";
import type { Contribution, TransactionsResponse, Revenue } from '../types/base'
import useApi from "../composables/useApi";
import Cookies from "js-cookie";
import { useAuthStore } from "./useAuthStore";

export const useContribustionsStore = defineStore("contributions", {
    
    state: () => ({
        contributions: [] as Contribution[],
        initContributionLoad: false as boolean,
        monthlyRevenue: [] as Revenue[],
        transactions: {} as TransactionsResponse,
        transactionsLoad: false as boolean
    }),
    
    actions: {
        async getContributions() {
            const api = useApi()
            const authStore = useAuthStore()

            let res = await api.get(`/contributions/${authStore.userProfile?._id}`)
            this.contributions = res.data.data
            this.initContributionLoad = true
        },

        async getMonthlyRevenue() {
            const api = useApi()
            
            let res = await api.get('/wallet/revenue/monthly')
            this.monthlyRevenue = res.data.data
        },

        async getTransactions() {
            const api = useApi()
            
            let res = await api.get('/wallet/transactions')
            this.transactions = res.data
            this.transactionsLoad = true
        }
    }
});