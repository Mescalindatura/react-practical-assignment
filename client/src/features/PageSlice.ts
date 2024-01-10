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
            state.posts = action.payload;
        },
        updatePagesAction(state, action){
            state.currentPage = action.payload.current;
            state.totalPages = action.payload.total;
        },
        updatePostAction(state, action){
            console.log("slicer is here")
            const updatedPost: IPost = action.payload;
            console.log("post updating started")
            if (updatedPost) {
                const index = state.posts.findIndex((p: IPost) => p.id === updatedPost.id);
                const tempPosts = [...state.posts];
                tempPosts.splice(index, 1, updatedPost);
                state.posts = tempPosts;
            } else {
                console.log("post updating returned null or so")
            }
        },
        deletePostAction(state, action: {payload:IPost}) {
            const postID = action.payload.id;
            if (postID) {
                const index = state.posts.findIndex((p: IPost) => p.id === postID);
                const tempPosts = state.posts;
                tempPosts.splice(index, 1);
                state.posts = tempPosts;
            } else {
                console.log("post removement returned null or so");
            }
        },
        putCommentAction(state, action) {
                const comment: IComment = action.payload;
                if (comment) {
                    const index = state.posts.findIndex((p: IPost) => p.id === comment.postId);
                    const tempComments = state.posts[index].comments;
                    tempComments.push(comment);
                    state.posts[index].comments = tempComments;
                }
                else {
                    console.log("comment creation returned null or so");
                }
        },
        updateCommentAction(state, action) {
            const comment: IComment = action.payload;
            if (comment) {
                const index = state.posts.findIndex((p: IPost) => p.id === comment.postId);
                const i = state.posts[index].comments.findIndex((c: IComment) => c.id === comment.id);
                const tempPosts = state.posts;
                tempPosts[index].comments.splice(i, 1, comment);
                state.posts = tempPosts;
            }
            else {
                console.log("comment creation returned null");
            }
        }

    }
});


export const {
    updatePostAction,
    putPostsAction,
    updatePagesAction,
    putCommentAction,
    updateCommentAction} = pageSlice.actions;
export default pageSlice.reducer;