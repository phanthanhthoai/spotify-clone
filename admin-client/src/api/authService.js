import axiosInstance from "./axiosClient.js";


const authService = {
    login: async (data) => {
        const rawResponse = await axiosInstance.post("/auth/login", data);
        return rawResponse.data;
    },

    profile: async () => {
        const rawResponse = await axiosInstance.get("/auth/profile");
        return rawResponse.data;
    },

    logout: async () => {
        const rawResponse = await axiosInstance.post("/auth/logout");
        return rawResponse.data;
    },
}

export default authService;