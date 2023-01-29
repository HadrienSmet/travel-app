import { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import MUIInputCountry from "../../mui/MUIInputCountry";
import MUIInputNumbers from "../../mui/MUIInputNumbers";
import MUIInputSelect from "../../mui/MUIInputSelect";
import { getJwtToken } from "../../../utils/functions/tools";
import { pushTripInUserLoggedData } from "../../../features/userLoggedData.slice";
import MUIGradientBorder from "../../mui/MUIGradientBorder";
import { axiosCreateTrip } from "../../../utils/functions/axiosCreateTrip";

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

    //This function changes the state of the component in order to open the parent modal
    const handleOpen = () => {
        setOpen(true);
    };
    //This function changes the state of the component in order to close the parent modal
    //Then it calls a function that will handles the submission of the datas
    const handleClose = () => {
        setOpen(false);
        handlePreviousTripSubmission();
    };

    //This function is only here to allow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeCountry = (country) => {
        setDestination(country);
    };

    //This function is only here to allow the child component InputSelect thats represents the duration of the trip to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeDuration = (duration) => {
        setDuration(duration);
    };

    //This function is only here to allow the child component InputNumbers thats represents the year of the trip to change the state of this component
    //@Params { Type: Number } --> The value of the input
    const changeNumber = (year) => {
        setYear(year);
    };

    //This function is only here to allow the child component InputSelect thats tells if the user were accompanied during the trip to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeChoice = (choice) => {
        setChoice(choice);
    };

    //This function change the state of the components in order to let the user provides details about his trip
    //@Params { Type: String } --> The param of the onChange event
    const changeDetails = (e) => {
        setDetails(e.target.value);
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
        setOpen,
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
        setOpen,
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
            <MUIGradientBorder onClick={handleOpen}>
                <span onClick={handleOpen}>Ajouter un voyage</span>
                <FaPlus onClick={handleOpen} />
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
                        <BsXLg onClick={() => setOpen(false)} />
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
