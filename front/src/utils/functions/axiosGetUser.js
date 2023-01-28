import axios from "axios";

export const axiosGetUser = async (pseudo, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/userProfile/${pseudo}`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
