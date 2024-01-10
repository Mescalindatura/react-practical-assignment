import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {logOutAction} from "../features/AuthSlice";
import {getPostsByKeyword} from "../features/ApiActions";

const Header = () => {
    const username = useAppSelector(state=>state.users.userName);
    const dispatcher = useAppDispatch();
    const [keyword, setKeyword] = useState("");
//todo: use debounce technic instead of running request on enter
    return (
        <div>
            <div><input type="text" className={"search"} onChange={(e) => setKeyword(e.target.value)}/>
                <button className="search" onClick={()=>dispatcher(getPostsByKeyword(keyword))}>Search</button>
            </div>
            <div className="username">{username}</div>
            <button className="logout" onClick={()=>dispatcher(logOutAction())}>Log Out</button>
        </div>
    );
};

export default Header;