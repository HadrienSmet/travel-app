import { useSelector } from "react-redux";
import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";
import ProfileAlbumModal from "./ProfileAlbumModal";
import { useState } from "react";

const ProfileAlbumsSection = () => {
    const userProfile = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    const [albumsArray, setAlbumsArray] = useState(undefined);

    //This function is here to allow the child modal to change the state of this component
    //@Params { Type: Array } --> Array of objects. Each objects represents an album and has a key for the name and a key for all the pictures url
    const changeAlbumsArray = (array) => {
        let albumsContainer;
        if (albumsArray === undefined) {
            albumsContainer = [array];
        } else {
            albumsContainer = [...albumsArray, array]
        }
        setAlbumsArray(albumsContainer);
        console.log(albumsArray);
    }

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
            <ProfileAlbumModal changeAlbumsArray={changeAlbumsArray} />
        </div>
    );
};

export default ProfileAlbumsSection;