import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getPostsByPage} from "../features/ApiActions";
import {Container, Row, Col, Form} from "react-bootstrap";
import Header from "./Header";
import Paginator from "./Paginator";
import Post from "./Post";
import {openModal} from "../features/ModalSlice";

const Page = () => {
    const dispatcher = useAppDispatch();
    const posts = useAppSelector(state => state.page.posts);


    useEffect(() => {
        dispatcher(getPostsByPage(1));
    }, [dispatcher]);

    function handleTextareaClick() {
        dispatcher(openModal({
            isPost: true, id: 0, text: "",
            isOpen: true,
        }));
    }

    return (
        <div>
            <Header />
            <Container fluid className="my-3">
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        className="newPostInput"
                        onClick={handleTextareaClick}
                        placeholder="Write new post"
                    />
                </Form.Group>
            </Container>
            {posts.length > 0 ? (
                <Container fluid>
                    <Row className="g-4">
                        {[0, 1, 2].map(colIndex => (
                            <Col key={colIndex} xs={12} md={6} lg={4}>
                                {posts
                                    .filter((_, index) => index % 3 === colIndex)
                                    .map((post, postIndex) => (
                                        <div key={postIndex} className={"mb-4"}>
                                            <Post post={post} />
                                        </div>
                                    ))}
                            </Col>
                        ))}
                    </Row>
                </Container>
            ) : (
                <div className="text-center my-4">
                    <p>No posts found</p>
                </div>
            )}
            <div className="my-3 d-flex justify-content-center">
                <Paginator />
            </div>
        </div>
    );
};

export default Page;