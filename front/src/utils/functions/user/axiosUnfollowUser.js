import axios from "axios";

export const axiosUnfollowUser = async (userId, data, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/unfollowUser/${userId}`,
        method: "put",
        data: data,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
