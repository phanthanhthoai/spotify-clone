import axiosInstance from "./axiosClient.js";

export const SongService = {
    createSong: async (data) => {
        const raw = await axiosInstance.postForm('/song', data);
        return raw.data;
    }
}