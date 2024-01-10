import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Reactions from "./Reactions";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {deleteComment, deletePost} from "../features/ApiActions";
import {openModal} from "../features/ModalSlice";

const Comment: React.FC<IComment> = (comment) => {
    const username = useAppSelector(state => state.users.userName);
    const isAuthor = username === comment.username;
    const dispatcher = useAppDispatch();

    const formattedDate = new Date(parseInt(comment.date as any, 10)).toLocaleString();

    function handleDelete() {
        dispatcher(deleteComment(comment.id));
    }

    function handleEdit() {

        dispatcher(openModal({
            isPost: false,
            postId: comment.postId,
            text: comment.text,
            commentid: comment.id,
            likes: comment.likes,
            dislikes: comment.dislikes
        }));
    }

    return (
        <div>
            <div className="post-author">{comment.username}</div>
            <div className="post-date">{formattedDate}</div>

            {isAuthor && <div>
                <a className={"edit-butt"} onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}/> Edit</a>
                <a className={"delete-butt"} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/> Delete</a>
            </div>}
            <Reactions likes={comment.likes}
                       dislikes={comment.dislikes}
                       postid={comment.postId}
                       commentid={comment.id}/>
            <div className={"post-title"}>{comment.text}</div>


        </div>
    );
};

export default Comment;