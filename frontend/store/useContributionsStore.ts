import { defineStore } from "pinia";
import type { Contribution } from '../types/base'
import useApi from "../composables/useApi";
import Cookies from "js-cookie";
import { useAuthStore } from "./useAuthStore";

export const useContribustionsStore = defineStore("contributions", {
    
    state: () => ({
        contributions: [] as Contribution[],
    }),
    
    actions: {
        async getContributions() {
            const api = useApi()
            const authStore = useAuthStore()

            let res = await api.get(`/contributions/${authStore.userProfile?._id}`)
            this.contributions = res.data.data
        }
    }
});