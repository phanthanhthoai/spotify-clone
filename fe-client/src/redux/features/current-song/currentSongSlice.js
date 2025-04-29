import { createSlice } from "@reduxjs/toolkit";
const songInit = {
    id: -1,
    title: "",
    artist: "",
    genre: "",
    release_date: "",
    duration: 240,
    file: "/media/songs/MCK_X_Rhymastic_-_Ng%E1%BB%95n_Ngang_EXTENDED_VERSION_D55ETes.mp3",
    image: "/media/songs/image/mck_OJD5qbp.jpg"
}

const initialState = {
    songId: null,
    song: songInit,
    isPlaying: false,
    currentTime: 0,
    duration: 90
}

export const currentSongSlice = createSlice({
    name: "currentSong",
    initialState,
    reducers: {
        play: (state) => {
            state.songId = 1
        },

        stop: (state) => {
            state.songId = null;
        },

        updateTime: (state, payload) => {
            state.currentTime = payload.payload;
        },

        selectSong: (state, payload) => {
            state.song = payload.payload;
        }

    }
})

export const {play, stop, updateTime, selectSong} = currentSongSlice.actions;
export default currentSongSlice.reducer;