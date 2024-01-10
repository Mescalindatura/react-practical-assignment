import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import AuthorsButtons from "./AuthorsButtons";
import Reactions from "./Reactions";


const Post = (post:IPost) => {
    const username = useAppSelector(state => state.users.userName);
    const isauthor = username === post.username;
    const comments = post.comments;

    const formattedDate = new Date(parseInt(post.date as any, 10)).toLocaleString();


    const [commentsVisible, setVisible] = useState(false);

    const dispatcher = useAppDispatch();


    function handleAddComment() {

    }

    return (
        <div>
            <div className="post-author">{post.username}</div>
            <div className="post-date">{formattedDate}</div>

            <div>{isauthor&&<AuthorsButtons data/>}
            </div>

            <div className={"post-title"}>{post.title}</div>
            {post.imageSrc && <img src={post.imageSrc} alt="picture attached" className="post-pic"/>}

            <Reactions likes={post.likes} dislikes={post.dislikes} postid={post.id} />
            {/* todo: add comment component and business logic for listing/adding */}
            <div>
                <a>
                    <FontAwesomeIcon icon={faComment}/> Open comments
                </a>
            </div>
        </div>

    );
};

export default Post;