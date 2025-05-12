import axiosInstance from "./axiosClient.js";
import {buildPaginationParam} from "../ultis/functions.js";

export const albumService = {
    createAlbum: async (data) => {
        const raw = await axiosInstance.postForm(`/album`, data);
        return raw.data;
    },

    getListAlbum: async (queryParam) => {
        const raw = await axiosInstance.get(`/album?${buildPaginationParam(queryParam)}`);
        return raw.data;
    },

    getAlbum: async (id) => {
        const raw = await axiosInstance.get(`/album/${id}`);
        return raw.data;
    },

    getSongInAlbum: async (id) => {
        const raw = await axiosInstance.get(`/album/${id}/songs`);
        return raw.data;
    },

    addSong: async (albumId, songId) => {
        const raw = await axiosInstance.post(`/album/${albumId}/add-song/${songId}`);
        return raw.data;
    },

    removeSong: async (albumId, songId) => {
        const raw = await axiosInstance.post(`/album/${albumId}/remove-song/${songId}`);
        return raw.data;
    }
}