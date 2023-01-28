import axios from "axios";

export const axiosSignIn = async (data) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/login`,
        data,
        {
            "Content-Type": "application/json",
        }
    );
};
