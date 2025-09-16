import axios from "axios";
import Cookies from "js-cookie";

export default function useApi() {
    let config = useRuntimeConfig();
    console.log(config.public);
    

    const api = axios.create({
        baseURL: config.public.apiBaseUrl,
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
