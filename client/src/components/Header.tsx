import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {logOutAction} from "../features/AuthSlice";
import {getPostsByKeyword} from "../features/ApiActions";
import {Button, Container, Form, InputGroup, Navbar} from "react-bootstrap";

const Header = () => {
    const username = useAppSelector(state => state.users.userName);
    const dispatcher = useAppDispatch();
    const [keyword, setKeyword] = useState("");

    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return function (this: any) {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const delayedSearch = debounce(() => {
        dispatcher(getPostsByKeyword(keyword));
    }, 1000);

    const handleInputChange = (e: string) => {
        setKeyword(e);
        delayedSearch();
    };

    return (

        <Navbar bg="primary" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">Olim Tech forum</Navbar.Brand>
                <Form className="search-container">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            className=" mr-sm-2"
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder="Search..."
                        />
                    </InputGroup>
                </Form>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="mr-5">
                        Hello, {username}!
                    </Navbar.Text>
                    <Button className="ml-5" variant="outline-light" onClick={() => dispatcher(logOutAction())}>
                        Log Out
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;