import { useSelector } from "react-redux";

const ProfileAlbumsSection = () => {
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    return (
        <div className='profile-albums-section'>
            {userProfile.albums.length === 1 
            ?
                <div className="profile-albums-section__album-container">
                    <h3>{userProfile.albums[0].name}</h3>
                <div className="profile-albums-section__pictures-container">
                    {userProfile.albums[0].pictures.map((picture, index) => (<img key={userProfile.albums[0].name + "-picture-" + index} src={picture} alt="img" />))}
                </div>
                </div> 
            :
                null
            }
        </div>
    );
};

export default ProfileAlbumsSection;