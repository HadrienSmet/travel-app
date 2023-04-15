import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";

const AlbumsContainer = ({ dataFrom }) => {
    return (
        <div className="profile-albums-section__albums-container">
            {dataFrom.albums.map((album, index) => (
                <div
                    key={index}
                    className="profile-albums-section__album-container"
                >
                    <h3>{album.name}</h3>
                    <div className="profile-albums-section__pictures-container">
                        <img
                            src={album.pictures[0]}
                            alt={"Première photo provenant de l'" + album.name}
                        />
                        <ProfileAlbumSectionModal album={album} index={index} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AlbumsContainer;
