import FriendInfosSection from "./pageProfile/sectionInfo/FriendInfosSection";
import UserInfosSection from "./pageProfile/sectionInfo/UserInfosSection";

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
