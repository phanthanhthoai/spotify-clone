import axiosInstance from "./axiosInstance";

const songService = {
     getAllSongs: async () => {
          const rawResponse = await axiosInstance.get("/song/");
          return rawResponse.data;
     },

     getSongById: async (id) => {
          const rawResponse = await axiosInstance.get(`/song/${id}/`);
          return rawResponse.data;
     },

     createSong: async (data) => {
          const rawResponse = await axiosInstance.post("/song/", data);
          return rawResponse.data;
     },

     updateSong: async (id, data) => {
          const rawResponse = await axiosInstance.put(`/song/${id}/`, data);
          return rawResponse.data;
     },

     deleteSong: async (id) => {
          const rawResponse = await axiosInstance.delete(`/song/${id}/`);
          return rawResponse.data;
     }
}