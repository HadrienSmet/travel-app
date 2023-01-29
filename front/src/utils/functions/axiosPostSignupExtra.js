import axios from "axios";

export const axiosPostSignupExtra = async (data) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};
