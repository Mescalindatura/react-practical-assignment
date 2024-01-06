import {createSlice} from "@reduxjs/toolkit";
import {base_url} from "../utils/constants";

const initialState: IState = {
    username: "",
    posts: [],
    currentPage: 1,
    totalPages: 1
};

const pageSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        putPostsAction(state, action) {
            console.log("slicer is here", ...action.payload);
            state.posts = action.payload;
        },
        updatePagesAction(state, action){
            state.currentPage = action.payload.current;
            state.totalPages = action.payload.total;
        },
        updatePostAction(state, action){
            const updatedPost: IPost = action.payload;
            const updatedPosts: IPost[] = [...state.posts];
            const index = updatedPosts.findIndex((p: IPost) => p.id === updatedPost.id);

            if (index !== -1) {
                updatedPosts[index] = updatedPost;
            }
           state.posts = updatedPosts;
        }
    }
});


export const {updatePostAction, putPostsAction, updatePagesAction} = pageSlice.actions;
export default pageSlice.reducer;