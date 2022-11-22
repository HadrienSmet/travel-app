import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from "@mui/material";
import profileDefaultBg from '../assets/images/signup-carousel-bg4.jpeg';
import { useState } from 'react';
import FriendProfilePostsSection from '../components/FriendProfilePostsSection';
import ProfileAlbumsSection from '../components/ProfileAlbumsSection';
import ProfileTripsSection from '../components/ProfileTripsSection';
import ProfileFriendsSection from '../components/ProfileFriendsSection';
import FriendProfileInfosSection from '../components/FriendProfileInfosSection';

const FriendProfile = () => {
    const [friendProfileState, setFriendProfileState] = useState("actuality");
    const friendProfile = useSelector((state) => state.friendDataStore.friendData[0]);
    

    return (
        <main className='profile-section'>
            <div className="fake-margin-replacing-header"></div>
            <div className="profile-section__header">
                <div className="profile-section__header-background">
                    <img src={profileDefaultBg} alt="img" />
                </div>
                <div className="profile-section__header__user-intro">
                    <div className="profile-section__header__profilePicture-container">
                        <img src={friendProfile.profilePicture} alt="img" />
                    </div>
                    <h2>{friendProfile.pseudo}</h2> 
                    <nav className="profile-section__navigation">
                        <ButtonGroup className="profile-section__navigation__buttons-container" variant="text" aria-label="text button group">
                            <Button id="actuality" onClick={(e) => setFriendProfileState(e.target.id)}>Actualité</Button>
                            <Button id="albums" onClick={(e) => setFriendProfileState(e.target.id)}>Albums</Button>
                            <Button id="trips" onClick={(e) => setFriendProfileState(e.target.id)}>Voyages</Button>
                            <Button id="friends" onClick={(e) => setFriendProfileState(e.target.id)}>Amis</Button>
                            <Button id="infos" onClick={(e) => setFriendProfileState(e.target.id)}>Infos</Button>
                        </ButtonGroup>
                    </nav>
                </div>
            </div>
            <div className="profile-section__main-content">
                {friendProfileState === "actuality" && <FriendProfilePostsSection friendProfile={friendProfile} />}
                {friendProfileState === "albums" && <ProfileAlbumsSection isAuthor={false} dataFrom={friendProfile} />}
                {friendProfileState === "trips" && <ProfileTripsSection isAuthor={false} dataFrom={friendProfile} />}
                {friendProfileState === "friends" && <ProfileFriendsSection isAuthor={false} dataFrom={friendProfile} />}
                {friendProfileState === "infos" && <FriendProfileInfosSection isAuthor={false} dataFrom={friendProfile} />}
            </div>
        </main>
    );
};

export default FriendProfile;