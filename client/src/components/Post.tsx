import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Reactions from "./Reactions";
import {openModal} from "../features/ModalSlice";
import {createComment, createPost, deletePost} from "../features/ApiActions";
import {Accordion, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Comment from "./Comment";
import React from "react";

interface PostProps {
    post:IPost
}
const Post: React.FC<PostProps> = ({post}) => {
    const username = useAppSelector(state => state.users.userName);
    const isAuthor = username === post.username;
    const dispatcher = useAppDispatch();

    const formattedDate = new Date(parseInt(post.date as any, 10)).toLocaleString();

    function handleDelete() {
        dispatcher(deletePost(post.id));
    }

    function handleEdit() {
        dispatcher(openModal({
            isPost: true, id: post.id, text: post.title,
            isOpen: true, imgSrc: post.imageSrc
        }));
    }

    function handleAddComment() {
        dispatcher(openModal({
            isPost: false, id: post.id, text: "",
            isOpen: true,
        }));
    }

    return (
        <div className="d-flex flex-column h-100">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{formattedDate}</Card.Subtitle>
                    <Card.Title>  {post.title}</Card.Title>
                    {isAuthor && <div>
                        <a className={"edit-butt"} onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit}/> Edit</a>
                        <a className={"delete-butt"} onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash}/> Delete</a>
                    </div>}
                    <Card.Text>
                     Posted by: {post.username}
                    </Card.Text>
                    {post.imageSrc &&
                        <img src={post.imageSrc} alt="picture attached" className="post-pic" style={{width: '100%'}}/>}

                    <Row className="mt-3 d-flex justify-content-between align-items-center">
                        <Col xs="auto">
                            <Reactions likes={post.likes} dislikes={post.dislikes} postid={post.id} />
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-primary" size="sm" onClick={handleAddComment}>
                                Add comment
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Accordion>
                        {post.comments.length>0?
                            <Accordion.Item eventKey="0">
                            <Accordion.Header>Comments</Accordion.Header>
                            <Accordion.Body>
                                {post.comments.map((com) => (
                                    <div key={com.id} className="mb-3">
                                        <Comment {...com}/>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>: <div className="text-center my-4">
                                <p>No comments yet</p>
                            </div>}
                    </Accordion>
                </Card.Footer>

            </Card>
        </div>
    );
};

export default Post;