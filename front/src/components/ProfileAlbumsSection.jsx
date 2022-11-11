import { useSelector } from "react-redux";
import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";

const ProfileAlbumsSection = () => {
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    return (
        <div className='profile-albums-section'>
            {userProfile.albums.length === 1 
            ?
                <div className="profile-albums-section__album-container">
                    <h3>{userProfile.albums[0].name}</h3>
                <div className="profile-albums-section__pictures-container">
                    {userProfile.albums[0].pictures.map((picture, index) => {
                        if (index === 3) {
                            return <div className="last-picture">
                                <img key={userProfile.albums[0].name + "-picture-" + index} src={picture} alt="img" />
                                <ProfileAlbumSectionModal album={userProfile.albums[0]} />
                            </div>
                            
                        } else if(index < 3)  {
                            return <img key={userProfile.albums[0].name + "-picture-" + index} src={picture} alt="img" />
                        }   else {
                            return null;
                        }
                    })}
                </div>
                </div> 
            :
                null
            }
        </div>
    );
};

export default ProfileAlbumsSection;