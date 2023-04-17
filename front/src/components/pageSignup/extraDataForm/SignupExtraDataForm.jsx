import { useState } from "react";
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

const useExtraState = () => {
    const [extraData, setExtraData] = useState({
        pseudo: "",
        isPseudoOk: false,
        description: "",
        dreamTrips: undefined,
        previousTrips: undefined,
        albumsArray: undefined,
    });
    const changeIsPseudoOk = (boolean) => {
        setExtraData({ ...extraData, isPseudoOk: boolean });
    };
    const changePseudo = (pseudo) => {
        setExtraData({ ...extraData, pseudo });
    };
    const changeDescription = (description) => {
        setExtraData({ ...extraData, description });
    };

    const changeDreamTrip = (countriesArr) =>
        setExtraData({ ...extraData, dreamTrips: countriesArr });

    const changeCountry = (country) => {
        let countries;
        if (extraData.dreamTrips === undefined) {
            countries = [country];
        } else {
            countries = [...extraData.dreamTrips, country];
        }
        setExtraData({ ...extraData, dreamTrips: countries });
    };

    const changeAlbumsArray = (array) => {
        let albumsContainer;
        if (extraData.albumsArray === undefined) {
            albumsContainer = [array];
        } else {
            albumsContainer = [...extraData.albumsArray, array];
        }
        setExtraData({ ...extraData, albumsArray: albumsContainer });
    };

    const changeTrips = (trip) => {
        let tripsArr;
        if (extraData.previousTrips === undefined) {
            tripsArr = [trip];
        } else {
            tripsArr = [...extraData.previousTrips, trip];
        }
        setExtraData({ ...extraData, previousTrips: tripsArr });
    };

    return {
        extraData,
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
    const {
        pseudo,
        isPseudoOk,
        description,
        dreamTrips,
        previousTrips,
        albumsArray,
    } = extraData;

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
            dreamTrips !== undefined &&
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
                dreamTrips,
                previousTrips,
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
    const {
        extraData,
        changePseudo,
        changeIsPseudoOk,
        changeDescription,
        changeCountry,
        changeDreamTrip,
        changeAlbumsArray,
        changeTrips,
    } = useExtraState();

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
                    changeAlbumsArray={changeAlbumsArray}
                    changeTrips={changeTrips}
                />
                <div className="extra-data-form__fields-displayer__left-column">
                    <PseudoDivision
                        extraData={extraData}
                        changeIsPseudoOk={changeIsPseudoOk}
                        changePseudo={changePseudo}
                    />
                    <DescriptionDivision
                        extraData={extraData}
                        changeDescription={changeDescription}
                    />
                    <DreamTripDivision
                        extraData={extraData}
                        changeCountry={changeCountry}
                        changeDreamTrip={changeDreamTrip}
                    />
                </div>
            </div>
            {isLoading === false && (
                <Button
                    className="extra-data-form__btn-submit"
                    variant="outlined"
                    onClick={handleSubmission}
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
