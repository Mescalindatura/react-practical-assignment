import React, {useState} from 'react';
import {useAppDispatch} from "../app/hooks";
import {logInAction} from "../features/AuthSlice";

const Auth = () => {
    const [userName, setName] = useState("");
    const dispatcher = useAppDispatch();
    return (
        <div>
            <input type="text" placeholder={"Enter your name"}
                   onChange={e=>setName(e.target.value)}/>
            <button onClick={()=>dispatcher(logInAction(userName))}>Log In</button>
        </div>
    );
};

export default Auth;