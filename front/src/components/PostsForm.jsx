import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { getJwtToken } from '../utils/functions/tools';
import { setPostsData } from '../features/postsData.slice';

const PostsForm = () => {
    const [postText, setPostText] = useState("");
    const [postFile, setPostFile] = useState("");
    const [postFileUrl, setPostFileUrl] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    const handlePostFile = (e) => {
        setPostFileUrl(URL.createObjectURL(e.target.files[0]));
        setPostFile(e.target.files[0]);
        console.log(postFile);
    }

    const handlePostSubmission = () => {
        let { userId, token } = getJwtToken();
        let date = new Date();
        date = Date.now();
    
        const post = new FormData();       
        post.append("userId", userId);
        post.append("country", userData.country);
        post.append("date", date);
        post.append("pseudo", userData.pseudo);
        post.append("profilePicture", userData.profilePicture);
        post.append("text", postText);
        postFile !== "" && post.append("file", postFile);
        // post.append("file", postFile);
    
        axios({
            url: "http://localhost:3000/api/posts",
            method: "post",
            data: post,
            headers: {
                "Content-Type": "multipart/form-data",
                "authorization": `bearer ${token}`
            }
        })
        .then(res => {
            setPostFile("");
            setPostFileUrl("");
            setPostText("");
            console.log(res);
            axios({
                url: "http://localhost:3000/api/posts",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`
                }
            })
            .then(res => {
                    dispatch(setPostsData(res.data));
            })
            .catch(err => console.log(err));
        })
    }
    
    return (
        <form action="" className="posts-form" encType="multipart/form-data">
            <TextField
                id="outlined-textarea"
                label="Quoi de neuf?"
                placeholder=""
                multiline
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            />
            <div className="posts-form__buttons-row">
                {postFileUrl === ""
                ?
                    <Button variant='outlined'><label htmlFor="post-file">Ajouter une image</label></Button>
                :
                    <img src={postFileUrl} alt="img" />
                }
                
                <input 
                    type="file" 
                    name="file" 
                    id="post-file"
                    onChange={(e) => handlePostFile(e)} 
                />
                <Button variant='outlined' onClick={() => handlePostSubmission()}>Poster</Button>
            </div>
            
        </form>
    );
};

export default PostsForm;