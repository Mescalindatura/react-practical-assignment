import {createSlice} from "@reduxjs/toolkit";
import {base_url} from "../utils/constants";
import PostsSlice, {updatePostAction} from "./PageSlice";

const initialState = {
    username: ""
};
const uiSlice = createSlice({
    name: 'ui actions',
    initialState,
    reducers: {
        putPostRatingAction(state, action) {
            const post = {
                "likes": action.payload.likes,
                "dislikes": action.payload.dislikes
            }
            fetch(`${base_url}/post/${action.payload.postid}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(post)
            })
                .then(response => {
                    if (response.status === 200)
                        return response.json()
                    else
                        throw new Error(response.statusText)
                })
                .then(data => updatePostAction(data))
                .catch(error => console.log(error.message));
        },
        deletePostAction(state, action){
            fetch(`${base_url}/post/${action.payload.id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
                .then(response => {
                    if (response.status === 200)
                        return response.json()
                    else
                        throw new Error(response.statusText)
                })
        },
    }
    });


export const {putPostRatingAction, deletePostAction} = uiSlice.actions;
export default uiSlice.reducer;