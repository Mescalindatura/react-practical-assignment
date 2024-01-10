import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form, Modal} from "react-bootstrap";
import {closeModal} from "../features/ModalSlice";
import {updateComment, updatePost} from "../features/ApiActions";

const AddEditModal = () => {
    const props = useAppSelector(state=>state.modal.content);


    const modalIsOpen = useAppSelector(state => state.modal.isOpen);
    const dispatcher = useAppDispatch();
    const [updatedText, setText] = useState(props.text);


    function handleSave() {
        if (props.isPost) {
            dispatcher(updatePost(props.postId, updatedText));
        }
        else {
            // @ts-ignore
            dispatcher(updateComment(props.commentId, updatedText, props.likes, props.dislikes))
        }
        dispatcher(closeModal());
    }


    return (
            <Modal show={modalIsOpen} onHide={() => dispatcher(closeModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>Tell the world your opinion!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} value={updatedText}
                                      onChange={(e) => setText(e.target.value)}/>
                        {props.isPost && <a href="">Upload picture</a>}
                    </Form.Group>
                </Form>
            </Modal.Body>
                <Modal.Footer>
                    <Button className={"save-btn"} onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default AddEditModal;