import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import FriendProfilePostsSection from "../components/pageFriendProfile/FriendProfilePostsSection";
import ProfileAlbumsSection from "../components/pageProfile/sectionAlbum/ProfileAlbumsSection";
import ProfileTripsSection from "../components/pageProfile/sectionTrip/ProfileTripsSection";
import ProfileFriendsSection from "../components/pageProfile/sectionFriends/ProfileFriendsSection";
import ProfileInfosSection from "../components/pageProfile/sectionInfo/ProfileInfosSection";
import FriendProfileHeader from "../components/pageFriendProfile/FriendProfileHeader";
import FriendProfileNavigation from "../components/pageFriendProfile/FriendProfileNavigation";

const useFriendProfile = () => {
    const [friendProfileState, setFriendProfileState] = useState("actuality");

    const changeFriendProfileState = (state) => setFriendProfileState(state);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            <FriendProfileNavigation
                friendProfileState={friendProfileState}
                changeFriendProfileState={changeFriendProfileState}
            />
            <div className="profile-section__main-content">
                {friendProfileState === "actuality" && (
                    <FriendProfilePostsSection friendProfile={friendProfile} />
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
