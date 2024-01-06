import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../app/hooks";
import {deletePostAction} from "../features/UiSlice";

const AuthorsButtons = (data:any) => {
    const dispatcher = useAppDispatch();
    function handleDelete() {
        if (data.title) {
dispatcher(deletePostAction(data.id));
        }
    }

    return (
        <div>
            <a className={"edit-butt"}>
                <FontAwesomeIcon icon={faEdit}/> Edit
            </a>
            <a className={"delete-butt"} onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/> Delete
            </a>
        </div>
    );
};

export default AuthorsButtons;