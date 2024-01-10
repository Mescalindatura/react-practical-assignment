import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Post from "./Post";
import Header from "./Header";
import {createPost, deletePost, getPostsByPage, updatePost} from "../features/ApiActions";
import Paginator from "./Paginator";

const Page = () => {
    const dispatcher = useAppDispatch();
    const posts = useAppSelector(state => state.posts.posts);
    const modalIsOpen = useAppSelector(state => state.modal.isOpen);

    useEffect(() => {
        dispatcher(getPostsByPage(1));

    }, [dispatcher]);

    const handleModal = () => {

    }

    const postEdit = (post: IPost) => {
        dispatcher(updatePost(post))
    }

    const postDelete = (id: number) => {
        dispatcher(deletePost(id))
    }

    return (
        <div>
            <Header/>
            <button className={"add-post"} onClick={handleModal}>Add new post</button>
            <div className={"post-container"}>
                {posts.map((post) => (
                    <div className={"post"} key={post.id}>
                        <Post {...post} />
                    </div>
                ))}
                <Paginator/>
            </div>
        </div>
    );
};

export default Page;