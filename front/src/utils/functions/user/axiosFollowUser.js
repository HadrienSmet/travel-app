import axios from "axios";

export const axiosFollowUser = async (userId, data, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/followUser/${userId}`,
        method: "put",
        data: data,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
