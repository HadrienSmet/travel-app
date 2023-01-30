import axios from "axios";

export const axiosGetPostsFromCountry = async (selectedCountry, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/posts/from/${selectedCountry}`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
