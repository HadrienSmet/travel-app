import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserLoggedData } from "../../../features/userLoggedData.slice";
import { setLoggedState } from "../../../features/loggedState.slice";

import { setJwtToken } from "../../../utils/functions/tools/setJwtToken";
import { axiosPostSignupExtra } from "../../../utils/functions/user/axiosPostSignupExtra";
import { axiosPatchFiles } from "../../../utils/functions/user/axiosPatchFiles";

import { Button } from "@mui/material";
import MUIClassicLoader from "../../mui/MUIClassicLoader";
import PseudoDivision from "./PseudoDivision";
import DescriptionDivision from "./DescriptionDivision";
import DreamTripDivision from "./DreamTripDivision";
import PreviousTripsDivision from "./PreviousTripsDivision";

const useExtraState = ({ extraData, setExtraData }) => {
    const changeIsPseudoOk = (boolean) => {
        const oldData = extraData;
        oldData.isPseudoOk = boolean;
        setExtraData(oldData);
    };
    const changePseudo = (pseudo) => {
        const oldData = extraData;
        oldData.pseudo = pseudo;
        console.log(extraData.pseudo);
        setExtraData(oldData);
    };
    const changeDescription = (description) => {
        const oldData = extraData;
        oldData.description = description;
        setExtraData(oldData);
    };

    const changeDreamTrip = (countriesArr) => {
        const oldData = extraData;
        oldData.dreamTrip = countriesArr;
        setExtraData(oldData);
    };
    //This function aloow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    //If the state isn't defined yet it will only contains the data provided by the input
    //Otherwise it will conserve the old data and add the new one
    const changeCountry = (country) => {
        const oldData = extraData;
        if (extraData.dreamTrip === undefined) {
            oldData.dreamTrip = [country];
        } else {
            oldData.dreamTrip = [...oldData.dreamTrip, country];
        }
        setExtraData(oldData);
    };

    //This function is here to allow the child modal to change the state of this component
    //@Params { Type: Array } --> Array of objects. Each objects represents an album and has a key for the name and a key for all the pictures url
    const changeAlbumsArray = (array) => {
        const oldData = extraData;
        if (oldData.albumsArray === undefined) {
            oldData.albumsArray = [array];
        } else {
            oldData.albumsArray = [...oldData.albumsArray, array];
        }
        setExtraData(oldData);
    };

    //This function his here to allow the trip-modal wich is the child of this component to change the state of this component
    //@Params { Type: Object } --> The data called trip in the modal component
    const changeTrips = (trip) => {
        const oldData = extraData;
        if (oldData.previousTrips === undefined) {
            oldData.previousTrips = [trip];
        } else {
            oldData.previousTrips = [...oldData.previousTrips, trip];
        }
        setExtraData(oldData);
    };

    return {
        changePseudo,
        changeIsPseudoOk,
        changeDescription,
        changeCountry,
        changeDreamTrip,
        changeAlbumsArray,
        changeTrips,
    };
};

const useSignupExtraDataForm = ({
    profilePicture,
    userPersonals,
    extraData,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmissionFormData = () => {
        const fileData = new FormData();
        fileData.append("albumName", extraData.previousTrips[0].album[0].name);
        fileData.append("file", profilePicture);
        extraData.albumsArray.forEach((album) => {
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
            extraData.isPseudoOk === true &&
            extraData.description !== "" &&
            extraData.dreamTrip !== undefined &&
            extraData.previousTrips !== undefined &&
            extraData.albumsArray !== undefined
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
                pseudo: extraData.pseudo,
                description: extraData.description,
                dreamTrips: [...extraData.dreamTrip],
                previousTrips: [...extraData.previousTrips],
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
    const [extraData, setExtraData] = useState({
        pseudo: "",
        isPseudoOk: false,
        description: "",
        dreamTrip: undefined,
        previousTrips: undefined,
        albumsArray: undefined,
    });
    const {
        changePseudo,
        changeIsPseudoOk,
        changeDescription,
        changeCountry,
        changeDreamTrip,
        changeAlbumsArray,
        changeTrips,
    } = useExtraState({ extraData, setExtraData });
    const { isLoading, handleSubmission } = useSignupExtraDataForm({
        profilePicture,
        userPersonals,
        extraData,
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
                    extraData={extraData}
                    changeAlbumsArray={(value) => changeAlbumsArray(value)}
                    changeTrips={(value) => changeTrips(value)}
                />
                <div className="extra-data-form__fields-displayer__left-column">
                    <PseudoDivision
                        extraData={extraData}
                        changeIsPseudoOk={(value) => changeIsPseudoOk(value)}
                        changePseudo={(value) => changePseudo(value)}
                    />
                    <DescriptionDivision
                        extraData={extraData}
                        changeDescription={(value) => changeDescription(value)}
                    />
                    <DreamTripDivision
                        extraData={extraData}
                        changeCountry={(value) => changeCountry(value)}
                        changeDreamTrip={(value) => changeDreamTrip(value)}
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
