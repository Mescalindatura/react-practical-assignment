import React from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Post from "./Post";

const Posts = () => {
    const posts = useAppSelector(state=>state.slicer.posts);
    const dispatcher = useAppDispatch();
    return (
        <div>
            {posts.map((post)=>
            <Post/>)}
        </div>
    );
};

export default Posts;