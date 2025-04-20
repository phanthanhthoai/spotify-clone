import axiosInstance from "./axiosInstance";

const artistService = {
     getAllArtists: async () => {
          const rawResponse = await axiosInstance.get("/artist/");
          return rawResponse.data;
     },

     getArtistById: async (id) => {
          const rawResponse = await axiosInstance.get(`/artist/${id}`);
          return rawResponse.data;
     },

     createArtist: async (data) => {
          const rawResponse = await axiosInstance.post("/artist/", data);
          return rawResponse.data;
     },

     updateArtist: async (id, data) => {
          const rawResponse = await axiosInstance.put(`/artist/${id}`, data);
          return rawResponse.data;
     },

     deleteArtist: async (id) => {
          const rawResponse = await axiosInstance.delete(`/artist/${id}`);
          return rawResponse.data;
     }
}
export default artistService;