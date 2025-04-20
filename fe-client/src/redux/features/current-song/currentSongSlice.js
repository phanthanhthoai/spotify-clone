import {createSlice} from "@reduxjs/toolkit";
const songTemp = {
    title: "Tháp Drill Tự do",
    artist: "MCK",
    file: "src/assets/tháp_drill_tự_do_-_mck_prod_gaz.mp3",
    image: "src/assets/mck.jpeg"
}

const initialState = {
    songId: null,
    song: songTemp,
    isPlaying: false
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