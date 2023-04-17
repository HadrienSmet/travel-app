import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { BsXLg } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import MUIInputCountry from "../../../mui/MUIInputCountry";
import MUIInputNumbers from "../../../mui/MUIInputNumbers";
import MUIInputSelect from "../../../mui/MUIInputSelect";
import ChildModal from "./ChildModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    bgcolor: "rgba(255, 255, 255, 0.65)",
    borderRadius: "15px",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.3)",
    pt: 2,
    px: 4,
    pb: 3,
};

export const durations = [
    "1 Mois",
    "2 Mois",
    "3 Mois",
    "4 Mois",
    "5 Mois",
    "6 Mois",
    "7 Mois",
    "8 Mois",
    "9 Mois",
    "10 Mois",
    "11 Mois",
    "1 Ans",
    "2 Ans",
    "3 Ans",
    "Je me suis perdu",
];

export const withFriendsChoices = [
    "Seul(e)",
    "En couple",
    "Aves des ami(e)s",
    "En famille",
];

const useParentModal = ({ changeTrips }) => {
    const [open, setOpen] = useState(false);
    const [prevTripsData, setPrevTripsData] = useState({
        destination: "",
        duration: "",
        year: "",
        choice: "",
        details: "",
    });
    const albumData = useSelector(
        (state) => state.albumObjectArrayStore.albumObjectArray
    );

    const handleOpen = (boolean) => setOpen(boolean);
    const changeCountry = (country) =>
        setPrevTripsData({ ...prevTripsData, destination: country });
    const changeDuration = (duration) =>
        setPrevTripsData({
            ...prevTripsData,
            duration: duration,
        });
    const changeNumber = (year) =>
        setPrevTripsData({ ...prevTripsData, year: year });
    const changeChoice = (choice) =>
        setPrevTripsData({ ...prevTripsData, choice: choice });
    const handleDetails = (e) =>
        setPrevTripsData({
            ...prevTripsData,
            details: e.target.value,
        });

    //This functions handle the submission of the data provided by the two modals
    //Creates an object called trip that will contain all the data and gives it to his parent thanks to the function herited by him
    const handlePreviousTripSubmission = () => {
        if (prevTripsData.destination.match(/\$<>=\+\*/i)) {
            alert("Les caractères suivants ne sont pas tolérés. $ > < = + *");
        } else {
            if (albumData !== []) {
                let trip = {
                    destination: prevTripsData.destination,
                    year: prevTripsData.year,
                    duration: prevTripsData.duration,
                    withWho: prevTripsData.choice,
                    details: prevTripsData.details,
                    album: { ...albumData },
                };
                changeTrips(trip);
            }
        }
    };
    //This function changes the state of the component in order to close the parent modal
    //Then it calls a function that will handles the submission of the datas
    const handleClose = () => {
        handleOpen(false);
        handlePreviousTripSubmission();
    };

    return {
        albumData,
        open,
        prevTripsData,
        handleOpen,
        changeCountry,
        changeDuration,
        changeNumber,
        changeChoice,
        handleDetails,
        handleClose,
    };
};

const ParentModal = ({ changeAlbumsArray, changeTrips }) => {
    const {
        albumData,
        open,
        prevTripsData,
        handleOpen,
        changeCountry,
        changeDuration,
        changeNumber,
        changeChoice,
        handleDetails,
        handleClose,
    } = useParentModal({ changeTrips });

    return (
        <div>
            <Button variant="outlined" onClick={() => handleOpen(true)}>
                <span>Ajouter un voyage</span>
                <FaPlus />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box className="trip-modal" sx={{ ...style }}>
                    <div className="trip-modal__header">
                        <h3>Ajouter un voyage</h3>
                        <BsXLg onClick={() => handleOpen(false)} />
                    </div>
                    <div className="trip-modal__content">
                        <div className="trip-modal__inputs-area">
                            <span>Quelle était la destination?</span>
                            <MUIInputCountry
                                dynamicClass={"trip-modal__input-destination"}
                                dynamicPlaceholder={"Destination"}
                                changeCountry={changeCountry}
                            />
                            <span>Pendant combien de temps?</span>
                            <MUIInputSelect
                                dynamicClass="trip-modal__input-duration"
                                dynamicPlaceholder="Durée"
                                choices={durations}
                                changeChoice={changeDuration}
                            />
                            <span>En quelle année?</span>
                            <MUIInputNumbers
                                changeNumber={changeNumber}
                                minNumber={1980}
                                maxNumber={2023}
                                dynamicClass="trip-modal__input-year"
                                dynamicPlaceholder="Année"
                            />
                            <span>Avec qui?</span>
                            <MUIInputSelect
                                dynamicClass="trip-modal__input-accompanied"
                                dynamicPlaceholder="Accompagné(e)"
                                choices={withFriendsChoices}
                                changeChoice={changeChoice}
                            />
                        </div>
                        <div className="trip-modal__description-area">
                            <span>Donne nous des détails!</span>
                            <TextField
                                id="outlined-textarea"
                                label="Lieux, expériences, ..."
                                placeholder="Placeholder"
                                multiline
                                onChange={(e) => handleDetails(e)}
                            />
                            <div className="trip-modal__album-container">
                                {albumData !== [] &&
                                    albumData.map((album, index) => (
                                        <div
                                            key={"divsion-" + index}
                                            className="trip-modal-album"
                                        >
                                            <h4 key={"title-" + index}>
                                                {album.name}
                                            </h4>
                                            <div
                                                key={"child-divsion-" + index}
                                                className="trip-modal-album__pictures-container"
                                            >
                                                {album.urls.map(
                                                    (url, index) => (
                                                        <img
                                                            key={"url" + index}
                                                            src={url}
                                                            alt={
                                                                index +
                                                                1 +
                                                                "e photo provenant de l'" +
                                                                album.name
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="trip-modal__buttons-row">
                        {albumData[0] !== undefined ? (
                            <Button variant="outlined" onClick={handleClose}>
                                Confirmer
                            </Button>
                        ) : (
                            <ChildModal
                                key="extra-child-modal"
                                prevTripsData={prevTripsData}
                                changeAlbumsArray={changeAlbumsArray}
                            />
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ParentModal;
