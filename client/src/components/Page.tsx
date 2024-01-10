import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createPost, getPostsByPage } from "../features/ApiActions";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Paginator from "./Paginator";
import Post from "./Post";

const Page = () => {
    const dispatcher = useAppDispatch();
    const posts = useAppSelector(state => state.page.posts);
    const username = useAppSelector(state => state.users.userName);
    const [newTitle, setTitle] = useState("");

    useEffect(() => {
        dispatcher(getPostsByPage(1));
    }, [dispatcher]);

    const handleAdding = () => {
        dispatcher(createPost(newTitle, username));
    }

    return (
        <div>
            <Header />
            <Container className="my-3 d-flex justify-content-center">
                    <textarea className="newPostInput" onChange={(e) => setTitle(e.target.value)}></textarea>
                    <button className={"add-post-btn"} onClick={handleAdding}>Add new post</button>
            </Container>

            <Container>
                <Row xs={1} md={3} className="g-4">
                    {posts.map((post) => (
                        <Col key={post.id}>
                            <Post {...post} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <div className="my-3 d-flex justify-content-center">
                <Paginator />
            </div>
        </div>
    );
};

export default Page;