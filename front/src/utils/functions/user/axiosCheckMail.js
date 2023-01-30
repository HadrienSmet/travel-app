import axios from "axios";

export const axiosCheckMail = async (email) => {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}api/auth/checkMail/${email}`,
        {
            "Content-Type": "application/json",
        }
    );
};
