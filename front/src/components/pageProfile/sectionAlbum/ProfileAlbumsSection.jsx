import { useState } from "react";

import { useWindowSize } from "../../../utils/hooks/hooks";

import ProfileAddAlbumModal from "./addAlbumModal/ProfileAddAlbumModal";
import AlbumsContainer from "./AlbumsContainer";

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
            {isAuthor === true ? <h2>Mes albums :</h2> : <h2>Ses albums :</h2>}
            <AlbumsContainer dataFrom={dataFrom} screenWidth={screenWidth} />
            {isAuthor === true && (
                <ProfileAddAlbumModal changeAlbumsArray={changeAlbumsArray} />
            )}
        </div>
    );
};

export default ProfileAlbumsSection;
