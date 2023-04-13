import ProfileAlbumSectionModal from "./ProfileAlbumsSectionModal";

const AlbumContainer = ({ dataFrom }) => {
    return (
        <div className="profile-albums-section__album-container">
            <h2>{dataFrom.albums[0].name}</h2>
            <div className="profile-albums-section__pictures-container">
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
        </div>
    );
};

export default AlbumContainer;
