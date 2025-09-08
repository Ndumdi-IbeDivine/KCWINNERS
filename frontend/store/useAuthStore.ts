import { defineStore } from "pinia";
import type { User } from '../types/base'
import useApi from "../composables/useApi";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
    
    state: () => ({
        isAuthenticated: false as boolean,
        userProfile: null as null | User,
    }),
    
    actions: {
        setIsAuthenticated(isAuth: boolean) {
            this.isAuthenticated = isAuth
        },
        setUserProfile(user: null | User) {
            this.userProfile = user
        },
        async checkAuth(){
            const api = useApi();
            const token = Cookies.get('token')

            try {
                const res = await api.get("/auth/check", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.setIsAuthenticated(res.data.success);
                if (res.data.success) {
                    this.setUserProfile(res.data.user);
                } else {
                    this.setUserProfile(null);
                }
            } catch (error) {
                this.setIsAuthenticated(false);
                this.setUserProfile(null);
            }
        },
        async getProfile() {
            const api = useApi()
            
            try {
                const res = await api.get(`users/${this.userProfile?._id}`)
                this.userProfile = res.data.data
            } catch (error) {
                
            }
        },
        logout() {            
            Cookies.remove('token');
            this.setUserProfile(null);
            this.setIsAuthenticated(false);
        }
    }
});