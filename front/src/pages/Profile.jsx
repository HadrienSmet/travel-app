import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProfilePostsSection from "../components/pageProfile/sectionPosts/ProfilePostsSection";
import ProfileAlbumsSection from "../components/pageProfile/sectionAlbum/ProfileAlbumsSection";
import ProfileTripsSection from "../components/pageProfile/sectionTrip/ProfileTripsSection";
import ProfileFriendsSection from "../components/pageProfile/sectionFriends/ProfileFriendsSection";
import ProfileInfosSection from "../components/pageProfile/sectionInfo/ProfileInfosSection";

import ProfileHeader from "../components/pageProfile/profileHeader/ProfileHeader";
import ProfileNavigation from "../components/pageProfile/profileHeader/ProfileNavigation";

const useProfile = () => {
    const [profileState, setProfileState] = useState("actuality");

    const handleProfileState = (state) => setProfileState(state);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return {
        profileState,
        handleProfileState,
    };
};

const Profile = () => {
    const { profileState, handleProfileState } = useProfile();
    const userProfile = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );

    return (
        <main className="profile-section">
            {/* <div className="fake-margin-replacing-header"></div> */}
            <ProfileHeader userProfile={userProfile} />
            <ProfileNavigation
                profileState={profileState}
                handleProfileState={handleProfileState}
            />
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
