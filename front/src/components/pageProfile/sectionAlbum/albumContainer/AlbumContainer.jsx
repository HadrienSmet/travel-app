import React from "react";
import ProfileAlbumSectionModal from "../ProfileAlbumsSectionModal";
import AlbumContainerDesktop from "./AlbumContainerDesktop";

const AlbumContainer = ({ dataFrom, screenWidth }) => {
    return (
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
    );
};

export default AlbumContainer;
