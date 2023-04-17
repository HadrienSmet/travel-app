import InfosSection from "./InfosSection";

const ProfileInfosSection = ({ dataFrom, isAuthor }) => {
    return (
        <div className="profile-infos-section">
            {isAuthor === true ? (
                <InfosSection dataFrom={dataFrom} isAuthor={isAuthor} />
            ) : (
                <InfosSection
                    dataFrom={dataFrom.userData}
                    isAuthor={isAuthor}
                />
            )}
        </div>
    );
};

export default ProfileInfosSection;
