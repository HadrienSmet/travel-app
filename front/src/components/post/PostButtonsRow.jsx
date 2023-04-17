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
    const [likesData, setLikesData] = useState({
        liked: false,
        disliked: false,
        likes: post.likes,
        dislikes: post.dislikes,
        usersLiking: post.usersLiked,
        usersDisliking: post.usersDisliked,
    });
    const { likes, dislikes, usersLiking, usersDisliking } = likesData;
    const changeLikes = (bool) => {
        if (bool) setLikesData({ ...likesData, likes: likesData.likes++ });
        if (!bool) setLikesData({ ...likesData, likes: likesData.likes-- });
    };
    const changeUsersLiking = (newArr) =>
        setLikesData({ ...likesData, usersLiking: newArr });
    const changeDislikes = (bool) => {
        if (bool)
            setLikesData({ ...likesData, dislikes: likesData.dislikes++ });
        if (!bool)
            setLikesData({ ...likesData, dislikes: likesData.dislikes-- });
    };
    const changeUsersDisliking = (newArr) =>
        setLikesData({ ...likesData, usersDisliking: newArr });

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axiosPostLikes(post._id, 0, token).then(() => {
                changeLikes(false);
                setLiked(false);
                changeUsersLiking(usersLiking.filter((id) => id !== userId));
            });
        } else if (!usersDisliking.includes(userId)) {
            axiosPostLikes(post._id, 1, token).then(() => {
                changeLikes(true);
                setLiked(true);
                changeUsersLiking([...usersLiking, userId]);
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
                changeDislikes(false);
                setDisliked(false);
                changeUsersDisliking(
                    usersDisliking.filter((id) => id !== userId)
                );
            });
        } else if (!usersLiking.includes(userId)) {
            axiosPostDislikes(post._id, -1, token).then(() => {
                changeDislikes(true);
                setDisliked(true);
                changeUsersDisliking([...usersDisliking, userId]);
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
        axiosDeletePost(postId, token).then(() => {
            dispatch(deletePost(postId));
            axiosGetPosts(token).then((res) => {
                dispatch(setPostsData(res.data));
            });
        });
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

        axiosEditPost(postId, data, token).then(() => {
            setIsEditing(false);
            axiosGetPosts(token).then((res) => {
                dispatch(setPostsData(res.data));
            });
        });
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
        useLikesButtons({
            post,
            token,
            userId,
        });
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
                    <Button
                        name="handle-edit-post"
                        aria-label="handle-edit-post"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <FaEdit />
                    </Button>
                )}
                {isAuthor && (
                    <Button
                        name="handle-delete-post"
                        aria-label="handle-delete-post"
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
                    <Button
                        name="post-edited-post"
                        aria-label="post-edited-post"
                        id={"editpostdiv-" + post._id}
                    >
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
