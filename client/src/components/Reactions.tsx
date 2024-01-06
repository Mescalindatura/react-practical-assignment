import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleDown,
    faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import {putPostRatingAction} from "../features/UiSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";

const Reactions: React.FC<IReactions> = ({likes, dislikes, postid, commentid}) => {
    const username = useAppSelector(state => state.users.userName);
    const dispatcher = useAppDispatch();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    let reactions = likes.length - dislikes.length;

    function handleLike() {
        setLiked(prevLiked => {
            const likesTemp = likes;
            const dislikesTemp = dislikes;

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
                dispatcher(putPostRatingAction({postid: postid, likes: likesTemp, dislikes: dislikesTemp}));
            }
            return !prevLiked;
        });
    }

    function handleDislike() {
        setDisliked(prev => {
            const dislikesTemp = dislikes;
            const likesTemp = likes;

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
                dispatcher(putPostRatingAction({postid: postid, likes: likesTemp, dislikes: dislikesTemp}));
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