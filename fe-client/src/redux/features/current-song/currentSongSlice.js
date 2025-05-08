import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    song: null,
    isPlaying: false,
    currentTime: 0,
    duration: 90
}

export const currentSongSlice = createSlice({
    name: "currentSong",
    initialState,
    reducers: {
        play: (state) => {
            state.isPlaying = true;
        },

        stop: (state) => {
            state.isPlaying = false;
        },

        updateTime: (state, payload) => {
            console.log("update time: ", payload.payload)
            state.currentTime = payload.payload;
        },

        selectSong: (state, payload) => {
            console.log("select song");
            state.song = payload.payload;
            state.currentTime = 0;
            state.duration = payload.payload.duration;
            state.isPlaying = true;
        },

        pause: (state) => {
            state.isPlaying = false;
        }

    }
})

export const {play, stop, updateTime, selectSong, pause} = currentSongSlice.actions;
export default currentSongSlice.reducer;