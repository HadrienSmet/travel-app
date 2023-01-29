import MUIInputCountry from "../../../mui/MUIInputCountry";
import MUIInputNumbers from "../../../mui/MUIInputNumbers";
import PicturesDisplayer from "./PicturesDisplayer";

const AlbumForm = ({
    changeCountry,
    changeNumber,
    handleAlbumPicture,
    albumPictureUrl,
    destination,
    year,
}) => {
    return (
        <form action="" encType="multipart/form-data">
            <div className="add-album-modal__same-row">
                <div className="add-album-modal__country-field">
                    <p>Dans quel pays êtiez-vous parti?</p>
                    <MUIInputCountry
                        dynamicClass="add-album-modal__input-country"
                        dynamicPlaceholder="Pays"
                        changeCountry={changeCountry}
                    />
                </div>
                <div className="add-album-modal__input-year">
                    <p>En quelle année?</p>
                    <MUIInputNumbers
                        changeNumber={changeNumber}
                        minNumber={1980}
                        maxNumber={2023}
                        dynamicClass="add-album-modal__input-year"
                        dynamicPlaceholder="Année"
                    />
                </div>
            </div>
            <input
                type="file"
                name="file"
                id="trip-file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleAlbumPicture(e)}
            />
            <PicturesDisplayer
                albumPictureUrl={albumPictureUrl}
                destination={destination}
                year={year}
            />
        </form>
    );
};

export default AlbumForm;
