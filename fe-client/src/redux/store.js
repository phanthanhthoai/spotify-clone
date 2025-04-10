import {configureStore} from "@reduxjs/toolkit";
import testReducer from "./features/test/testSlice.js"
import currentSongReducer from "./features/current-song/currentSongSlice.js"
export const store = configureStore({
    reducer: {
        test: testReducer,
        currentSong: currentSongReducer
    }
})