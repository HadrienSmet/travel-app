import axios from "axios";

export const axiosCreateAlbum = async (userId, data, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/setAlbum/${userId}`,
        method: "put",
        data: data,
        headers: {
            "Content-Type": "multipart/form",
            authorization: `bearer ${token}`,
        },
    });
};
