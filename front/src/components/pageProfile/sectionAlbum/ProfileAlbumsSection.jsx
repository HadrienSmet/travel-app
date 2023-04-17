import { useWindowSize } from "../../../utils/hooks/hooks";

import ProfileAddAlbumModal from "./addAlbumModal/ProfileAddAlbumModal";
import AlbumsContainer from "./AlbumsContainer";

const ProfileAlbumsSection = ({ isAuthor, dataFrom }) => {
    const screenWidth = useWindowSize().width;

    return (
        <div className="profile-albums-section">
            {isAuthor === true ? <h2>Mes albums :</h2> : <h2>Ses albums :</h2>}
            <AlbumsContainer dataFrom={dataFrom} screenWidth={screenWidth} />
            {isAuthor === true && <ProfileAddAlbumModal />}
        </div>
    );
};

export default ProfileAlbumsSection;
