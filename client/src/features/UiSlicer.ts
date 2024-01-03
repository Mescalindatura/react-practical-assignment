import {createSlice} from "@reduxjs/toolkit";
import {base_url} from "../utils/constants";

const initialState = {
    userName: ""
};
const uiSlicer = createSlice({
    name: 'ui actions',
    initialState,
    reducers: {
addLikeAction (state, action) {

},
        addDislikeAction (state, action) {

        }
    }
});
export const {addLikeAction, addDislikeAction} = uiSlicer.actions;
export default uiSlicer;