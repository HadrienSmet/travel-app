import { FaFileImage, FaTimes } from "react-icons/fa";

const usePostContent = ({ setNewImage, setImageUrl }) => {
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

    return {
        handleDeleteFile,
        handleEditFile,
    };
};

const PostContent = ({
    post,
    isEditing,
    setNewText,
    setNewImage,
    imageUrl,
    setImageUrl,
}) => {
    const { handleDeleteFile, handleEditFile } = usePostContent({
        setNewImage,
        setImageUrl,
    });

    return (
        <div className="post-content">
            {imageUrl !== "" && (
                <img
                    src={imageUrl}
                    alt={"Photo du post créé par " + post.pseudo}
                />
            )}
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
    );
};

export default PostContent;
