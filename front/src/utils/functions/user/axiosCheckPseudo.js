import axios from "axios";

export const axiosCheckPseudo = async (pseudo) => {
    return await axios.get(
        `${process.env.REACT_APP_API_URL}api/auth/checkPseudo/${pseudo}`,
        {
            "Content-Type": "application/json",
        }
    );
};
