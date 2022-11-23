import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from "@mui/material";
import profileDefaultBg from '../assets/images/signup-carousel-bg4.jpeg';
import { useState } from 'react';
import FriendProfilePostsSection from '../components/FriendProfilePostsSection';
import ProfileAlbumsSection from '../components/ProfileAlbumsSection';
import ProfileTripsSection from '../components/ProfileTripsSection';
import ProfileFriendsSection from '../components/ProfileFriendsSection';
import FriendProfileInfosSection from '../components/FriendProfileInfosSection';
import { useEffect } from 'react';
import { FaRegEnvelope, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { getJwtToken } from '../utils/functions/tools';
import { pushFriendInUserLoggedData, splitThatFriendInUserLoggedData } from '../features/userLoggedData.slice';

const FriendProfile = () => {
    const [friendProfileState, setFriendProfileState] = useState("actuality");
    const [isFriend, setIsFriend] = useState(false);
    const friendProfile = useSelector((state) => state.friendDataStore.friendData[0]);
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const friendNavBar = document.getElementById('friend-nav-bar');
    const dispatch = useDispatch();
    let { userId, token } = getJwtToken();

    useEffect(() => {  
        if (friendNavBar !== null) {
            switch (friendProfileState) {
                case "actuality":
                    friendNavBar.style.transform = 'translateX(0)';
                    break;
                case "albums":
                    friendNavBar.style.transform = 'translateX(110px)';
                    break;
                case "trips":
                    friendNavBar.style.transform = 'translateX(220px)';
                    break;
                case "friends":
                    friendNavBar.style.transform = 'translateX(330px)';
                    break;
                case "infos":
                    friendNavBar.style.transform = 'translateX(440px)';
                    break;
                default:
                    console.log("Bravo t'as réussi à faire bugger mon app fdp")
            }
        }      
        if (userProfile.friends.includes(friendProfile.pseudo)) {
            setIsFriend(true);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [friendProfileState, userProfile])

    const handleNewFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo
        }
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/addFriend/${userId}`,
            method: "put", 
            data: data, 
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`,
            },
        
        })
        .then((res) => dispatch(pushFriendInUserLoggedData(friendProfile.pseudo)))
        .catch((err) => console.log(err));
    }

    const handleRemoveFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo
        }
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/removeFriend/${userId}`,
            method: "put", 
            data: data, 
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch(splitThatFriendInUserLoggedData(friendProfile.pseudo))
            setIsFriend(false);
        })
        .catch((err) => console.log(err));
    }

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
                            <img src={friendProfile.profilePicture} alt="img" />
                        </div>
                        <h2>{friendProfile.pseudo}</h2> 
                    </div>
                    <div className="profile-section__header__buttons-container">
                        {isFriend === false ? 
                            <Button variant='outlined' onClick={() => handleNewFriend()}>S'abonner<FaUserPlus /></Button>
                        :
                            <div className="profile-section__header__fake-btn" onClick={() => handleRemoveFriend()}>Abonné<FaUserCheck /></div>
                        }
                        <Button variant='outlined'>Messages<FaRegEnvelope /></Button>    
                    </div>
                </div>
            </div>
            <nav className="profile-section__navigation">
                <ButtonGroup className="profile-section__navigation__buttons-container" variant="text" aria-label="text button group">
                    <Button id="actuality" onClick={(e) => setFriendProfileState(e.target.id)}>Actualité</Button>
                    <Button id="albums" onClick={(e) => setFriendProfileState(e.target.id)}>Albums</Button>
                    <Button id="trips" onClick={(e) => setFriendProfileState(e.target.id)}>Voyages</Button>
                    <Button id="friends" onClick={(e) => setFriendProfileState(e.target.id)}>Amis</Button>
                    <Button id="infos" onClick={(e) => setFriendProfileState(e.target.id)}>Infos</Button>
                </ButtonGroup>
                <span id='friend-nav-bar' className="profile-section__navigation-bar"></span>
            </nav>
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