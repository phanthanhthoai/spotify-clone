import axiosInstance from "./axiosInstance.js";

const authService = {
    login: async (data) => {
        const rawResponse = await axiosInstance.post("/auth/login", data);
        return rawResponse.data;
    },

    register: async (data) => {
        const rawResponse = await axiosInstance.post("auth/register", data);
        return rawResponse.data;
    },

    profile: async () => {
        const rawResponse = await axiosInstance.get("auth/profile");
        return rawResponse.data;
    }
}

export default authService;