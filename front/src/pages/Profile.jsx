import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from "@mui/material";
import profileDefaultBg from '../assets/images/signup-carousel-bg4.jpeg';
import { useState } from 'react';
import ProfilePostsSection from '../components/ProfilePostsSection';
import ProfileAlbumsSection from '../components/ProfileAlbumsSection';
import ProfileTripsSection from '../components/ProfileTripsSection';
import ProfileFriendsSection from '../components/ProfileFriendsSection';
import ProfileInfosSection from '../components/ProfileInfosSection';

const Profile = () => {
    const [profileState, setProfileState] = useState("actuality");
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    return (
        <section className='profile-section'>
            <div className="fake-margin-replacing-header"></div>
            <div className="profile-section__header">
                <div className="profile-section__header-background">
                    <img src={profileDefaultBg} alt="img" />
                </div>
                <div className="profile-section__header__user-intro">
                    <div className="profile-section__header__profilePicture-container">
                        <img src={userProfile.profilePicture} alt="img" />
                    </div>
                    <h2>{userProfile.pseudo}</h2> 
                    <nav className="profile-section__navigation">
                        <ButtonGroup className="profile-section__navigation__buttons-container" variant="text" aria-label="text button group">
                            <Button id="actuality" onClick={(e) => setProfileState(e.target.id)}>Actualité</Button>
                            <Button id="albums" onClick={(e) => setProfileState(e.target.id)}>Albums</Button>
                            <Button id="trips" onClick={(e) => setProfileState(e.target.id)}>Voyages</Button>
                            <Button id="friends" onClick={(e) => setProfileState(e.target.id)}>Amis</Button>
                            <Button id="infos" onClick={(e) => setProfileState(e.target.id)}>Infos</Button>
                        </ButtonGroup>
                    </nav>
                </div>
            </div>
            <div className="profile-section__main-content">
                {profileState === "actuality" && <ProfilePostsSection />}
                {profileState === "albums" && <ProfileAlbumsSection />}
                {profileState === "trips" && <ProfileTripsSection />}
                {profileState === "friends" && <ProfileFriendsSection />}
                {profileState === "infos" && <ProfileInfosSection />}
            </div>
        </section>
    );
};

export default Profile;