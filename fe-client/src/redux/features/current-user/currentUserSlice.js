import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        update: (state, action) => {
            console.log(action);
            state.user = action.payload;
        }
    }
})

export const {update} = currentUserSlice.actions;
export default currentUserSlice.reducer;