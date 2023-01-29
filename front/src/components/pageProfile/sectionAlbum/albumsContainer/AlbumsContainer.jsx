import ProfileAlbumSectionModal from "../ProfileAlbumsSectionModal";
import AlbumsContainerDesktop from "./AlbumsContainerDesktop";

const AlbumsContainer = ({ dataFrom, screenWidth }) => {
    return (
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
    );
};

export default AlbumsContainer;
