import axios from "axios";

export const axiosTellUserIsFollowed = async (
    friendId,
    dataForFriend,
    token
) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/newFollower/${friendId}`,
        method: "put",
        data: dataForFriend,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
