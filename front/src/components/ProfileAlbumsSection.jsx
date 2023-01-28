import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";
import ProfileAddAlbumModal from "./ProfileAddAlbumModal";
import { useState } from "react";
import { useWindowSize } from "../utils/functions/hooks";
import AlbumContainerDesktop from "./pageProfile/sectionAlbum/AlbumContainerDesktop";
import AlbumsContainerDesktop from "./pageProfile/sectionAlbum/AlbumsContainerDesktop";

const useProfileAlbumSection = () => {
    const [albumsArray, setAlbumsArray] = useState(undefined);

    //This function is here to allow the child modal to change the state of this component
    //@Params { Type: Array } --> Array of objects. Each objects represents an album and has a key for the name and a key for all the pictures url
    const changeAlbumsArray = (array) => {
        let albumsContainer;
        if (albumsArray === undefined) {
            albumsContainer = [array];
        } else {
            albumsContainer = [...albumsArray, array];
        }
        setAlbumsArray(albumsContainer);
    };

    return {
        changeAlbumsArray,
    };
};

const ProfileAlbumsSection = ({ isAuthor, dataFrom }) => {
    const { changeAlbumsArray } = useProfileAlbumSection();
    const screenWidth = useWindowSize().width;

    return (
        <div className="profile-albums-section">
            {isAuthor === true ? <h1>Mes albums :</h1> : <h1>Ses albums :</h1>}
            {dataFrom.albums.length === 1 ? (
                <div className="profile-albums-section__album-container">
                    <h2>{dataFrom.albums[0].name}</h2>
                    <div className="profile-albums-section__pictures-container">
                        {screenWidth > 1025 ? (
                            <AlbumContainerDesktop dataFrom={dataFrom} />
                        ) : (
                            <div className="last-picture">
                                <img
                                    key={dataFrom.albums[0].name + "-picture-"}
                                    src={dataFrom.albums[0].pictures[0]}
                                    alt={
                                        "Première photo provenant de l" +
                                        dataFrom.albums[0].name
                                    }
                                />
                                <ProfileAlbumSectionModal
                                    album={dataFrom.albums[0]}
                                    index={0}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="profile-albums-section__albums-container">
                    {dataFrom.albums.map((album, index) => (
                        <div
                            key={index}
                            className="profile-albums-section__album-container"
                        >
                            <h3>{album.name}</h3>
                            <div className="profile-albums-section__pictures-container">
                                {screenWidth > 1025 ? (
                                    <AlbumsContainerDesktop album={album} />
                                ) : (
                                    <div className="last-picture">
                                        <img
                                            src={album.pictures[0]}
                                            alt={
                                                "Première photo provenant de l'" +
                                                album.name
                                            }
                                        />
                                        <ProfileAlbumSectionModal
                                            album={album}
                                            index={index}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isAuthor === true && (
                <ProfileAddAlbumModal changeAlbumsArray={changeAlbumsArray} />
            )}
        </div>
    );
};

export default ProfileAlbumsSection;
