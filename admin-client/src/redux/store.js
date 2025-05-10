import {configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice.js";

export const store = configureStore({
    reducer: {
        auth: AuthSlice
    }
})