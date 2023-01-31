import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaRegEnvelope, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    pullFollowerInFriendData,
    pushFollowerInFriendData,
} from "../../features/friendData.slice";
import {
    pullFollowingInUserLoggedData,
    pushFollowingInUserLoggedData,
} from "../../features/userLoggedData.slice";
import { getJwtToken } from "../../utils/functions/tools/getJwtToken";
import { axiosFollowUser } from "../../utils/functions/user/axiosFollowUser";
import { axiosTellUserIsFollowed } from "../../utils/functions/user/axiosTellUserIsFollowed";
import { axiosTellUserIsUnfollowed } from "../../utils/functions/user/axiosTellUserIsUnfollowed";
import { axiosUnfollowUser } from "../../utils/functions/user/axiosUnfollowUser";
import profileDefaultBg from "../../assets/images/profile-default-bg.webp";

const useFriendProfileHeader = ({ friendProfile, userProfile }) => {
    const [isFriend, setIsFriend] = useState(false);
    const [defaultBg, setDefaultBg] = useState(true);

    const handleIsFriend = (boolean) => {
        setIsFriend(boolean);
    };

    const handleDefaultBg = (boolean) => {
        setDefaultBg(boolean);
    };

    useEffect(() => {
        if (userProfile.following.includes(friendProfile.pseudo)) {
            handleIsFriend(true);
        }
        if (friendProfile.coverPicture !== undefined) {
            handleDefaultBg(false);
        }
    }, [userProfile, friendProfile.pseudo, friendProfile.coverPicture]);

    return {
        isFriend,
        defaultBg,
        handleIsFriend,
        handleDefaultBg,
    };
};

const useFriendHandler = ({ friendProfile, userProfile, handleIsFriend }) => {
    const dispatch = useDispatch();
    let { userId, token } = getJwtToken();

    //This function handles the logic about following a user
    //Two calls to the API are required to complete his utility
    //The first call is here to put the pseudo of the friend inside the user's data
    //The second call is here to put the pseudo of the user inside the friend's data
    const handleNewFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo,
        };
        let dataForFriend = {
            pseudo: userProfile.pseudo,
        };
        axiosFollowUser(userId, data, token).then(() => {
            dispatch(pushFollowingInUserLoggedData(friendProfile.pseudo));
            axiosTellUserIsFollowed(
                friendProfile._id,
                dataForFriend,
                token
            ).then(() => {
                dispatch(pushFollowerInFriendData(userProfile.pseudo));
            });
        });
    };

    //This function handles the logic about unfollowing a user
    //Two calls to the API are required to complete his utility
    //The first call is here to pull the pseudo of the friend from the user's data
    //The second call is here to pull the pseudo of the user from the friend's data
    const handleRemoveFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo,
        };
        let dataForFriend = {
            pseudo: userProfile.pseudo,
        };
        axiosUnfollowUser(userId, data, token).then(() => {
            dispatch(pullFollowingInUserLoggedData(friendProfile.pseudo));
            handleIsFriend(false);
            axiosTellUserIsUnfollowed(
                friendProfile._id,
                dataForFriend,
                token
            ).then(() => {
                dispatch(pullFollowerInFriendData(userProfile.pseudo));
            });
        });
    };

    return {
        handleNewFriend,
        handleRemoveFriend,
    };
};

const FriendProfileHeader = () => {
    const friendProfile = useSelector(
        (state) => state.friendDataStore.friendData
    );
    const userProfile = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );
    const { isFriend, defaultBg, handleIsFriend } = useFriendProfileHeader({
        friendProfile,
        userProfile,
    });
    const { handleNewFriend, handleRemoveFriend } = useFriendHandler({
        friendProfile,
        userProfile,
        handleIsFriend,
    });
    return (
        <div className="profile-section__header">
            <div className="profile-section__header-background">
                {defaultBg === true ? (
                    <img
                        src={profileDefaultBg}
                        alt={
                            "Photo de couverture par défaut de " +
                            friendProfile.pseudo
                        }
                    />
                ) : (
                    <img
                        src={friendProfile.coverPicture}
                        alt={"Photo de couverture de " + friendProfile.pseudo}
                    />
                )}
            </div>
            <div className="profile-section__header__user-intro">
                <div className="profile-section__header__user-data">
                    <div className="profile-section__header__profilePicture-container">
                        <img
                            src={friendProfile.profilePicture}
                            alt={"Photo de profil de " + friendProfile.pseudo}
                        />
                    </div>
                    <h2>{friendProfile.pseudo}</h2>
                </div>
                <div className="profile-section__header__buttons-container">
                    {isFriend === false ? (
                        <Button
                            variant="outlined"
                            onClick={() => handleNewFriend()}
                        >
                            <span>S'abonner</span>
                            <FaUserPlus />
                        </Button>
                    ) : (
                        <div
                            className="profile-section__header__fake-btn"
                            onClick={() => handleRemoveFriend()}
                        >
                            <span>Abonné</span>
                            <FaUserCheck />
                        </div>
                    )}

                    <Button variant="outlined">
                        <span>Messages</span>
                        <FaRegEnvelope />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FriendProfileHeader;
