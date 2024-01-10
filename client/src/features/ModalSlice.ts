import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    content: {
        isPost: false,
        postId: 0,
        text: "",
        commentId: -1,
        likes: [],
        dislikes: []
    },
    isOpen: false
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal (state, action) {
            state.isOpen = true;
            state.content.isPost = action.payload.isPost;
            state.content.text = action.payload.text;
            state.content.postId = action.payload.id;
            if(action.payload.commentid) {
                state.content.commentId = action.payload.commentid
            }
            console.log(state.isOpen)
        },
        closeModal (state) {
            state.isOpen = false;
            state.content = {
                isPost: false, postId: 0, text: "",
                commentId: -1, likes: [], dislikes: []
            }
        },
    },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;