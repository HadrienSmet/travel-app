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
import { pullFollowingInUserLoggedData, pushFollowingInUserLoggedData } from '../features/userLoggedData.slice';
import { pullFollowerInFriendData, pushFollowerInFriendData } from '../features/friendData.slice';
import { useRef } from 'react';

const FriendProfile = () => {
    const [friendProfileState, setFriendProfileState] = useState("actuality");
    const [isFriend, setIsFriend] = useState(false);
    const friendProfile = useSelector((state) => state.friendDataStore.friendData);
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const dispatch = useDispatch();
    const ref = useRef();
    let { userId, token } = getJwtToken();

    //This useEffect handles the position of the navigation bar of the profile section
    //His position is defined by the state of the component
    useEffect(() => {  
        switch (friendProfileState) {
            case "actuality":
                ref.current.style.transform = 'translateX(0)';
                break;
            case "albums":
                ref.current.style.transform = 'translateX(110px)';
                break;
            case "trips":
                ref.current.style.transform = 'translateX(220px)';
                break;
            case "friends":
                ref.current.style.transform = 'translateX(330px)';
                break;
            case "infos":
                ref.current.style.transform = 'translateX(440px)';
                break;
            default:
                console.log("Bravo t'as réussi à faire bugger mon app fdp");
                break;
        }    
        if (userProfile.following.includes(friendProfile.pseudo)) {
            setIsFriend(true);
        }
        
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [friendProfileState, userProfile ])

    //This function handles the logic about following a user
    //Two calls to the API are required to complete his utility
    //The first call is here to put the pseudo of the friend inside the user's data
    //The second call is here to put the pseudo of the user inside the friend's data
    const handleNewFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo
        }
        let dataForFriend = {
            pseudo: userProfile.pseudo
        }
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/followUser/${userId}`,
            method: "put", 
            data: data, 
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch(pushFollowingInUserLoggedData(friendProfile.pseudo));
            axios({
                url: `${process.env.REACT_APP_API_URL}api/auth/newFollower/${friendProfile._id}`,
                method: "put", 
                data: dataForFriend, 
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("it worked perfectly well");
                dispatch(pushFollowerInFriendData(userProfile.pseudo));
            })
            // .catch(() => console.log("go back to school"));
        })
        .catch((err) => console.log(err));
    }

    //This function handles the logic about unfollowing a user
    //Two calls to the API are required to complete his utility
    //The first call is here to pull the pseudo of the friend from the user's data
    //The second call is here to pull the pseudo of the user from the friend's data
    const handleRemoveFriend = () => {
        let data = {
            pseudo: friendProfile.pseudo
        }
        let dataForFriend = {
            pseudo: userProfile.pseudo
        }
        axios({
            url: `${process.env.REACT_APP_API_URL}api/auth/unfollowUser/${userId}`,
            method: "put", 
            data: data, 
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${token}`,
            },
        })
        .then((res) => {
            dispatch(pullFollowingInUserLoggedData(friendProfile.pseudo))
            setIsFriend(false);
            axios({
                url: `${process.env.REACT_APP_API_URL}api/auth/lostFollower/${friendProfile._id}`,
                method: "put", 
                data: dataForFriend, 
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("it worked perfectly well");
                dispatch(pullFollowerInFriendData(userProfile.pseudo));
            })
            // .catch(() => console.log("go back to school"));
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
                <span ref={ref} id='friend-nav-bar' className="profile-section__navigation-bar"></span>
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