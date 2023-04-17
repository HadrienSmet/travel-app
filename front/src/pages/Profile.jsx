import { useState } from "react";
import { useSelector } from "react-redux";

import ProfilePostsSection from "../components/pageProfile/sectionPosts/ProfilePostsSection";
import ProfileAlbumsSection from "../components/pageProfile/sectionAlbum/ProfileAlbumsSection";
import ProfileTripsSection from "../components/pageProfile/sectionTrip/ProfileTripsSection";
import ProfileFriendsSection from "../components/pageProfile/sectionFriends/ProfileFriendsSection";
import ProfileInfosSection from "../components/pageProfile/sectionInfo/ProfileInfosSection";

import ProfileHeader from "../components/pageProfile/profileHeader/ProfileHeader";
import ProfileNavigation from "../components/pageProfile/profileHeader/ProfileNavigation";
import { useScrollTop } from "../utils/hooks/hooks";
import { getJwtToken } from "../utils/functions/tools/getJwtToken";

const useProfile = () => {
    const [profileState, setProfileState] = useState("actuality");
    useScrollTop();

    const handleProfileState = (state) => setProfileState(state);

    return {
        profileState,
        handleProfileState,
    };
};

const Profile = () => {
    const { profileState, handleProfileState } = useProfile();
    let { userId } = getJwtToken();
    const userProfile = useSelector(
        (state) => state.userLoggedDataStore.userLoggedData
    );

    return (
        <main className="profile-section">
            <ProfileHeader userProfile={userProfile} />
            <ProfileNavigation
                profileState={profileState}
                handleProfileState={handleProfileState}
            />
            <div className="profile-section__main-content">
                {profileState === "actuality" && (
                    <ProfilePostsSection userId={userId} />
                )}
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
