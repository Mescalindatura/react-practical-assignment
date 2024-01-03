import React from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Header from "./Header";
import Posts from "./Posts";

const Main = () => {
    const username = useAppSelector(state=>state.users.userName);
    const dispatcher = useAppDispatch();
    return (
        <div>
            <Header/>
            <Posts/>
        </div>
    );
};

export default Main;