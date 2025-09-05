import axios from "axios";
import Cookies from "js-cookie";

export default function useApi() {
    let config = useRuntimeConfig();

    const api = axios.create({
        baseURL: config.public.apiBaseUrl, // Use the API base URL from the runtime config
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    api.interceptors.request.use(
        (config) => {
            const token = Cookies.get("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
}
