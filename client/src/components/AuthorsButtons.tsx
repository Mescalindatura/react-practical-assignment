import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../app/hooks";
import {deleteComment, deletePost} from "../features/ApiActions";

const AuthorsButtons = (data: any) => {
    const dispatcher = useAppDispatch();

    function handleDelete() {
        if (data.title) {
            dispatcher(deletePost(data.id));
        } else if (data.text) {
            dispatcher(deleteComment(data.id));
        }
    }

    function handleEdit() {

    }

    return (
        <div>
            <a className={"edit-butt"} onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit}/> Edit
            </a>
            <a className={"delete-butt"} onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/> Delete
            </a>
        </div>
    );
};

export default AuthorsButtons;