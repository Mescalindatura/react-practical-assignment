import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleDown,
    faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {updatePostRating} from "../features/ApiActions";

const Reactions: React.FC<IReactions> = ({likes, dislikes, postid, commentid}) => {
    const username = useAppSelector(state => state.users.userName);
    const dispatcher = useAppDispatch();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    let reactions = likes.length - dislikes.length;

    function handleLike() {
        setLiked(prevLiked => {
            let likesTemp = [...likes];
            let dislikesTemp = [...dislikes];

            if (prevLiked) {
                const indexToRemove = likesTemp.indexOf(username);
                if (indexToRemove !== -1) {
                    likesTemp.splice(indexToRemove, 1);
                }
            } else if (disliked) {
                const indexToRemove = dislikesTemp.indexOf(username);
                if (indexToRemove !== -1) {
                    dislikesTemp.splice(indexToRemove, 1);
                }
                likesTemp.push(username);
                setDisliked(!disliked);
            } else {
                likesTemp.push(username);
            }
            if (!commentid) {
                dispatcher(updatePostRating(likesTemp, dislikesTemp, postid));
            }
            return !prevLiked;
        });
    }

    function handleDislike() {
        setDisliked(prev => {
            let likesTemp = [...likes];
            let dislikesTemp = [...dislikes];

            if (prev) {
                const indexToRemove = dislikesTemp.indexOf(username);
                if (indexToRemove !== -1) {
                    dislikesTemp.splice(indexToRemove, 1);
                }
            } else if (liked) {
                const indexToRemove = likesTemp.indexOf(username);
                if (indexToRemove !== -1) {
                    likesTemp.splice(indexToRemove, 1);
                }
                dislikesTemp.push(username);
                setLiked(!liked);
            } else {
                dislikesTemp.push(username);
            }
            if (!commentid) {
                dispatcher(updatePostRating(likesTemp, dislikesTemp, postid));
            }
            return !prev;
        });
    }

    return (
        <div>
            <a onClick={handleLike} className={"like-link"}>
                <FontAwesomeIcon icon={faCircleUp}/>
            </a>
            <span className={"reactions-count"}>{reactions}</span>
            <a onClick={handleDislike} className={"dislike-link"}>
                <FontAwesomeIcon icon={faCircleDown}/>
            </a>
        </div>
    );
};

export default Reactions;