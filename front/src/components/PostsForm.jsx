import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getJwtToken } from "../utils/functions/tools";
import { setPostsData } from "../features/postsData.slice";

const PostsForm = () => {
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

    //This function handles the submission of a post
    //It creates an object containing all the data for the call API with the constructor FormData()
    //It takes several properties but the two lasts are the more important.
    //The property referring to the text doesn't need to be dynamic because if the user doens't insert a text the property will just takes empty strings as value
    //The property referring to the file has to be dynamic it is only presents if a file has been provided by the user
    //Then this function makes two calls API
    //The first one posts the data to the data base and clears the local states
    //The second (called by the first) is getting all the posts from the data base and places them in the redux store
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

        axios({
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            method: "post",
            data: post,
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `bearer ${token}`,
            },
        }).then((res) => {
            setPostFile("");
            setPostFileUrl("");
            setPostText("");
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
        });
    };

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
                    <Button variant="outlined">
                        <label htmlFor="post-file">Ajouter une image</label>
                    </Button>
                ) : (
                    <img src={postFileUrl} alt={"Photo que " + userData.pseudo + " va poster"} />
                )}

                <input
                    type="file"
                    name="file"
                    id="post-file"
                    onChange={(e) => handlePostFile(e)}
                />
                <Button
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
