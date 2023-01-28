import React from "react";
import ProfileAlbumSectionModal from "../../ProfileAlbumsSectionModal";

const AlbumContainerDesktop = ({ dataFrom }) => {
    return (
        <>
            {dataFrom.albums[0].pictures.map((picture, index) => {
                if (index === 3 && dataFrom.albums[0].pictures.length > 4) {
                    return (
                        <div
                            className="last-picture"
                            key={dataFrom.albums[0].name + "-picture-" + index}
                        >
                            <img
                                src={picture}
                                alt={"4e photo de l'" + dataFrom.albums[0].name}
                            />
                            <ProfileAlbumSectionModal
                                album={dataFrom.albums[0]}
                                index={index}
                            />
                        </div>
                    );
                } else if (
                    index === 3 &&
                    dataFrom.albums[0].pictures.length === 4
                ) {
                    return (
                        <img
                            key={dataFrom.albums[0].name + "-picture-" + index}
                            src={picture}
                            alt={
                                "Dernière photo de l'" + dataFrom.albums[0].name
                            }
                        />
                    );
                } else if (index < 3) {
                    return (
                        <img
                            key={dataFrom.albums[0].name + "-picture-" + index}
                            src={picture}
                            alt={
                                index +
                                1 +
                                "e photo de l'" +
                                dataFrom.albums[0].name
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

export default AlbumContainerDesktop;
