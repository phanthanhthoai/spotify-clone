import axiosInstance from "./axiosClient.js";
import {buildPaginationParam} from "../ultis/functions.js";

const userService = {
    getListUser: async (queryParam) => {
        const raw = await axiosInstance.get("/user?" + buildPaginationParam(queryParam));
        return raw.data;
    },

    createUser: async (data) => {
        const raw = await axiosInstance.post('/user', data);
        return raw.data;
    },

    deleteUser: async (id) => {
        const raw = await axiosInstance.delete(`/user/${id}`);
        return raw.data;
    },

    getUser: async (id) => {
        const raw = await axiosInstance.get(`/user/${id}`);
        return raw.data;
    },

    updateUser: async (id, data) => {
        const raw = await axiosInstance.put(`/user/${id}`, data);
        return raw.data;
    }
}

export default userService;