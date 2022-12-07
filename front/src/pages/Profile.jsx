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
import { useRef } from 'react';
import { useWindowSize } from '../utils/functions/hooks';

const Profile = () => {
    const [profileState, setProfileState] = useState("actuality");
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const screenWidth = useWindowSize().width;
    const ref = useRef();

    //This useEffect handles the position of the navigation bar of the profile section
    //His position is defined by the state of the component
    useEffect(() => {
        switch (profileState) {
            case "actuality":
                ref.current.style.transform =  'translateX(0)';
                break;
            case "albums":
                ref.current.style.transform = screenWidth > 768 ?  'translateX(110px)' : 'translateX(100%)';
                break;
            case "trips":
                ref.current.style.transform = screenWidth > 768 ? 'translateX(220px)' : 'translateX(200%)';
                break;
            case "friends":
                ref.current.style.transform = screenWidth > 768 ? 'translateX(330px)' : 'translateX(300%)';
                break;
            case "infos":
                ref.current.style.transform = screenWidth > 768 ? 'translateX(440px)' : 'translateX(400%)';
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
                        <Button variant='outlined'><span>Modifier le profil </span><FaUserEdit /></Button>
                        <Button variant='outlined'><span>Modifier les paramètres </span><FaUserCog /></Button>
                    </div>
                </div>
            </div>
            <nav className="profile-section__navigation">
                <ButtonGroup className="profile-section__navigation__buttons-container" variant="text" aria-label="text button group">
                    <Button id="actuality" onClick={(e) => setProfileState(e.target.id)}>Actu</Button>
                    <Button id="albums" onClick={(e) => setProfileState(e.target.id)}>Albums</Button>
                    <Button id="trips" onClick={(e) => setProfileState(e.target.id)}>Trips</Button>
                    <Button id="friends" onClick={(e) => setProfileState(e.target.id)}>Amis</Button>
                    <Button id="infos" onClick={(e) => setProfileState(e.target.id)}>Infos</Button>
                </ButtonGroup>
                <span ref={ref} className="profile-section__navigation-bar"></span>
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