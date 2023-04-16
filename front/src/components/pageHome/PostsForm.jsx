import { useState } from "react";

import { TextField, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../../features/postsData.slice";

import { getJwtToken } from "../../utils/functions/tools/getJwtToken";
import { axiosCreatePost } from "../../utils/functions/posts/axiosCreatePost";
import { axiosGetPosts } from "../../utils/functions/posts/axiosGetPosts";

const usePostForm = () => {
    const [postText, setPostText] = useState("");
    const [postFile, setPostFile] = useState("");
    const [postFileUrl, setPostFileUrl] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );

    //This function handles the file that is meant to be posted
    //@Params { type: Object } => the param of the onChange event listening the file input
    //The first local state is here to create a blop url in order to display the file directly on the DOM
    //The second local state is here to contain the file that will be send to the data base
    const handlePostFile = (e) => {
        setPostFileUrl(URL.createObjectURL(e.target.files[0]));
        setPostFile(e.target.files[0]);
    };

    //This function handles the data to send to the API
    //@Params { type: string } => The id of the user
    //It creates an object containing all the data for the call API with the constructor FormData()
    //It takes several properties but the two lasts are the more important.
    //The property referring to the text doesn't need to be dynamic because if the user doens't insert a text the property will just takes empty strings as value
    //The property referring to the file has to be dynamic it is only presents if a file has been provided by the user
    const handlePostFormData = (userId) => {
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

        return post;
    };

    //This function handles the submission of a post
    //Then this function makes two calls API
    //The first one posts the data to the data base and clears the local states
    //The second (called by the first) is getting all the posts from the data base and places them in the redux store
    const handlePostSubmission = () => {
        let { userId, token } = getJwtToken();
        const post = handlePostFormData(userId);

        axiosCreatePost(post, token).then(() => {
            setPostFile("");
            setPostFileUrl("");
            setPostText("");
            axiosGetPosts(token)
                .then((res) => {
                    dispatch(setPostsData(res.data));
                })
                .catch((err) => console.log(err));
        });
    };

    return {
        userData,
        postText,
        postFileUrl,
        setPostText,
        handlePostFile,
        handlePostSubmission,
    };
};

const PostsForm = () => {
    const {
        userData,
        postText,
        postFileUrl,
        setPostText,
        handlePostFile,
        handlePostSubmission,
    } = usePostForm();

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
                {postFileUrl === "" ? (
                    <Button
                        name="handle-post-img"
                        aria-label="handle-post-img"
                        className="posts-form__buttons-row-img"
                        variant="outlined"
                    >
                        <label htmlFor="post-file">Ajouter une image</label>
                    </Button>
                ) : (
                    <img
                        src={postFileUrl}
                        alt={"Photo que " + userData.pseudo + " va poster"}
                    />
                )}

                <input
                    type="file"
                    name="file"
                    id="post-file"
                    onChange={(e) => handlePostFile(e)}
                />
                <Button
                    name="post-comment"
                    aria-label="post-comment"
                    className="posts-form__buttons-row-post"
                    variant="outlined"
                    onClick={() => handlePostSubmission()}
                >
                    Poster
                </Button>
            </div>
        </form>
    );
};

export default PostsForm;
