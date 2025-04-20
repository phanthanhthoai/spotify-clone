import axios from "axios";
import {baseApiUrl} from "../utils/constants.js";

const axiosInstance = axios.create({
    baseURL: baseApiUrl,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },

    error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status === 401) {
            //redirect login
            window.location.href = "/auth"
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;