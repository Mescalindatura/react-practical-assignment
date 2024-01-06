import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faEdit, faThumbsDown, faThumbsUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import AuthorsButtons from "./AuthorsButtons";
import Reactions from "./Reactions";


const Post = (data: IPost) => {
    const username = useAppSelector(state => state.users.userName);
    const author = username === data.username;
    const comments = data.comments;

    const formattedDate = new Date(parseInt(data.date as any, 10)).toLocaleString();


    const [commentsVisible, setVisible] = useState(false);

    const dispatcher = useAppDispatch();


    function handleAddComment() {

    }

    return (
        <div>
            <div className="post-author">{data.username}</div>
            <div className="post-date">{formattedDate}</div>

            <div>{author&&<AuthorsButtons data/>}
            </div>

            <h4 className={"post-title"}>{data.title}</h4>
            {data.imageSrc && <img src={data.imageSrc} alt="picture attached" className="post-pic"/>}

            <Reactions likes={data.likes} dislikes={data.dislikes} postid={data.id} />
            {/* todo: add comment component and business logic for listing/adding */}
            <div>
                <button onClick={handleAddComment}>
                    <FontAwesomeIcon icon={faComment}/> Read comments
                </button>
                <button onClick={handleAddComment}>
                    <FontAwesomeIcon icon={faComment}/> Add comment
                </button>
            </div>
        </div>

    );
};

export default Post;