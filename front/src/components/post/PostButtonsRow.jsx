import { useState } from "react";
import { Button } from "@mui/material";
import {
    FaEdit,
    FaPaperPlane,
    FaRegThumbsDown,
    FaRegThumbsUp,
    FaThumbsDown,
    FaThumbsUp,
    FaTimes,
} from "react-icons/fa";

import { useDispatch } from "react-redux";
import { deletePost, setPostsData } from "../../features/postsData.slice";

import { getJwtToken } from "../../utils/functions/tools/getJwtToken";
import { axiosPostDislikes } from "../../utils/functions/posts/axiosPostDislikes";

import { axiosPostLikes } from "../../utils/functions/posts/axiosPostLikes";
import { axiosDeletePost } from "../../utils/functions/posts/axiosDeletePost";
import { axiosEditPost } from "../../utils/functions/posts/axiosEditPost";
import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";

const useLikesButtons = ({ post, token, userId }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [usersLiking, setUsersLiking] = useState(post.usersLiked);
    const [usersDisliking, setUsersDisliking] = useState(post.usersDisliked);

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axiosPostLikes(post._id, 0, token).then(() => {
                setLikes(likes - 1);
                setLiked(false);
                setUsersLiking(usersLiking.splice(userId, 1));
                setUsersLiking(usersLiking.filter((id) => id !== userId));
            });
        } else if (!usersDisliking.includes(userId)) {
            axiosPostLikes(post._id, 1, token).then(() => {
                setLikes(likes + 1);
                setLiked(true);
                setUsersLiking([...usersLiking, userId]);
            });
        }
    };

    //Handles the behavior of the app when a user clicks on the dislike button
    //If the user already disliked the post:
    //-->The dislike is removed from the database and from the localState
    //Else:
    //-->The dislike is added to the database and to the LocalState
    const dislikesHandler = () => {
        if (usersDisliking.includes(userId)) {
            axiosPostDislikes(post._id, 0, token).then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                setUsersDisliking(usersDisliking.filter((id) => id !== userId));
            });
        } else if (!usersLiking.includes(userId)) {
            axiosPostDislikes(post._id, -1, token).then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                setUsersDisliking([...usersDisliking, userId]);
            });
        }
    };

    return {
        likes,
        liked,
        dislikes,
        disliked,
        likesHandler,
        dislikesHandler,
    };
};

const useCrudButtons = ({ post, token, newImage, newText, setIsEditing }) => {
    const dispatch = useDispatch();

    //This function is here to handle the suppresion of a post
    //@Params { type: Object } => the param from the onClick event
    //The control structure is only here to be sure that the element we target got the right id
    //Then we make a call API to delete the post and the file in the data base and then on the store redux
    const handleDeletePost = (e) => {
        let postId;
        if (e.target.id === "") {
            postId = e.target.parentElement.id.split("-")[1];
        } else {
            postId = e.target.id.split("-")[1];
        }
        axiosDeletePost(postId, token)
            .then(() => dispatch(deletePost(postId)))
            .catch((err) => console.log(err));
    };

    //This function we create a new Object for the call API whith the constructor FormData()
    //This new Object takes three properties the first one is the id of the user
    //The second one represents the text. And it takes either the old data or if the user inserted a new text this property will takes the new data as value
    //The third one represents the file. And it takes either the old data or if the user inserted a new picture this property will takes the new data as value
    const handleEditFormData = () => {
        const data = new FormData();
        data.append("userId", post.userId);
        newText !== ""
            ? data.append("text", newText)
            : data.append("text", post.text);
        newImage !== undefined
            ? data.append("file", newImage)
            : data.append("file", post.imageUrl);

        return data;
    };

    //This function handles the modification of a post
    //@Params { type: Object } => the param of the onClick event
    //The control structure is only here to be sure we target the right element on the DOM
    //Then two calls API are made.
    //The first one is here to modificate the post
    //The second one is here to get all the posts once again in order to be able to display the new one
    const handleEditPost = (e) => {
        const data = handleEditFormData();
        let postId;
        if (e.target.id === "") {
            postId = e.target.parentElement.id.split("-")[1];
        } else {
            postId = e.target.id.split("-")[1];
        }

        axiosEditPost(postId, data, token)
            .then(() => {
                setIsEditing(false);
                axiosGetPosts(token)
                    .then((res) => {
                        dispatch(setPostsData(res.data));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return {
        handleDeletePost,
        handleEditPost,
    };
};

const PostButtonsRow = ({
    post,
    isAuthor,
    newImage,
    newText,
    setIsEditing,
    isEditing,
}) => {
    const { token, userId } = getJwtToken();
    const { likes, liked, dislikes, disliked, likesHandler, dislikesHandler } =
        useLikesButtons({ post, token, userId });
    const { handleDeletePost, handleEditPost } = useCrudButtons({
        post,
        token,
        newImage,
        newText,
        setIsEditing,
    });
    return (
        <div className="post__buttons-row">
            <div className="post__buttons-row__opinion-side">
                <div className="post__buttons-row__likes">
                    <p>{likes}</p>
                    {liked ? (
                        <FaThumbsUp onClick={() => likesHandler()} />
                    ) : (
                        <FaRegThumbsUp onClick={() => likesHandler()} />
                    )}
                </div>
                <div className="post__buttons-row__dislikes">
                    <p>{dislikes}</p>
                    {disliked ? (
                        <FaThumbsDown onClick={() => dislikesHandler()} />
                    ) : (
                        <FaRegThumbsDown onClick={() => dislikesHandler()} />
                    )}
                </div>
            </div>
            <div className="post__buttons-row__crud-side">
                {isAuthor && (
                    <Button onClick={() => setIsEditing(!isEditing)}>
                        <FaEdit />
                    </Button>
                )}
                {isAuthor && (
                    <Button
                        className="post__delete-div"
                        id={"deletediv-" + post._id}
                    >
                        <FaTimes
                            id={"delete-" + post._id}
                            onClick={(e) => handleDeletePost(e)}
                        />
                    </Button>
                )}
                {isEditing && (
                    <Button id={"editpostdiv-" + post._id}>
                        <FaPaperPlane
                            id={"editpost-" + post._id}
                            onClick={(e) => handleEditPost(e)}
                        />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PostButtonsRow;
