import axios from "axios";

export const axiosCreatePost = async (post, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        method: "post",
        data: post,
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${token}`,
        },
    });
};
