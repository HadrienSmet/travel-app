// import { useSelector } from "react-redux";
import { FaThumbsDown, FaThumbsUp, FaPaperPlane, FaEdit, FaTimes, FaFileImage } from 'react-icons/fa';
import { Button } from "@mui/material";
import { useState } from "react";
import { getJwtToken, dateParser } from "../utils/functions/tools";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, setPostsData } from '../features/postsData.slice';
import { useEffect } from 'react';
import { setFriendData } from '../features/friendData.slice';
// import { spacing } from '@mui/system';

const Post = ({ post }) => {
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
    const postsData = useSelector((state) => state.postsDataStore.postsData)
    useEffect(() => {
        setImageUrl(post.imageUrl)
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [postsData])

    const handleEditFile = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setNewImage(e.target.files[0]);
    }

    const handleDeleteFile = () => {
        setImageUrl("");
        setNewImage("");
    }

    const handleEditPost = (e) => {
        let postId;
        if (e.target.id === "") {
            postId = e.target.parentElement.id.split("-")[1];
        } else {
            postId = e.target.id.split("-")[1];
        }
        const data = new FormData();
        data.append("userId", post.userId);
        newText !== "" ? data.append("text", newText) : data.append("text", post.text);
        newImage !== undefined ? data.append("file", newImage) : data.append("file", post.imageUrl);

        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            method: "put",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                "authorization": `bearer ${token}`
            }
        })
        .then((res) => {
            setIsEditing(false)
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(res => {
                    console.log(res.data);
                    dispatch(setPostsData(res.data));
            })
            .catch(err => console.log(err));
        })
        .catch((err) => console.log(err));
        console.log(newImage, imageUrl, newText, postId);
    }

    const handleDeletePost = (e) => {
        console.log(e);
        let postId;
        if (e.target.id === "") {
            postId = e.target.parentElement.id.split("-")[1];
        } else {
            postId = e.target.id.split("-")[1];
        }
        
        console.log(postId);
        dispatch(deletePost(postId));
        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.log(err));
    }

    //Handles the behavior of the app when a user clicks on the like button
    //If the user already liked the post:
    //-->The like is removed from the database and from the localState
    //Else:
    //-->The like is added to the database and to the LocalState
    const likesHandler = () => {
        if (usersLiking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: 'post',
                data: {
                    like: 0
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setLikes(likes - 1);
                setLiked(false);
                setUsersLiking(usersLiking.splice(userId, 1));
                setUsersLiking(usersLiking.filter(id => id !== userId));
                console.log(likes);
                console.log(usersLiking);
            })
        } else if (!usersDisliking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: 'post',
                data: {
                    like: 1
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setLikes(likes + 1);
                setLiked(true);
                setUsersLiking([...usersLiking, userId]);
                console.log(likes);
                console.log(usersLiking);
            })
        }
    }

    //Handles the behavior of the app when a user clicks on the dislike button
    //If the user already disliked the post:
    //-->The dislike is removed from the database and from the localState
    //Else:
    //-->The dislike is added to the database and to the LocalState
    const dislikesHandler = () => {
        if (usersDisliking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: 'post',
                data: {
                    like: 0
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setDislikes(dislikes - 1);
                setDisliked(false);
                setUsersDisliking(usersDisliking.filter(id => id !== userId));
                console.log(dislikes);
                console.log(usersDisliking);
            })
        } else if (!usersLiking.includes(userId)) {
            axios({
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
                method: 'post',
                data: {
                    like: -1
                },
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(() => {
                setDislikes(dislikes + 1);
                setDisliked(true);
                setUsersDisliking([ ...usersDisliking, userId]);
                console.log(dislikes);
                console.log(usersDisliking);
            })
        }
    }

    const goToProfilePage = () => {
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/userProfile/${post.pseudo}`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            dispatch(setFriendData(res.data));
            navigate('/friend-profile');
        })
        .catch((err) => console.log(err))
    }

    return (
        <div key={"post-div-" + post._id} className="post-container">
                    <div key={"post-header-" + post._id} className="post-header">
                        <div 
                            key={"post-header-user-div-" + post._id} 
                            className="post-header__user-side"
                            onClick={() => goToProfilePage()}
                        >
                            <h4 key={"post-pseudo-" + post._id}>{post.pseudo}</h4>
                            <div key={"post-header-profile-picture-container" + post._id} className="post-header__user-side__img-container">
                                <img key={"post-header-profile-picture" + post._id} src={post.profilePicture} alt={"photo de profil de " + post.pseudo} />
                            </div>
                            
                        </div>
                        <div key={"post-header-data-div-" + post._id} className="post-header__data-side">
                            <p key={"post-date-" + post._id}>{dateParser(post.date)}</p>
                            <p key={"post-country-" + post._id}>{post.country}</p>
                        </div>
                    </div>
                    <div key={"post-content-" + post._id} className="post-content">
                        {imageUrl !== "" && <img key={"post-content-img-" + post._id} src={imageUrl} alt="img" />}
                        {isEditing === true && post.imageUrl !== "" && 
                            <div className="post-content__file-edit">
                                <label htmlFor="edit-post-file">
                                    <FaFileImage />
                                </label>
                                <input id='edit-post-file' type="file" onChange={(e) => handleEditFile(e)} />
                                <span>
                                    <FaTimes onClick={() => handleDeleteFile()} />
                                </span>
                            </div> 
                        }
                        {isEditing === false && post.text !== "" && <p key={"post-content-txt-" + post._id}>{post.text}</p>}
                        {isEditing === true && post.text !== "" && 
                            <textarea 
                                defaultValue={post.text} 
                                key={"post-content-txt-" + post._id}
                                onChange={(e) => setNewText(e.target.value)}
                            ></textarea>}
                    </div>
                    <div key={"post-buttons-row-" + post._id} className="post__buttons-row">
                        <div key={"post-buttons-row-opinions" + post._id} className="post__buttons-row__opinion-side">
                            <div key={"post-buttons-row-likes-div" + post._id} className="post__buttons-row__likes">
                                <p key={"post-buttons-row-likes" + post._id}>{likes}</p>
                                <FaThumbsUp 
                                    key={"post-buttons-row-likes-icon" + post._id} 
                                    onClick={() => likesHandler()}
                                />
                            </div>
                            <div key={"post-buttons-row-dislikes-div" + post._id} className="post__buttons-row__dislikes">
                                <p key={"post-buttons-row-dislikes" + post._id}>{dislikes}</p>
                                <FaThumbsDown 
                                    key={"post-buttons-row-dislikes-icon" + post._id} 
                                    onClick={() => dislikesHandler()}
                                />
                            </div>
                        </div>
                        <div 
                            key={"post-buttons-row-crud" + post._id} 
                            className="post__buttons-row__crud-side"
                        >
                            {post.userId === userId && 
                                <Button 
                                    key={"post-buttons-row-edit-btn" + post._id}
                                    onClick={() => setIsEditing(!isEditing)}    
                                >
                                    <FaEdit key={"post-buttons-row-edit-icon" + post._id} />
                                </Button>
                            }
                            {post.userId === userId && 
                                <Button className='post__delete-div' id={"deletediv-" + post._id} key={"post-buttons-row-delete-btn" + post._id}>
                                    <FaTimes id={"delete-" + post._id} key={"post-buttons-row-delete-icon" + post._id} onClick={(e) => handleDeletePost(e)} />
                                </Button>
                            }
                            {isEditing === true && 
                                <Button id={"editpostdiv-" + post._id} key={"post-buttons-row-post-btn" + post._id}>
                                    <FaPaperPlane 
                                        id={"editpost-" + post._id} 
                                        key={"post-buttons-row-post-icon" + post._id}
                                        onClick={(e) => handleEditPost(e)}
                                    />
                                </Button>
                            }
                        </div>
                    </div>
                </div>
    );
};

export default Post;