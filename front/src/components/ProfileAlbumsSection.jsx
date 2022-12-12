import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";
import ProfileAddAlbumModal from "./ProfileAddAlbumModal";
import { useState } from "react";
import { useWindowSize } from "../utils/functions/hooks";

const ProfileAlbumsSection = ({ isAuthor, dataFrom }) => {
    const [albumsArray, setAlbumsArray] = useState(undefined);
    const screenWidth = useWindowSize().width;

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
            {isAuthor === true ?
                <h1>Mes albums :</h1>
            :
                <h1>Ses albums :</h1>
            }
            {dataFrom.albums.length === 1 
            ?
                <div className="profile-albums-section__album-container">
                    <h2>{dataFrom.albums[0].name}</h2>
                    <div className="profile-albums-section__pictures-container">
                        {screenWidth > 1025 ? 
                            dataFrom.albums[0].pictures.map((picture, index) => {
                                if (index === 3 && dataFrom.albums[0].pictures.length > 4) {
                                    return <div className="last-picture">
                                        <img key={dataFrom.albums[0].name + "-picture-" + index} src={picture} alt="img" />
                                        <ProfileAlbumSectionModal album={dataFrom.albums[0]} index={index} />
                                    </div>
                                } else if (index === 3 && dataFrom.albums[0].pictures.length === 4) {
                                    return <img key={dataFrom.albums[0].name + "-picture-" + index} src={picture} alt="img" />
                                } else if(index < 3)  {
                                    return <img key={dataFrom.albums[0].name + "-picture-" + index} src={picture} alt="img" />
                                }   else {
                                    return null;
                                }
                            })
                        :
                            <div className="last-picture">
                                <img key={dataFrom.albums[0].name + "-picture-"} src={dataFrom.albums[0].pictures[0]} alt="img" />
                                <ProfileAlbumSectionModal album={dataFrom.albums[0]} index={0} />
                            </div>
                        }
                    </div>
                </div> 
            :
                <div className="profile-albums-section__albums-container">
                    {dataFrom.albums.map((album, index) => (
                        <div key={"album-container-" + index} className="profile-albums-section__album-container">
                            <h3 key={"album-name-" + index} >{album.name}</h3>
                            <div key={"album-container__pictures-container-" + index} className="profile-albums-section__pictures-container">
                                {screenWidth > 1025 ? 
                                    album.pictures.map((picture, index) => {
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
                                    })
                                :
                                    <div className="last-picture">
                                        <img key={album.name + "modal-shower"} src={album.pictures[0]} alt="img" />
                                        <ProfileAlbumSectionModal album={album} index={index} />
                                    </div>
                                }
                            </div>
                        </div>
                    ))}   
                </div>
            }
            {isAuthor === true && <ProfileAddAlbumModal changeAlbumsArray={changeAlbumsArray} />}
        </div>
    );
};

export default ProfileAlbumsSection;