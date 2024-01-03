import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import Post from "./Post";
import {base_url} from "../utils/constants";

const Posts = () => {
    const dispatcher = useAppDispatch();
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(base_url + 'post');
                if (!response.ok) {
                    throw new Error('Response is not ok');
                }
                const data = await response.json();
                setPosts(data.result);
            } catch (error) {
                console.error("error in fetching");
            }
        };

        fetchData();
    }, []);

    return (
        <div className={"post-container"}>
            {posts.map((item, index)=>(
                <div className={"post"} key = {index}>
                    <Post {...item}/>
                </div>
            ))}
        </div>
    );
};

export default Posts;