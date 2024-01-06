import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Post from "./Post";
import Header from "./Header";
import {createPost, getPostsByPage} from "../features/ApiActions";
import Paginator from "./Paginator";

const Page = () => {
    const dispatcher = useAppDispatch();
    const posts = useAppSelector(state=>state.posts.posts)

    useEffect(() => {
       dispatcher(getPostsByPage(1));

    }, [dispatcher]);

    return (
        <div>
            <Header/>
            <button className={"add-post"} onClick={dispatcher(createPost())}>Add new post</button>
            <div className={"post-container"}>
                {posts.map((item, index) => (
                    <div className={"post"} key={index}>
                        <Post {...item}/>
                    </div>
                ))}
                <Paginator/>
            </div>
        </div>
    );
};

export default Page;