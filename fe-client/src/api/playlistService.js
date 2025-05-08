import axiosInstance from "./axiosInstance";

const playlistService = {
     getAllPlaylists: async () => {
          const rawResponse = await axiosInstance.get("/playlist/?page=1&size=1000");
          return rawResponse.data;
     },
     getPlaylistById: async (id) => {
          const rawResponse = await axiosInstance.get(`/playlist/${id}`);
          return rawResponse.data;
     },
     updatePlaylist: async (id, data) => {
          const rawResponse = await axiosInstance.put(`/playlist/${id}`, data);
          return rawResponse.data;
     },
     getPlaylistByUser: async () => {
          const rawResponse = await axiosInstance.get(`/playlist/my-playlists/`);
          return rawResponse.data;
     },
     
     createPlaylist: async (playlistData) => {
          const rawResponse = await axiosInstance.post("/playlists", playlistData);
          return rawResponse.data;
     },
     
     deletePlaylist: async (playlistId) => {
          const rawResponse = await axiosInstance.delete(`/playlists/${playlistId}`);
          return rawResponse.data;
     },

}
export default playlistService;