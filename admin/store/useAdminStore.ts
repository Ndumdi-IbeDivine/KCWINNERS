import { defineStore } from "pinia";
import type { User } from "../types/base";
import useApi from "../composables/useApi";
import Cookies from "js-cookie";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        isInitLoaded: false,
        users: null as null | {
            count: number;
            currentPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
            success: boolean;
            total: number;
            totalPages: number;
            users: User[];
        },
        pendingRegistrations: null as null | any,
        clearedUsers: null as null | any,
    }),

    actions: {
        async init() {
            await this.getPendingRegistrations();
            await this.getClearedUsers();
            await this.getUsers();

            this.isInitLoaded = true;
        },
        async getPendingRegistrations() {
            const api = useApi();
            const token = Cookies.get("token");

            try {
                const res = await api.get("/admin/pending-registrations", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(res);
                this.pendingRegistrations = res.data;
                this.isInitLoaded = true;
                // this.setIsAuthenticated(res.data.success);
                // if (res.data.success) {
                //     this.setUserProfile(res.data.user);
                // } else {
                //     this.setUserProfile(null);
                // }
            } catch (error) {
                // this.setIsAuthenticated(false);
                // this.setUserProfile(null);
            }
        },

        async getClearedUsers(page = 1) {
            const api = useApi();
            const token = Cookies.get("token");

            try {
                const res = await api.get(`/admin/cleared-users?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.clearedUsers = res.data;
                console.log(res);
            } catch (error) {
                // this.setIsAuthenticated(false);
                // this.setUserProfile(null);
            }
        },

        async getUsers(page = 1) {
            const api = useApi();
            const token = Cookies.get("token");

            try {
                const res = await api.get(`/admin/users?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.users = res.data;
                console.log(res);
            } catch (error) {
                // this.setIsAuthenticated(false);
                // this.setUserProfile(null);
            }
        },
        // async getProfile() {
        //     const api = useApi()

        //     try {
        //         const res = await api.get(`users/${this.userProfile?._id}`)
        //         this.userProfile = res.data.data
        //     } catch (error) {

        //     }
        // },
        // logout() {
        //     Cookies.remove('token');
        //     this.setUserProfile(null);
        //     this.setIsAuthenticated(false);
        // }
    },
});
