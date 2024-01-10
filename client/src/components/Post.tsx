import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Reactions from "./Reactions";
import {openModal} from "../features/ModalSlice";
import {createComment, createPost, deletePost} from "../features/ApiActions";
import {Accordion, Col, Container} from "react-bootstrap";
import Comment from "./Comment";


const Post = (post: IPost) => {
    const username = useAppSelector(state => state.users.userName);
    const isAuthor = username === post.username;
    const comments = post.comments;
    const [newText, setText] = useState("");

    const formattedDate = new Date(parseInt(post.date as any, 10)).toLocaleString();


    const dispatcher = useAppDispatch();

    function handleDelete() {
        dispatcher(deletePost(post.id));
    }

    function handleEdit() {
        dispatcher(openModal({
            isPost: true, id: post.id, text: post.title,
            isOpen: true
        }));
    }

    function handleAddComment() {
        dispatcher(createComment(post.id, newText, username));
    }

    return (
        <div>
            <div className="post-author">{post.username}</div>
            <div className="post-date">{formattedDate}</div>

            {isAuthor && <div>
                <a className={"edit-butt"} onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}/> Edit</a>
                <a className={"delete-butt"} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/> Delete</a>
            </div>}

            <div className={"post-title"}>{post.title}</div>
            {post.imageSrc && <img src={post.imageSrc} alt="picture attached" className="post-pic"/>}

            <Reactions likes={post.likes} dislikes={post.dislikes} postid={post.id}/>
            {/* todo: add comment component and business logic for listing/adding */}
            <Container>
                <textarea className="newPostInput" placeholder={"Write your comment"} onChange={(e) => setText(e.target.value)}></textarea>
                <button className={"add-post-btn"} onClick={handleAddComment}>Send</button>
            </Container>
            {comments &&<Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body>
                        {comments.map((com) => (
                            <div key={com.id}>
                                <Comment {...com}/>
                            </div>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>}
            </div>
    );
};

export default Post;