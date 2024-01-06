import {base_url, pagination_size} from "../utils/constants";
import {AppDispatch} from "../app/store";
import {putPostsAction, updatePagesAction} from "./PageSlice";

export const getPostsByPage = (page) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/post/page/${page}`)
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            dispatch(putPostsAction(data.result))
            dispatch(updatePagesAction({current: data.page, total: data.totalPages}))
        })
            .catch(error => console.log(error.message));
    }
}

export const getPostsByKeyword = (keyword) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/post/search/${keyword}`)
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            dispatch(putPostsAction(data.result))
            //       const total = data.result.length/pagination_size;
            //todo: make clear the paginator task 'cos now it is supposed to implement pagination only for pages fetch
        })
            .catch(error => console.log(error.message));
    }
}
export const createPost = (payload) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/post/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            dispatch(getPostsByPage(1))
        })
            .catch(error => console.log(error.message));
    }

}