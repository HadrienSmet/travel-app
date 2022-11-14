// import { useSelector } from "react-redux";
import { FaThumbsDown, FaThumbsUp, FaPaperPlane, FaEdit, FaTimes } from 'react-icons/fa';
import { Button } from "@mui/material";
import { useState } from "react";
import { getJwtToken, dateParser } from "../utils/functions/tools";

const Post = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [isAuthor, setIsAuthor] = useState(false);
    // const postsData = useSelector((state) => state.postsDataStore.postsData);
    const { userId } = getJwtToken();
    return (
        <div key={"post-div-" + post._id} className="post-container">
                    <div key={"post-header-" + post._id} className="post-header">
                        <div key={"post-header-user-div-" + post._id} className="post-header__user-side">
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
                        {post.imageUrl !== "" && <img key={"post-content-img-" + post._id} src={post.imageUrl} alt="img" />}
                        {post.text !== "" && <p key={"post-content-txt-" + post._id}>{post.text}</p>}
                    </div>
                    <div key={"post-buttons-row-" + post._id} className="post__buttons-row">
                        <div key={"post-buttons-row-opinions" + post._id} className="post__buttons-row__opinion-side">
                            <div key={"post-buttons-row-likes-div" + post._id} className="post__buttons-row__likes">
                                <p key={"post-buttons-row-likes" + post._id}>{post.likes}</p>
                                <FaThumbsUp key={"post-buttons-row-likes-icon" + post._id} />
                            </div>
                            <div key={"post-buttons-row-dislikes-div" + post._id} className="post__buttons-row__dislikes">
                                <p key={"post-buttons-row-dislikes" + post._id}>{post.dislikes}</p>
                                <FaThumbsDown key={"post-buttons-row-dislikes-icon" + post._id} />
                            </div>
                        </div>
                        <div 
                            key={"post-buttons-row-crud" + post._id}                className="post__buttons-row__crud-side"
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
                                <Button key={"post-buttons-row-delete-btn" + post._id}>
                                    <FaTimes  key={"post-buttons-row-delete-icon" + post._id} />
                                </Button>
                            }
                            {isEditing === true && 
                                <Button key={"post-buttons-row-post-btn" + post._id}>
                                    <FaPaperPlane key={"post-buttons-row-post-icon" + post._id} />
                                </Button>
                            }
                        </div>
                    </div>
                </div>
    );
};

export default Post;