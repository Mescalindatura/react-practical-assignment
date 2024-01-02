import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {logOutAction} from "../features/PostsSlicer";

const Header = () => {
    const username = useAppSelector(state=>state.slicer.userName);
    const dispatcher = useAppDispatch();
    const [keyword, setKeyword] = useState("");

    return (
        <div>
            <div><input type="text" className={"search"} onChange={(e) => setKeyword(e.target.value)}/>
                <button className="search" >Search</button>
            </div>
            <div className="username">{username}</div>
            <button className="logout" onClick={()=>dispatcher(logOutAction())}>Log Out</button>
        </div>
    );
};

export default Header;