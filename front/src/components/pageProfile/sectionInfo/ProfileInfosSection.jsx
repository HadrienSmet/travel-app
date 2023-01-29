import FriendInfosSection from "./FriendInfosSection";
import UserInfosSection from "./UserInfosSection";

const ProfileInfosSection = ({ dataFrom, isAuthor }) => {
    return (
        <div className="profile-infos-section">
            {isAuthor === true ? (
                <UserInfosSection dataFrom={dataFrom} />
            ) : (
                <FriendInfosSection dataFrom={dataFrom} />
            )}
        </div>
    );
};

export default ProfileInfosSection;
