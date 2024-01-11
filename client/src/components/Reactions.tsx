import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
faArrowDownLong,
faArrowUpLong,faDownLong, faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {updateComment, updatePostRating} from "../features/ApiActions";

const Reactions: React.FC<IReactions> = ({likes, dislikes, postid, commentid, text}) => {
    const username = useAppSelector(state => state.users.userName);
    const dispatcher = useAppDispatch();

    const [liked, setLiked] = useState(likes.includes(username));
    const [disliked, setDisliked] = useState(dislikes.includes(username));

    const reactions = likes.length - dislikes.length;

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
            else {
                // @ts-ignore
                dispatcher(updateComment(commentid,text as string, likesTemp, dislikesTemp));
                console.log("like comment dispatched")
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
            else {
                // @ts-ignore
                dispatcher(updateComment(commentid,text as string, likesTemp, dislikesTemp));
                console.log("dislike comment dispatched")
            }
            return !prev;
        });
    }

    return (
        <div>
            <a onClick={handleLike} className={"like-link"}>
                {liked?<FontAwesomeIcon icon={faUpLong} />: <FontAwesomeIcon icon={faArrowUpLong} /> }
            </a>
            <span className={"reactions-count"}>{reactions}</span>
            <a onClick={handleDislike} className={"dislike-link"}>
                {disliked?<FontAwesomeIcon icon={faDownLong} /> :<FontAwesomeIcon icon={faArrowDownLong} />}
            </a>
        </div>
    );
};

export default Reactions;