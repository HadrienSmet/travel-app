import { useSelector } from "react-redux";
import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";
import ProfileAddAlbumModal from "./ProfileAddAlbumModal";
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
                <div className="profile-albums-section__albums-container">
                    {userProfile.albums.map((album, index) => (
                        <div key={"album-container-" + index} className="profile-albums-section__album-container">
                            <h3 key={"album-name-" + index} >{album.name}</h3>
                            <div key={"album-container__pictures-container-" + index} className="profile-albums-section__pictures-container">
                                {album.pictures.map((picture, index) => {
                                    if (index === 3 && album.pictures.length > 4) {
                                        return <div key={"last-picture-container-" + album.name} className="last-picture">
                                            <img key={album.name + "-picture-" + index} src={picture} alt="img" />
                                            <ProfileAlbumSectionModal key={"last-picture-btn-modal__album-" + album.name} index={index} album={album} />
                                        </div>
                                    } else if (index === 3 && album.pictures.length === 4) {
                                        return <img key={album.name + "-picture-" + index} src={picture} alt="img" />
                                    } else if(index < 3)  {
                                        return <img key={album.name + "-picture-" + index} src={picture} alt="img" />
                                    }   else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                    ))}   
                </div>
            }
            <ProfileAddAlbumModal changeAlbumsArray={changeAlbumsArray} />
        </div>
    );
};

export default ProfileAlbumsSection;