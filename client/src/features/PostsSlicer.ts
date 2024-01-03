import {createSlice} from "@reduxjs/toolkit";
import {base_url} from "../utils/constants";

const initialState = {
    userName: "",
    posts: []
};
const postsSlicer = createSlice({
    name: 'posts',
    initialState,
    reducers: {

        getPostsByKeywordAction(state, action) {
            const response = fetch(`${base_url}post/search/${action.payload}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            });
         //   state.posts = response;
        }
    }
});
export const {} = postsSlicer.actions;
export default postsSlicer;