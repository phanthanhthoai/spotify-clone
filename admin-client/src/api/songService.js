import axiosInstance from "./axiosClient.js";
import {buildPaginationParam} from "../ultis/functions.js";


const SongService = {
    createSong: async (data) => {
        const raw = await axiosInstance.postForm('/song', data);
        return raw.data;
    },
    deleteSong: async (id) => {
        const raw = await axiosInstance.delete(`/song/${id}`);
        return raw.data;
    },
    getSong: async (id) => {
        const raw = await axiosInstance.get(`/song/${id}`);
        return raw.data;
    },
    getAllSongs: async (queryParam) => {
        const raw = await axiosInstance.get("/song?" + buildPaginationParam(queryParam));
        return raw.data;
    },
    updateSong: async (id, data) => {
        const raw = await axiosInstance.putForm(`/song/${id}`, data);
        return raw.data;
    },
}

export default SongService;