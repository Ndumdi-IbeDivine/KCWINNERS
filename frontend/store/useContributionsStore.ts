import { defineStore } from "pinia";
import type { Contribution } from '../types/base'
import useApi from "../composables/useApi";
import Cookies from "js-cookie";
import { useAuthStore } from "./useAuthStore";

export const useContribustionsStore = defineStore("contributions", {
    
    state: () => ({
        contributions: [] as Contribution[],
        initContributionLoad: false as boolean,
        monthlyRevenue: [] as [],
        transactions: [] as []
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
            console.log(res)
        },

        async getTransactions() {
            const api = useApi()
            
            let res = await api.get('/wallet/transactions')
            console.log(res)
        }
    }
});