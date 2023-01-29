import axios from "axios";

export const axiosGetFriendPosts = async (friendId, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/posts/by/${friendId}`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
