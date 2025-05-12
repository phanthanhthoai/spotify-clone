import axiosInstance from "./axiosInstance";

const playlistService = {
     getAllPlaylists: async () => {
          const rawResponse = await axiosInstance.get("/playlist?page=1&size=1000");
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
          const rawResponse = await axiosInstance.post("/playlist", playlistData);
          return rawResponse.data;
     },
     
     deletePlaylist: async (playlistId) => {
          const rawResponse = await axiosInstance.delete(`/playlist/${playlistId}`);
          return rawResponse.data;
     },

     getPlaylistByCode: async (code) => {
          const rawResponse = await axiosInstance.get(`/playlist/${code}`);
          return rawResponse.data;
     },

     getSongsInPlaylist: async (playlistId) => {
          const rawResponse = await axiosInstance.get(`/playlist/${playlistId}/songs`);
          return rawResponse.data;
     },

     addSongToPlaylist: async (playlistId, songId) => {
          const rawResponse = await axiosInstance.post(`/playlist/${playlistId}/add-song/${songId}`);
          return rawResponse.data;
     }
}

export default playlistService;