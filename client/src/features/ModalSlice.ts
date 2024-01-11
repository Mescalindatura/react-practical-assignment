import {createSlice} from "@reduxjs/toolkit";
import {useAppSelector} from "../app/hooks";
import {logInAction} from "./AuthSlice";

const initialState = {
    content: {
        isPost: false,
        postId: 0,
        text: "",
        commentId: -1,
        likes: [],
        dislikes: [],
        imgSrc: ""
    },
    isOpen: false
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal(state, action) {
            state.isOpen = true;
            state.content.isPost = action.payload.isPost;
            state.content.text = action.payload.text;
            state.content.postId = action.payload.id;
            state.content.imgSrc = action.payload.imgSrc;
            if (action.payload.commentid) {
                state.content.commentId = action.payload.commentid
            }
            console.log(state.isOpen)
        },
        updateImgSrc(state, action) {
            state.content.imgSrc=action.payload.imgSrc;
            console.log("img source updated: "+ action.payload.imgSrc);
        },
        closeModal(state) {
            state.isOpen = false;
            state.content = {
                isPost: false, postId: 0, text: "",
                commentId: -1, likes: [], dislikes: [], imgSrc: ""
            }
        },
    },
});

export const {openModal, closeModal, updateImgSrc} = modalSlice.actions;
export default modalSlice.reducer;