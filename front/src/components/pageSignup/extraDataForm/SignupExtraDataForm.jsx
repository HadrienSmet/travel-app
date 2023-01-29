import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { setUserLoggedData } from "../../../features/userLoggedData.slice";
import { setJwtToken } from "../../../utils/functions/tools";
import { setLoggedState } from "../../../features/loggedState.slice";
import MUIClassicLoader from "../../mui/MUIClassicLoader";
import { axiosPostSignupExtra } from "../../../utils/functions/axiosPostSignupExtra";
import { axiosPatchFiles } from "../../../utils/functions/axiosPatchFiles";
import PseudoDivision from "./PseudoDivision";
import DescriptionDivision from "./DescriptionDivision";
import DreamTripDivision from "./DreamTripDivision";
import PreviousTripsDivision from "./PreviousTripsDivision";

const useSignupPseudo = () => {
    const [pseudo, setPseudo] = useState("");
    const [isPseudoOk, setIsPseudoOk] = useState(false);

    const changeIsPseudoOk = (boolean) => {
        setIsPseudoOk(boolean);
    };

    const changePseudo = (pseudo) => {
        setPseudo(() => pseudo);
    };

    return {
        pseudo,
        isPseudoOk,
        changePseudo,
        changeIsPseudoOk,
    };
};

const useSignupDescription = () => {
    const [description, setDescription] = useState("");

    const changeDescription = (description) => {
        setDescription(description);
    };

    return {
        description,
        changeDescription,
    };
};

const useDreamTrips = () => {
    const [dreamTrip, setDreamTrip] = useState(undefined);

    const changeDreamTrip = (countriesArr) => {
        setDreamTrip(countriesArr);
    };
    //This function aloow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    //If the state isn't defined yet it will only contains the data provided by the input
    //Otherwise it will conserve the old data and add the new one
    const changeCountry = (country) => {
        let countries;
        if (dreamTrip === undefined) {
            countries = [country];
        } else {
            countries = [...dreamTrip, country];
        }
        setDreamTrip(countries);
    };

    return {
        dreamTrip,
        changeCountry,
        changeDreamTrip,
    };
};

const usePreviousTrips = () => {
    const [previousTrips, setPreviousTrips] = useState(undefined);
    const [albumsArray, setAlbumsArray] = useState(undefined);

    //This function is here to allow the child modal to change the state of this component
    //@Params { Type: Array } --> Array of objects. Each objects represents an album and has a key for the name and a key for all the pictures url
    const changeAlbumsArray = (array) => {
        let albumsContainer;
        if (albumsArray === undefined) {
            albumsContainer = [array];
        } else {
            albumsContainer = [...albumsArray, array];
        }
        setAlbumsArray(albumsContainer);
    };

    //This function his here to allow the trip-modal wich is the child of this component to change the state of this component
    //@Params { Type: Object } --> The data called trip in the modal component
    const changeTrips = (trip) => {
        let tripsArr;
        if (previousTrips === undefined) {
            tripsArr = [trip];
        } else {
            tripsArr = [...previousTrips, trip];
        }
        setPreviousTrips(tripsArr);
    };

    return {
        previousTrips,
        albumsArray,
        changeAlbumsArray,
        changeTrips,
    };
};

const useSignupExtraDataForm = ({ profilePicture, userPersonals }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { pseudo, isPseudoOk } = useSignupPseudo();
    const { description } = useSignupDescription();
    const { dreamTrip } = useDreamTrips();
    const { previousTrips, albumsArray } = usePreviousTrips();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmissionFormData = () => {
        const fileData = new FormData();
        fileData.append("albumName", previousTrips[0].album[0].name);
        fileData.append("file", profilePicture);
        albumsArray.forEach((album) => {
            for (let i = 0; i < album.length; i++) {
                fileData.append("file", album[i]);
            }
        });

        return {
            fileData,
        };
    };

    const handleSubmission = () => {
        const { fileData } = handleSubmissionFormData();
        const { userAuth, userData } = userPersonals;
        const { email, password } = userAuth;
        const { firstName, lastName, age, gender, country } = userData;
        if (
            isPseudoOk === true &&
            description !== "" &&
            dreamTrip !== undefined &&
            previousTrips !== undefined &&
            albumsArray !== undefined
        ) {
            setIsLoading(true);
            let userPersonalsData = {
                firstName,
                lastName,
                age,
                gender,
                country,
            };
            let data = {
                email,
                password,
                pseudo,
                description,
                dreamTrips: [...dreamTrip],
                previousTrips: [...previousTrips],
                userData: { ...userPersonalsData },
            };
            axiosPostSignupExtra(data).then((res) => {
                setJwtToken(res.data);
                axiosPatchFiles(res, fileData).then((res) => {
                    dispatch(setLoggedState(true));
                    dispatch(setUserLoggedData(res.data));
                    navigate("/home");
                });
            });
        }
    };

    return {
        isLoading,
        handleSubmission,
    };
};

const SignupExtraDataForm = ({ profilePicture, userPersonals }) => {
    const { pseudo, changePseudo, changeIsPseudoOk } = useSignupPseudo();
    const { description, changeDescription } = useSignupDescription();
    const { previousTrips, changeAlbumsArray, changeTrips } =
        usePreviousTrips();
    const { dreamTrip, changeCountry, changeDreamTrip } = useDreamTrips();
    const { isLoading, handleSubmission } = useSignupExtraDataForm({
        profilePicture,
        userPersonals,
    });

    return (
        <form
            action=""
            className="extra-data-form"
            encType="multipart/form-data"
        >
            <h1>Remplissez votre profil!</h1>
            <div className="extra-data-form__fields-displayer">
                <PreviousTripsDivision
                    previousTrips={previousTrips}
                    changeAlbumsArray={changeAlbumsArray}
                    changeTrips={changeTrips}
                />
                <div className="extra-data-form__fields-displayer__left-column">
                    <PseudoDivision
                        pseudo={pseudo}
                        changeIsPseudoOk={changeIsPseudoOk}
                        changePseudo={changePseudo}
                    />
                    <DescriptionDivision
                        description={description}
                        changeDescription={changeDescription}
                    />
                    <DreamTripDivision
                        dreamTrip={dreamTrip}
                        changeCountry={changeCountry}
                        changeDreamTrip={changeDreamTrip}
                    />
                </div>
            </div>
            {isLoading === false && (
                <Button
                    className="extra-data-form__btn-submit"
                    variant="outlined"
                    onClick={() => handleSubmission()}
                >
                    Confirmer
                </Button>
            )}
            {isLoading === true && (
                <MUIClassicLoader dynamicId="extra-data-loader" />
            )}
        </form>
    );
};

export default SignupExtraDataForm;
