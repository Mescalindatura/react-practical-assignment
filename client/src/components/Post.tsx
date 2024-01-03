import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faEdit, faThumbsDown, faThumbsUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {addDislikeAction, addLikeAction} from "../features/UiSlicer";


const Post = (data: IPost) => {
    const username = useAppSelector(state => state.users.userName);
    const author = username === data.username;
    const reactions = data.likes.length - data.dislikes.length;

    const formattedDate = new Date(parseInt(data.date as any, 10)).toLocaleString();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const dispatcher = useAppDispatch();

    function handleLike() {
        setLiked(prevLiked => {
            if (prevLiked) {
                const indexToRemove = data.likes.indexOf(username);
                if (indexToRemove !== -1) {
                    data.likes.splice(indexToRemove, 1);
                }
            } else {
                data.likes.push(username);
            }
            dispatcher(addLikeAction({id: data.id, likes: data.likes}));
            return !prevLiked;
        });
    }

    function handleDislike() {
        setDisliked(prev => {
            if (prev) {
                const indexToRemove = data.dislikes.indexOf(username);
                if (indexToRemove !== -1) {
                    data.dislikes.splice(indexToRemove, 1);
                }
            } else {
                data.dislikes.push(username);
            }
            dispatcher(addDislikeAction({id: data.id, dislikes: data.dislikes}));
            return !prev;
        });
    }

    function handleAddComment() {

    }

    return (
        <div>
            <div className="post-author">{data.username}</div>
            <div className="post-date">{formattedDate}</div>

            <button disabled={!author}>
                <FontAwesomeIcon icon={faEdit}/> Edit post
            </button>
            <button disabled={!author}>
                <FontAwesomeIcon icon={faTrash}/> Delete post
            </button>

            <h4 className={"post-title"}>{data.title}</h4>
            {data.imageSrc && <img src={data.imageSrc} alt="picture attached" className="post-pic"/>}

            <div className="post-reactions">
                <button onClick={handleLike}
                        disabled={disliked}>
                    <FontAwesomeIcon icon={faThumbsUp}/>
                </button>
                <span className={"reactions-count"}>{reactions}</span>
                <button onClick={handleDislike} disabled={liked}>
                    <FontAwesomeIcon icon={faThumbsDown}/>
                </button>
            </div>
            {/* todo: add comment component and business logic for listing/adding */}
            <button onClick={handleAddComment}>
                <FontAwesomeIcon icon={faComment}/> Add comment
            </button>

        </div>
    );
};

export default Post;