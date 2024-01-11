import React, {useState} from 'react';
import {useAppDispatch} from "../app/hooks";
import {logInAction} from "../features/AuthSlice";
import {Button, Form} from "react-bootstrap";

const Auth = () => {
    const [userName, setName] = useState("");
    const dispatcher = useAppDispatch();
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Form className="border p-4 rounded" style={{width: '350px'}}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label className="fw-bold" style={{fontSize: '1.2rem'}}>
                        Enter by username
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type username here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" onClick={() => dispatcher(logInAction(userName))}>
                        Log in
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Auth;