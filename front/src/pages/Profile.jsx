import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import profileDefaultBg from "../assets/images/profile-default-bg.webp";
import { useState, useEffect } from "react";
import ProfilePostsSection from "../components/ProfilePostsSection";
import ProfileAlbumsSection from "../components/ProfileAlbumsSection";
import ProfileTripsSection from "../components/ProfileTripsSection";
import ProfileFriendsSection from "../components/ProfileFriendsSection";
import ProfileInfosSection from "../components/ProfileInfosSection";
import {
    FaUserCog,
    FaUserEdit,
    FaEdit,
    FaCheck,
    FaTimes,
} from "react-icons/fa";
import { useRef } from "react";
import { useWindowSize } from "../utils/functions/hooks";
import axios from "axios";
import { getJwtToken } from "../utils/functions/tools";
import { setCoverPictureInUserLoggedData } from "../features/userLoggedData.slice";

const Profile = () => {
    const [profileState, setProfileState] = useState("actuality");
    const [coverPicture, setCoverPicture] = useState("");
    const [coverPictureUrl, setCoverPictureUrl] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [defaultPicture, setDefaultPicture] = useState(true);

    const userProfile = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );
    const screenWidth = useWindowSize().width;
    const dispatch = useDispatch();
    const ref = useRef();
    let { token, userId } = getJwtToken();

    //This function displays the buttons handling the cover picture's editation
    //@Params { type: Object } => the param of the onClick event, only here to target an element on the DOM
    const showMeButtons = (e) => {
        const checkBtn = document.getElementById("cover-picture-validation");
        const timesBtn = document.getElementById("cover-picture-cancel");
        checkBtn.classList.add("active");
        timesBtn.classList.add("active");
        e.target.style.opacity = "1";
    };

    //This function handles the picture provided by the user
    //@Params { type: Object } => the param of the onChange event listening the input files
    //The first local state contains the file that will be send to the data base
    //The second one contains a blob url that will displays the picture directly in the DOM
    //And the final one is here to indicate to the app wich image it has to display
    const startEditCoverPicture = (e) => {
        setCoverPicture(e.target.files[0]);
        setCoverPictureUrl(URL.createObjectURL(e.target.files[0]));
        setIsEditing(true);
    };

    //This function is here to send the file to the data base
    //An object is made with the constructor FormData() to handle the file
    const handleEditCoverPicture = () => {
        const data = new FormData();
        data.append("file", coverPicture);
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/setCoverPicture/${userId}`,
            method: "put",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data.coverPicture);
                dispatch(
                    setCoverPictureInUserLoggedData(res.data.coverPicture)
                );
                setIsEditing(false);
                const checkBtn = document.getElementById(
                    "cover-picture-validation"
                );
                const timesBtn = document.getElementById(
                    "cover-picture-cancel"
                );
                checkBtn.classList.remove("active");
                timesBtn.classList.remove("active");
            })
            .catch((err) => console.log(err));
    };

    const handleCancelCoverPicture = () => {
        setCoverPicture("");
        setCoverPictureUrl("");
        setIsEditing(false);
        const checkBtn = document.getElementById("cover-picture-validation");
        const timesBtn = document.getElementById("cover-picture-cancel");
        checkBtn.classList.remove("active");
        timesBtn.classList.remove("active");
    };

    //This useEffect handles the position of the navigation bar of the profile section
    //His position is defined by the state of the component
    useEffect(() => {
        switch (profileState) {
            case "actuality":
                ref.current.style.transform = "translateX(0)";
                break;
            case "albums":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(110px)"
                        : "translateX(100%)";
                break;
            case "trips":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(220px)"
                        : "translateX(200%)";
                break;
            case "friends":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(330px)"
                        : "translateX(300%)";
                break;
            case "infos":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(440px)"
                        : "translateX(400%)";
                break;
            default:
                console.log("Bravo t'as r??ussi ?? faire bugger mon app fdp");
        }
        if (userProfile.coverPicture !== undefined) {
            setDefaultPicture(false);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [profileState, userProfile]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="profile-section">
            {/* <div className="fake-margin-replacing-header"></div> */}
            <div className="profile-section__header">
                <div className="profile-section__header-background">
                    {isEditing === true && (
                        <img
                            src={coverPictureUrl}
                            alt={"Photo de couverture de " + userProfile.pseudo}
                        />
                    )}
                    {isEditing === false && defaultPicture === true && (
                        <img
                            src={profileDefaultBg}
                            alt={
                                "Photo de couverture par d??faut de " +
                                userProfile.pseudo
                            }
                        />
                    )}
                    {isEditing === false && defaultPicture === false && (
                        <img
                            src={userProfile.coverPicture}
                            alt={"Photo de couverture de " + userProfile.pseudo}
                        />
                    )}
                    <div className="profile-section__header-background__buttons-area">
                        <form action="" encType="multipart/form-data">
                            <label
                                htmlFor="cover-picture"
                                onClick={(e) => showMeButtons(e)}
                            >
                                <FaEdit />
                            </label>
                            <input
                                type="file"
                                name="cover-picture"
                                id="cover-picture"
                                onChange={(e) => startEditCoverPicture(e)}
                            />
                            <span
                                id="cover-picture-validation"
                                onClick={() => handleEditCoverPicture()}
                            >
                                <FaCheck />
                            </span>
                            <span
                                id="cover-picture-cancel"
                                onClick={() => handleCancelCoverPicture()}
                            >
                                <FaTimes />
                            </span>
                        </form>
                    </div>
                </div>
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
                            <span>Modifier les param??tres </span>
                            <FaUserCog />
                        </Button>
                    </div>
                </div>
            </div>
            <nav className="profile-section__navigation">
                <ButtonGroup
                    className="profile-section__navigation__buttons-container"
                    variant="text"
                    aria-label="text button group"
                >
                    <Button
                        id="actuality"
                        onClick={(e) => setProfileState(e.target.id)}
                    >
                        Actu
                    </Button>
                    <Button
                        id="albums"
                        onClick={(e) => setProfileState(e.target.id)}
                    >
                        Albums
                    </Button>
                    <Button
                        id="trips"
                        onClick={(e) => setProfileState(e.target.id)}
                    >
                        Trips
                    </Button>
                    <Button
                        id="friends"
                        onClick={(e) => setProfileState(e.target.id)}
                    >
                        Amis
                    </Button>
                    <Button
                        id="infos"
                        onClick={(e) => setProfileState(e.target.id)}
                    >
                        Infos
                    </Button>
                </ButtonGroup>
                <span
                    ref={ref}
                    className="profile-section__navigation-bar"
                ></span>
            </nav>
            <div className="profile-section__main-content">
                {profileState === "actuality" && <ProfilePostsSection />}
                {profileState === "albums" && (
                    <ProfileAlbumsSection
                        isAuthor={true}
                        dataFrom={userProfile}
                    />
                )}
                {profileState === "trips" && (
                    <ProfileTripsSection
                        isAuthor={true}
                        dataFrom={userProfile}
                    />
                )}
                {profileState === "friends" && (
                    <ProfileFriendsSection
                        isAuthor={true}
                        dataFrom={userProfile}
                    />
                )}
                {profileState === "infos" && (
                    <ProfileInfosSection
                        isAuthor={true}
                        dataFrom={userProfile}
                    />
                )}
            </div>
        </main>
    );
};

export default Profile;
