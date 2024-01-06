import {createSlice} from "@reduxjs/toolkit";
import {base_url} from "../utils/constants";

const initialState = {
    isLoggedIn: false,
    userName: ""
};
const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logInAction(state, action) {
            state.userName = action.payload;
            state.isLoggedIn = true;
        },
        logOutAction(state) {
            state.userName = "";
            state.isLoggedIn = false;
        },
    }
});
export const {logInAction, logOutAction} = authSlice.actions;
export default authSlice.reducer;