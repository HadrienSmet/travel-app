import { FaCamera, FaPlus } from "react-icons/fa";

const PicturesDisplayer = ({ albumPictureUrl, destination, year }) => {
    const pictureAreas = [];
    for (let i = 0; i < 12; i++) {
        pictureAreas.push(i);
    }
    return (
        <div
            className="add-album-modal__pictures-displayer"
            id="album-container"
        >
            {pictureAreas.map((area, index) => (
                <label
                    key={index}
                    htmlFor="trip-file"
                    className="add-album-modal__picture-area-label"
                >
                    <div className="add-album-modal__picture-area">
                        <FaCamera className="add-album-modal__camera-icon" />
                        <FaPlus className="add-album-modal__plus-icon" />
                    </div>
                </label>
            ))}
            <div className="add-album-modal__pictures-displayer--absolute">
                {albumPictureUrl !== undefined &&
                    albumPictureUrl.map((url) => (
                        <img
                            key={url}
                            src={url}
                            alt={
                                "Photo pour l'album " + destination + " " + year
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

export default PicturesDisplayer;
