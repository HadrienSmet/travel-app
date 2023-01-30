import profileDefaultBg from "../../../assets/images/profile-default-bg.webp";

const ProfileHeaderBackground = ({
    isEditing,
    coverPictureUrl,
    defaultPicture,
    userProfile,
}) => {
    return (
        <>
            {isEditing === true && (
                <img
                    src={coverPictureUrl}
                    alt={"Photo de couverture de " + userProfile.pseudo}
                />
            )}
            {isEditing === false && defaultPicture === true && (
                <img
                    src={profileDefaultBg}
                    alt={
                        "Photo de couverture par défaut de " +
                        userProfile.pseudo
                    }
                />
            )}
            {isEditing === false && defaultPicture === false && (
                <img
                    src={userProfile.coverPicture}
                    alt={"Photo de couverture de " + userProfile.pseudo}
                />
            )}
        </>
    );
};

export default ProfileHeaderBackground;
