import axiosInstance from "./axiosClient.js";
import {buildPaginationParam} from "../ultis/functions.js";

export const artistService = {
    createArtist: async (data) => {
        const raw = await axiosInstance.postForm(`/artist`, data);
        return raw.data;
    },

    getListArtist: async (queryParam) => {
        const raw = await axiosInstance.get(`/artist?${buildPaginationParam(queryParam)}`);
        return raw.data;
    }
}