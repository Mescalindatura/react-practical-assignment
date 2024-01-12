import {base_url} from "../utils/constants";
import {AppDispatch} from "../app/store";
import {
    deleteCommentAction,
    errorPageAction,
    putCommentAction,
    putPostsAction,
    updateCommentAction,
    updatePagesAction,
    updatePostAction
} from "./PageSlice";
import {updateImgSrc} from "./ModalSlice";

export const getPostsByPage = (page: number) => {
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
            .catch(error => {
                console.log(error.message);
                dispatch(errorPageAction());
            });
    }
}

export const getPostsByKeyword = (keyword: string) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/post/search/${keyword}`)
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            dispatch(putPostsAction(data.result));
            dispatch(updatePagesAction({current: 1, total: 1}));
        })
            .catch(error => {
                console.log(error.message);
                dispatch(errorPageAction());
            });
    }
}
export const createPost = (title: string, username: string) => {
    return (dispatch: AppDispatch) => {
        const post = {
            "title": title,
            "username": username
        }
        fetch(`${base_url}/post/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            dispatch(getPostsByPage(1))
        })
            .catch(error => {
                console.log(error.message);
                dispatch(errorPageAction());
            });
    }
}

export const uploadPicture = (id: number, file: File) => {
    return (dispatch: AppDispatch) => {
        console.log("upload started")
        const formData = new FormData();
        formData.append('picture', file);
        console.log("data appended")
        fetch(`${base_url}/post/${id}/picture`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: formData,
            mode: 'no-cors'
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.statusText)
                    return response.json()
                } else {
                    console.log(response.statusText)
                    throw new Error(response.statusText)
                }
            }).then(data => {
            dispatch(updatePostAction(data.result));
        }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}
export const updatePost = (postId: number, title: string) => {
    return (dispatch: AppDispatch) => {
        const post = {
            "title": title
        }
        fetch(`${base_url}/post/${postId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            }).then(data => {
            console.log("this is updated post: " + data.result.id);
            dispatch(updatePostAction(data.result));
        }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}

export const updatePostRating = (likes: string[], dislikes: string[], postId: number) => {
    return (dispatch: AppDispatch) => {
        const post = {
            "likes": likes,
            "dislikes": dislikes
        }
        fetch(`${base_url}/post/${postId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else
                    throw new Error(response.statusText)
            })
            .then((data) => {
                console.log(data.result.id);
                dispatch(updatePostAction(data.result));
            })
            .catch(error => {
                console.log(error.message);
                dispatch(errorPageAction());
            });
    }
}

export const deletePost = (id: number) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/post/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            })
            .then(data => {
                dispatch(getPostsByPage(1))
            }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}
export const createComment = (postId: number, text: string, username: string) => {
    return (dispatch: AppDispatch) => {
        const comment = {
            "text": text,
            "postId": postId,
            "username": username
        }
        console.log("post id transfered to api: " + comment.postId);
        fetch(`${base_url}/comment/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comment)
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            })
            .then(data => {
                console.log(data.result.text);
                dispatch(putCommentAction(data.result));
            }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}

export const updateComment = (id: number, text: string, likes: [string], dislikes: []) => {
    return (dispatch: AppDispatch) => {
        const comment = {
            "text": text,
            "likes": likes,
            "dislikes": dislikes
        }
        fetch(`${base_url}/comment/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comment)
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            })
            .then(data => {
                dispatch(updateCommentAction(data.result));
            }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}

export const deleteComment = (id: number) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/comment/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.statusText)
            })
            .then(data => {
                dispatch(deleteCommentAction(data.result))
            }).catch(error => {
            console.log(error.message);
            dispatch(errorPageAction());
        })
    }
}
//todo: think about what to perform after deleting comment

