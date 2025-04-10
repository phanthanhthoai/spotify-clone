import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    songId: null
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

    }
})

export const {play, stop} = currentSongSlice.actions;
export default currentSongSlice.reducer;