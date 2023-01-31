import { useState } from "react";
import { useDispatch } from "react-redux";
import { pushTripInUserLoggedData } from "../../../features/userLoggedData.slice";
import { getJwtToken } from "../../../utils/functions/tools/getJwtToken";
import { axiosCreateTrip } from "../../../utils/functions/user/axiosCreateTrip";

import { Button, Modal, Box, TextField } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import MUIInputCountry from "../../mui/MUIInputCountry";
import MUIInputNumbers from "../../mui/MUIInputNumbers";
import MUIInputSelect from "../../mui/MUIInputSelect";
import MUIGradientBorder from "../../mui/MUIGradientBorder";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const useProfileAddTripModal = () => {
    const [open, setOpen] = useState(false);
    const [destination, setDestination] = useState("");
    const [duration, setDuration] = useState("");
    const [year, setYear] = useState("");
    const [choice, setChoice] = useState("");
    const [details, setDetails] = useState("");
    const dispatch = useDispatch();
    let { userId, token } = getJwtToken();

    const changeCountry = (country) => setDestination(country);
    const changeDuration = (duration) => setDuration(duration);
    const changeNumber = (year) => setYear(year);
    const changeChoice = (choice) => setChoice(choice);
    const changeDetails = (e) => setDetails(e.target.value);
    const handleOpen = (boolean) => setOpen(boolean);

    const handleClose = () => {
        handleOpen(false);
        handlePreviousTripSubmission();
    };

    //This functions handle the submission of the data provided by the two modals
    //Creates an object called trip that will contain all the data and gives it to his parent thanks to the function herited by him
    const handlePreviousTripSubmission = () => {
        let trip = {
            destination,
            year,
            duration,
            withWho: choice,
            details,
        };
        axiosCreateTrip(userId, trip, token)
            .then((res) => {
                setOpen(false);
                dispatch(pushTripInUserLoggedData(res.data.newTrip));
            })
            .catch((err) => console.log(err));
    };

    return {
        open,
        handleOpen,
        handleClose,
        changeCountry,
        changeDuration,
        changeNumber,
        changeChoice,
        changeDetails,
    };
};

const ProfileAddTripModal = () => {
    const {
        open,
        handleOpen,
        handleClose,
        changeCountry,
        changeDuration,
        changeNumber,
        changeChoice,
        changeDetails,
    } = useProfileAddTripModal();

    const durations = [
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

    const withFriendsChoices = [
        "Seul(e)",
        "En couple",
        "Aves des ami(e)s",
        "En famille",
    ];

    return (
        <div className="profile-add-trip">
            <MUIGradientBorder onClick={() => handleOpen(true)}>
                <span onClick={() => handleOpen(true)}>Ajouter un voyage</span>
                <FaPlus onClick={() => handleOpen(true)} />
            </MUIGradientBorder>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <div className="trip-modal__header">
                        <h2>Ajouter un voyage</h2>
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
                                onChange={(e) => changeDetails(e)}
                            />
                        </div>
                    </div>
                    <div className="trip-modal__buttons-row">
                        <Button variant="outlined" onClick={handleClose}>
                            Confirmer
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ProfileAddTripModal;
