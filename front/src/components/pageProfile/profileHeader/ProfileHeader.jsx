import { useState } from "react";

import { useDispatch } from "react-redux";
import { setCoverPictureInUserLoggedData } from "../../../features/userLoggedData.slice";

import { getJwtToken } from "../../../utils/functions/tools/getJwtToken";
import { axiosPutCoverPicture } from "../../../utils/functions/user/axiosPutCoverPicture";
import { useEffect } from "react";
import ProfileHeaderBackground from "./ProfileHeaderBackground";
import BgButtonsArea from "./BgButtonsArea";
import UserBanner from "./UserBanner";

const useProfileHeader = ({ userProfile }) => {
    const [coverPicture, setCoverPicture] = useState("");
    const [coverPictureUrl, setCoverPictureUrl] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [defaultPicture, setDefaultPicture] = useState(true);
    let { token, userId } = getJwtToken();
    const dispatch = useDispatch();

    const handleCoverPicture = (file) => setCoverPicture(file);
    const handleCoverPictureUrl = (url) => setCoverPictureUrl(url);
    const handleIsEditing = (boolean) => setIsEditing(boolean);
    const handleDefaultPicture = (boolean) => setDefaultPicture(boolean);

    //This function handles the picture provided by the user
    //@Params { type: Object } => the param of the onChange event listening the input files
    //The first local state contains the file that will be send to the data base
    //The second one contains a blob url that will displays the picture directly in the DOM
    //And the final one is here to indicate to the app wich image it has to display
    const startEditCoverPicture = (e) => {
        handleCoverPicture(e.target.files[0]);
        handleCoverPictureUrl(URL.createObjectURL(e.target.files[0]));
        handleIsEditing(true);
    };

    //This function is here to send the file to the data base
    //An object is made with the constructor FormData() to handle the file
    const handleEditCoverPicture = (checkRef, timesRef) => {
        const data = new FormData();
        data.append("file", coverPicture);
        axiosPutCoverPicture(userId, data, token)
            .then((res) => {
                dispatch(
                    setCoverPictureInUserLoggedData(res.data.coverPicture)
                );
                handleIsEditing(false);
                checkRef.current.classList.remove("active");
                timesRef.current.classList.remove("active");
            })
            .catch((err) => console.log(err));
    };

    const handleCancelCoverPicture = (checkRef, timesRef) => {
        handleCoverPicture("");
        handleCoverPictureUrl("");
        handleIsEditing(false);
        checkRef.current.classList.remove("active");
        timesRef.current.classList.remove("active");
    };

    useEffect(() => {
        if (userProfile.coverPicture !== undefined) {
            handleDefaultPicture(false);
        }
    }, [userProfile.coverPicture]);

    return {
        isEditing,
        coverPicture,
        coverPictureUrl,
        defaultPicture,
        startEditCoverPicture,
        handleCancelCoverPicture,
        handleEditCoverPicture,
    };
};

const ProfileHeader = ({ userProfile }) => {
    const {
        isEditing,
        coverPictureUrl,
        defaultPicture,
        startEditCoverPicture,
        handleCancelCoverPicture,
        handleEditCoverPicture,
    } = useProfileHeader({ userProfile });

    return (
        <div className="profile-section__header">
            <div className="profile-section__header-background">
                <ProfileHeaderBackground
                    isEditing={isEditing}
                    coverPictureUrl={coverPictureUrl}
                    defaultPicture={defaultPicture}
                    userProfile={userProfile}
                />
                <BgButtonsArea
                    startEditCoverPicture={startEditCoverPicture}
                    handleEditCoverPicture={handleEditCoverPicture}
                    handleCancelCoverPicture={handleCancelCoverPicture}
                />
            </div>
            <UserBanner userProfile={userProfile} />
        </div>
    );
};

export default ProfileHeader;
