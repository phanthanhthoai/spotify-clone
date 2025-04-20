import axiosInstance from "./axiosInstance";

const albumService = {
     getAllAlbums: async () => {
          const rawResponse = await axiosInstance.get("/album/");
          return rawResponse.data;
     },

     getAlbumById: async (id) => {
          const rawResponse = await axiosInstance.get(`/album/${id}/`);
          return rawResponse.data;
     },

     createAlbum: async (data) => {
          const rawResponse = await axiosInstance.post("/album/", data);
          return rawResponse.data;
     },

     updateAlbum: async (id, data) => {
          const rawResponse = await axiosInstance.put(`/album/${id}/`, data);
          return rawResponse.data;
     },

     deleteAlbum: async (id) => {
          const rawResponse = await axiosInstance.delete(`/album/${id}/`);
          return rawResponse.data;
     }
}