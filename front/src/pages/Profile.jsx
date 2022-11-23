import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from "@mui/material";
import profileDefaultBg from '../assets/images/signup-carousel-bg4.jpeg';
import { useState, useEffect } from 'react';
import ProfilePostsSection from '../components/ProfilePostsSection';
import ProfileAlbumsSection from '../components/ProfileAlbumsSection';
import ProfileTripsSection from '../components/ProfileTripsSection';
import ProfileFriendsSection from '../components/ProfileFriendsSection';
import ProfileInfosSection from '../components/ProfileInfosSection';
import { FaUserCog, FaUserEdit } from 'react-icons/fa';

const Profile = () => {
    const [profileState, setProfileState] = useState("actuality");
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const navBar = document.querySelector('.profile-section__navigation-bar');

    useEffect(() => {
        switch (profileState) {
            case "actuality":
                navBar.style.transform = 'translateX(0)';
                break;
            case "albums":
                navBar.style.transform = 'translateX(110px)';
                break;
            case "trips":
                navBar.style.transform = 'translateX(220px)';
                break;
            case "friends":
                navBar.style.transform = 'translateX(330px)';
                break;
            case "infos":
                navBar.style.transform = 'translateX(440px)';
                break;
            default:
                console.log("Bravo t'as réussi à faire bugger mon app fdp")
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [profileState])

    return (
        <main className='profile-section'>
            <div className="fake-margin-replacing-header"></div>
            <div className="profile-section__header">
                <div className="profile-section__header-background">
                    <img src={profileDefaultBg} alt="img" />
                </div>
                <div className="profile-section__header__user-intro">
                    <div className="profile-section__header__user-data">
                        <div className="profile-section__header__profilePicture-container">
                            <img src={userProfile.profilePicture} alt="img" />
                        </div>
                        <h2>{userProfile.pseudo}</h2> 
                    </div>
                    <div className="profile-section__header__buttons-container">
                        <Button variant='outlined'>Modifier le profil <FaUserEdit /></Button>
                        <Button variant='outlined'>Modifier les paramètres <FaUserCog /></Button>
                    </div>
                </div>
            </div>
            <nav className="profile-section__navigation">
                <ButtonGroup className="profile-section__navigation__buttons-container" variant="text" aria-label="text button group">
                    <Button id="actuality" onClick={(e) => setProfileState(e.target.id)}>Actualité</Button>
                    <Button id="albums" onClick={(e) => setProfileState(e.target.id)}>Albums</Button>
                    <Button id="trips" onClick={(e) => setProfileState(e.target.id)}>Voyages</Button>
                    <Button id="friends" onClick={(e) => setProfileState(e.target.id)}>Amis</Button>
                    <Button id="infos" onClick={(e) => setProfileState(e.target.id)}>Infos</Button>
                </ButtonGroup>
                <span className="profile-section__navigation-bar"></span>
            </nav>
            <div className="profile-section__main-content">
                {profileState === "actuality" && <ProfilePostsSection />}
                {profileState === "albums" && <ProfileAlbumsSection isAuthor={true} dataFrom={userProfile} />}
                {profileState === "trips" && <ProfileTripsSection isAuthor={true} dataFrom={userProfile} />}
                {profileState === "friends" && <ProfileFriendsSection isAuthor={true} dataFrom={userProfile} />}
                {profileState === "infos" && <ProfileInfosSection isAuthor={true} dataFrom={userProfile} />}
            </div>
        </main>
    );
};

export default Profile;