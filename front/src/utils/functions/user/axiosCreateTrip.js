import axios from "axios";

export const axiosCreateTrip = async (userId, trip, token) => {
    return await axios({
        url: `${process.env.REACT_APP_API_URL}api/auth/setTrip/${userId}`,
        method: "put",
        data: trip,
        headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
        },
    });
};
