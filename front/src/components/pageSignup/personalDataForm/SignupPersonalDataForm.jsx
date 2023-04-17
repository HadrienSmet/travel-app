import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import PictureDivision from "./PictureDivision";
import AgeDivision from "./AgeDivision";
import FirstnameDivision from "./FirstnameDivision";
import LastnameDivision from "./LastnameDivision";
import GenderDivision from "./GenderDivision";
import CountryDivision from "./CountryDivision";

const usePersonalData = ({
    changeProfilePicture,
    changeStepState,
    changeUserPersonals,
}) => {
    const userData = useSelector((state) => state.newSignupData.signupData);
    const [personalData, setPersonalData] = useState({
        age: "",
        country: "",
        firstName: "",
        gender: "",
        isFirstNameOk: false,
        isLastNameOk: false,
        lastName: "",
        profilePictureUrl: "",
    });
    const {
        age,
        country,
        firstName,
        gender,
        isFirstNameOk,
        isLastNameOk,
        lastName,
        profilePictureUrl,
    } = personalData;
    const changeAge = (age) => setPersonalData({ ...personalData, age });
    const changeChoice = (gender) =>
        setPersonalData({ ...personalData, gender });
    const changeCountry = (country) =>
        setPersonalData({ ...personalData, country });
    const changeFirstName = (firstName) =>
        setPersonalData({ ...personalData, firstName });
    const changeIsFirstNameOk = (boolean) =>
        setPersonalData({ ...personalData, isFirstNameOk: boolean });
    const changeIsLastNameOk = (boolean) =>
        setPersonalData({ ...personalData, isLastNameOk: boolean });
    const changeLastname = (lastName) =>
        setPersonalData({ ...personalData, lastName });
    const changeProfilePictureUrl = (url) =>
        setPersonalData({ ...personalData, profilePictureUrl: url });
    // This function change the states of this component
    // @Params { Type: Object } --> The param of the the onChange event listening the input file
    // The first state that got changed represents the blop url of the profile picture provided by the user
    // The second one is the file the will be given to the back-end
    const handleProfilePicture = (e) => {
        changeProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
        changeProfilePicture(e.target.files[0]);
    };

    //This function handles the submission of second step of the signup form
    //@Params { Type: Object } --> The param of the onSubmit event
    //It gets back the data contained by the redux store
    //After checking that the new fields have been well filled it creates two new objects
    //The submission of this steps is made by two calls API
    //The first one is creating a new user in the data base
    //If everything went fine it makes the second call to upload the picture in the back and to modificate the user to add the picture url
    const handleSubmission = (e) => {
        e.preventDefault();
        const { email, password } = userData;
        if (
            profilePictureUrl !== "" &&
            age !== "" &&
            isFirstNameOk === true &&
            isLastNameOk === true &&
            gender !== "" &&
            country !== ""
        ) {
            let authData = {
                email,
                password,
            };

            let userData = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                country: country,
            };
            let data = {
                userAuth: { ...authData },
                userData: { ...userData },
            };
            changeUserPersonals(data);
            changeStepState("almost-done");
        }
    };

    return {
        personalData,
        changeAge,
        changeChoice,
        changeCountry,
        changeFirstName,
        changeIsFirstNameOk,
        changeIsLastNameOk,
        changeLastname,
        handleProfilePicture,
        handleSubmission,
    };
};

const SignupPersonalDataForm = ({
    changeStepState,
    changeProfilePicture,
    changeUserPersonals,
}) => {
    const {
        personalData,
        changeAge,
        changeChoice,
        changeCountry,
        changeFirstName,
        changeIsFirstNameOk,
        changeIsLastNameOk,
        changeLastname,
        handleProfilePicture,
        handleSubmission,
    } = usePersonalData({
        changeProfilePicture,
        changeStepState,
        changeUserPersonals,
    });
    const { age, country, firstName, gender, lastName, profilePictureUrl } =
        personalData;

    return (
        <form action="" className="personal-data-form">
            <h1>Informations personnelles</h1>
            <div className="personal-data-form__fields-displayer">
                <div className="personal-data-form__left-column">
                    <PictureDivision
                        profilePictureUrl={profilePictureUrl}
                        handleProfilePicture={handleProfilePicture}
                    />
                    <AgeDivision age={age} changeAge={changeAge} />
                </div>

                <div className="personal-data-form__inputs-container">
                    <FirstnameDivision
                        firstName={firstName}
                        changeFirstName={changeFirstName}
                        changeIsFirstNameOk={changeIsFirstNameOk}
                    />
                    <LastnameDivision
                        lastName={lastName}
                        changeLastName={changeLastname}
                        changeIsLastNameOk={changeIsLastNameOk}
                    />
                    <GenderDivision
                        gender={gender}
                        changeChoice={changeChoice}
                    />
                    <CountryDivision
                        country={country}
                        changeCountry={changeCountry}
                    />
                </div>
            </div>
            <Button variant="outlined" onClick={handleSubmission}>
                Continuer
            </Button>
        </form>
    );
};

export default SignupPersonalDataForm;
