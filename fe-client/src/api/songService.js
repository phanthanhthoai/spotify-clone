import axiosInstance from "./axiosInstance";

const songService = {
     getAllSongs: async () => {
          const rawResponse = await axiosInstance.get("/songs/");
          return rawResponse.data;
     },

     getSongById: async (id) => {
          const rawResponse = await axiosInstance.get(`/songs/${id}/`);
          return rawResponse.data;
     },

     createSong: async (data) => {
          const rawResponse = await axiosInstance.post("/songs/", data);
          return rawResponse.data;
     },

     updateSong: async (id, data) => {
          const rawResponse = await axiosInstance.put(`/songs/${id}/`, data);
          return rawResponse.data;
     },

     deleteSong: async (id) => {
          const rawResponse = await axiosInstance.delete(`/songs/${id}/`);
          return rawResponse.data;
     }
}