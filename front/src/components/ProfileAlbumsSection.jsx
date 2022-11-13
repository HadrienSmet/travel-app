import { useSelector } from "react-redux";
import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";
import { Button } from "@mui/material";

const ProfileAlbumsSection = () => {
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    return (
        <div className='profile-albums-section'>
            <h2>Mes albums:</h2>
            {userProfile.albums.length === 1 
            ?
                <div className="profile-albums-section__album-container">
                    <h3>{userProfile.albums[0].name}</h3>
                    <div className="profile-albums-section__pictures-container">
                        {userProfile.albums[0].pictures.map((picture, index) => {
                            if (index === 3 && userProfile.albums[0].pictures.length > 4) {
                                return <div className="last-picture">
                                    <ProfileAlbumSectionModal album={userProfile.albums[0]} />
                                </div>
                            } else if (index === 3 && userProfile.albums[0].pictures.length === 4) {
                                return <img key={userProfile.albums[0].name + "-picture-" + index} src={picture} alt="img" />
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
            <Button variant="outlined">Créer un nouvel album</Button>
        </div>
    );
};

export default ProfileAlbumsSection;