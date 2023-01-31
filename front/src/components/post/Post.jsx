import { useState, useEffect } from "react";
import { getJwtToken } from "../../utils/functions/tools/getJwtToken";
import { useSelector } from "react-redux";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostButtonsRow from "./PostButtonsRow";

const usePost = ({ post }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [imageUrl, setImageUrl] = useState(post.imageUrl);
    const { userId } = getJwtToken();
    const postsData = useSelector((state) => state.postsDataStore.postsData);

    useEffect(() => {
        if (
            userId === post.userId ||
            userId === process.env.REACT_APP_ADMIN_ID
        ) {
            setIsAuthor(true);
        }

        setImageUrl(post.imageUrl);
    }, [post.imageUrl, userId, post.userId, postsData]);

    return { isAuthor, imageUrl, setImageUrl };
};

const Post = ({ post }) => {
    const [isEditing, setIsEditing] = useState(false);
    // const [isUpdated, setIsUpdated] = useState(false);
    const [newText, setNewText] = useState("");
    // const [imageUrl, setImageUrl] = useState(post.imageUrl);
    const [newImage, setNewImage] = useState(undefined);
    const { isAuthor, imageUrl, setImageUrl } = usePost({ post });

    //This useEffect is called whenever the store redux containing the posts gets a modification
    //It will take the image given by the data base and put it into the local state.
    //And it also checks the user's id to see wich action he is allowed to do on the post
    // useEffect(() => {
    //     if (
    //         userId === post.userId ||
    //         userId === process.env.REACT_APP_ADMIN_ID
    //     ) {
    //         setIsAuthor(true);
    //     }

    //     setImageUrl(post.imageUrl);
    // }, [postsData, post.imageUrl, userId, post.userId]);

    return (
        <div key={post._id} className="post-container">
            <PostHeader post={post} />
            <PostContent
                post={post}
                isEditing={isEditing}
                setNewImage={setNewImage}
                setNewText={setNewText}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />
            <PostButtonsRow
                post={post}
                isAuthor={isAuthor}
                newImage={newImage}
                newText={newText}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
            />
        </div>
    );
};

export default Post;
