import { Button } from "@mui/material";
import React from "react";
import { FaUserCog, FaUserEdit } from "react-icons/fa";

const UserBanner = ({ userProfile }) => {
    return (
        <div className="profile-section__header__user-intro">
            <div className="profile-section__header__user-data">
                <div className="profile-section__header__profilePicture-container">
                    <img
                        src={userProfile.profilePicture}
                        alt={"Photo de profil de " + userProfile.pseudo}
                    />
                </div>
                <h2>{userProfile.pseudo}</h2>
            </div>
            <div className="profile-section__header__buttons-container">
                <Button variant="outlined">
                    <span>Modifier le profil </span>
                    <FaUserEdit />
                </Button>
                <Button variant="outlined">
                    <span>Modifier les paramètres </span>
                    <FaUserCog />
                </Button>
            </div>
        </div>
    );
};

export default UserBanner;