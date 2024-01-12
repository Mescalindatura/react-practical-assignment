import React, {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {Button, Form, Modal} from "react-bootstrap";
import {closeModal} from "../features/ModalSlice";
import {createComment, createPost, updateComment, updatePost, uploadPicture} from "../features/ApiActions";
import ImageUploader from "./ImageUploader";

const AddEditModal = () => {
    const props = useAppSelector(state => state.modal.content);
    const username = useAppSelector(state => state.users.userName);

    const modalIsOpen = useAppSelector(state => state.modal.isOpen);
    const dispatcher = useAppDispatch();
    const [updatedText, setText] = useState(props.text);
    const [imgSrc, setImgSrc] = useState(props.imgSrc);

    function handleSave() {
        if (props.isPost && props.text) {
            dispatcher(updatePost(props.postId, updatedText));
        } else if (props.isPost) {
            dispatcher(createPost(username, updatedText));
        } else if (!props.text) {
            dispatcher(createComment(props.postId, updatedText, username));
        } else {
            // @ts-ignore
            dispatcher(updateComment(props.commentId, updatedText, props.likes, props.dislikes))
        }
        dispatcher(closeModal());
    }

    return (
        <Modal show={modalIsOpen} onHide={() => dispatcher(closeModal())}>
            <Modal.Header closeButton>
                <Modal.Title>The world is waiting for your opinion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} value={updatedText}
                                      onChange={(e) => setText(e.target.value)}/>
                        {props.text && <>{imgSrc &&
                            <img src={imgSrc} alt="picture attached" className="post-pic"
                                 style={{width: '100%'}}/>}
                            {props.isPost && <ImageUploader postId={props.postId}
                            />}</>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={"save-btn"} onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditModal;