import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateCurrentUser: state => (param) => {
            state.currentUser = param.payload;
        }
    }
})

export const {updateCurrentUser} = authSlice.actions;
export default authSlice.reducer;