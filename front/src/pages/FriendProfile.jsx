import { useState } from "react";

import { useSelector } from "react-redux";

import ProfilePostsSection from "../components/pageProfile/sectionPosts/ProfilePostsSection";
import ProfileAlbumsSection from "../components/pageProfile/sectionAlbum/ProfileAlbumsSection";
import ProfileTripsSection from "../components/pageProfile/sectionTrip/ProfileTripsSection";
import ProfileFriendsSection from "../components/pageProfile/sectionFriends/ProfileFriendsSection";
import ProfileInfosSection from "../components/pageProfile/sectionInfo/ProfileInfosSection";
import FriendProfileHeader from "../components/pageFriendProfile/FriendProfileHeader";
import ProfileNavigation from "../components/pageProfile/profileHeader/ProfileNavigation";
import { useScrollTop } from "../utils/hooks/hooks";

const useFriendProfile = () => {
    const [friendProfileState, setFriendProfileState] = useState("actuality");

    const changeFriendProfileState = (state) => setFriendProfileState(state);
    useScrollTop();

    return {
        friendProfileState,
        changeFriendProfileState,
    };
};

const FriendProfile = () => {
    const friendProfile = useSelector(
        (state) => state.friendDataStore.friendData
    );
    const { friendProfileState, changeFriendProfileState } = useFriendProfile();

    return (
        <main className="profile-section">
            <FriendProfileHeader />
            <ProfileNavigation
                profileState={friendProfileState}
                handleProfileState={changeFriendProfileState}
            />
            <div className="profile-section__main-content">
                {friendProfileState === "actuality" && (
                    <ProfilePostsSection userId={friendProfile._id} />
                )}
                {friendProfileState === "albums" && (
                    <ProfileAlbumsSection
                        isAuthor={false}
                        dataFrom={friendProfile}
                    />
                )}
                {friendProfileState === "trips" && (
                    <ProfileTripsSection
                        isAuthor={false}
                        dataFrom={friendProfile}
                    />
                )}
                {friendProfileState === "friends" && (
                    <ProfileFriendsSection
                        isAuthor={false}
                        dataFrom={friendProfile}
                    />
                )}
                {friendProfileState === "infos" && (
                    <ProfileInfosSection
                        isAuthor={false}
                        dataFrom={friendProfile}
                    />
                )}
            </div>
        </main>
    );
};

export default FriendProfile;
