// import { useSelector } from "react-redux";
import {
    FaThumbsDown,
    FaThumbsUp,
    FaRegThumbsDown,
    FaRegThumbsUp,
    FaPaperPlane,
    FaEdit,
    FaTimes,
    FaFileImage,
} from "react-icons/fa";
import { Button } from "@mui/material";
import { useState } from "react";
import {
    getJwtToken,
    dateParser,
    mobileDateParser,
} from "../utils/functions/tools";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, setPostsData } from "../features/postsData.slice";
import { useEffect } from "react";
import { setFriendData } from "../features/friendData.slice";
// import { spacing } from '@mui/system';

const Post = ({ post }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [usersLiking, setUsersLiking] = useState(post.usersLiked);
    const [usersDisliking, setUsersDisliking] = useState(post.usersDisliked);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState("");
    const [imageUrl, setImageUrl] = useState(post.imageUrl);
    const [newImage, setNewImage] = useState(undefined);
    const { token, userId } = getJwtToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postsData = useSelector((state) => state.postsDataStore.postsData);

    //This function sets the data about the picture on the local state
    //@Params { type: Object } => the param from the onChange event listening the input[type: files]
    //The first state is here to create a blob url to be directly shown on the screen
    //The second one is the file that will be send to the back
    const handleEditFile = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setNewImage(e.target.files[0]);
    };

    //This function deletes the file on the local State
    //This function is called when the user press on the button handling the suppression
    const handleDeleteFile = () => {
        setImageUrl("");
        setNewImage("");
    };

    //This function handles the modification of a post
    //@Params { type: OBject } => the param of the onClick event
    //The control structure is only here to be sure we target the right element on the DOM
    //Then we create a new Object for the call API whith the constructor FormData()
    //This new Object takes three properties the first one is the id of the user
    //The second one represents the text. And it takes either the old data or if the user inserted a new text this property will takes the new data as value
    //The third one represents the file. And it takes either the old data or if the user inserted a new picture this property will takes the new data as value
    //Then two calls API are made.
    //The first one is here to modificate the post
    //The second one is here to get all the posts once again in order to be able to display the new one
    const handleEditPost = (e) => {
        let postId;
        if (e.target.id === "") {
            postId = e.target.parentElement.id.split("-")[1];
        } else {
            postId = e.target.id.split("-")[1];
        }
        const data = new FormData();
        data.append("userId", post.userId);
        newText !== ""
            ? data.append("text", newText)
            : data.append("text", post.text);
        newImage !== undefined
            ? data.append("file", newImage)
            : data.append("file", post.imageUrl);

        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            method: "put",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                setIsEditing(false);
                axios({
                    url: `${process.env.REACT_APP_API_URL}api/posts`,
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `bearer ${token}`,
                    },
                })
                    .then((res) => {
                        dispatch(setPostsData(res.data));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

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
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => dispatch(deletePost(postId)))
            .catch((err) => console.log(err));
    };

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: "post",
                data: {
                    like: 0,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setLikes(likes - 1);
                setLiked(false);
                setUsersLiking(usersLiking.splice(userId, 1));
                setUsersLiking(usersLiking.filter((id) => id !== userId));
            });
        } else if (!usersDisliking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: "post",
                data: {
                    like: 1,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
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
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: "post",
                data: {
                    like: 0,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                setUsersDisliking(usersDisliking.filter((id) => id !== userId));
            });
        } else if (!usersLiking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: "post",
                data: {
                    like: -1,
                },
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            }).then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                setUsersDisliking([...usersDisliking, userId]);
            });
        }
    };

    //This function allows the user to go on the profile page of the user who made the post
    //It makes a call API using the pseudo of the user in orger to get all the necessary data
    //Then if it succeeded it displays the data inside the redux store before leading the user to the right page
    const goToProfilePage = () => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/userProfile/${post.pseudo}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                dispatch(setFriendData(res.data));
                navigate("/friend-profile");
            })
            .catch((err) => console.log(err));
    };

    //This useEffect is called whenever the store redux containing the posts gets a modification
    //It will take the image given by the data base and put it into the local state.
    //And it also checks the user's id to see wich action he is allowed to do on the post
    useEffect(() => {
        if (
            userId === post.userId ||
            userId === process.env.REACT_APP_ADMIN_ID
        ) {
            setIsAuthor(true);
        }

        setImageUrl(post.imageUrl);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [postsData]);

    return (
        <div key={post._id} className="post-container">
            <div className="post-header">
                <div
                    className="post-header__user-side"
                    onClick={() => goToProfilePage()}
                >
                    <h4>{post.pseudo}</h4>
                    <div className="post-header__user-side__img-container">
                        <img
                            src={post.profilePicture}
                            alt={"photo de profil de " + post.pseudo}
                        />
                    </div>
                </div>
                <div className="post-header__data-side">
                    <p className="post-header__data-side__desktop-date">
                        {dateParser(post.date)}
                    </p>
                    <p className="post-header__data-side__mobile-date">
                        {mobileDateParser(post.date)}
                    </p>
                    <p>{post.country}</p>
                </div>
            </div>
            <div className="post-content">
                {imageUrl !== "" && <img src={imageUrl} alt={"Photo du post créé par " + post.pseudo} />}
                {isEditing && post.imageUrl !== "" && (
                    <div className="post-content__file-edit">
                        <label htmlFor="edit-post-file">
                            <FaFileImage />
                        </label>
                        <input
                            id="edit-post-file"
                            type="file"
                            onChange={(e) => handleEditFile(e)}
                        />
                        <span>
                            <FaTimes onClick={() => handleDeleteFile()} />
                        </span>
                    </div>
                )}
                {!isEditing && post.text !== "" && <p>{post.text}</p>}
                {isEditing && post.text !== "" && (
                    <textarea
                        defaultValue={post.text}
                        onChange={(e) => setNewText(e.target.value)}
                    ></textarea>
                )}
                {isEditing && post.text === "" && (
                    <textarea
                        onChange={(e) => setNewText(e.target.value)}
                    ></textarea>
                )}
            </div>
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
                            <FaRegThumbsDown
                                onClick={() => dislikesHandler()}
                            />
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
        </div>
    );
};

export default Post;
