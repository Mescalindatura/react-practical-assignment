import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   isLoggedIn : false,
    userName: "",
    posts: []
};
const postsSlicer = createSlice({
        name: 'posts',
    initialState,
    reducers: {
            logInAction(state, action){
              state.userName = action.payload;
              state.isLoggedIn = true;
          },
        logOutAction(state){
            state.userName = "";
            state.isLoggedIn = false;
        },
getPostsByKeywordAction(state, action) {

}
    }
    }
);
export const {logInAction, logOutAction}  = postsSlicer.actions;
export default postsSlicer.reducer;