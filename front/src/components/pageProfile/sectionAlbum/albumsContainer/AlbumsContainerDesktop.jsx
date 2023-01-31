import ProfileAlbumSectionModal from "../ProfileAlbumsSectionModal";

const AlbumsContainerDesktop = ({ album }) => {
    return (
        <>
            {album.pictures.map((picture, index) => {
                if (index === 3 && album.pictures.length > 4) {
                    return (
                        <div
                            key={"last-picture-container-" + album.name}
                            className="last-picture"
                        >
                            <img
                                src={picture}
                                alt={"4e photo de l'" + album.name}
                            />
                            <ProfileAlbumSectionModal
                                index={index}
                                album={album}
                            />
                        </div>
                    );
                } else if (index === 3 && album.pictures.length === 4) {
                    return (
                        <img
                            key={album.name + "-picture-" + index}
                            src={picture}
                            alt={"Dernière photo provenant de l'" + album.name}
                        />
                    );
                } else if (index < 3) {
                    return (
                        <img
                            key={album.name + "-picture-" + index}
                            src={picture}
                            alt={
                                index +
                                1 +
                                "e photo provenant de l'" +
                                album.name
                            }
                        />
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
};

export default AlbumsContainerDesktop;
