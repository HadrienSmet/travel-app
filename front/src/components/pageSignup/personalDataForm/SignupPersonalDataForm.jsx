import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import PictureDivision from "./PictureDivision";
import AgeDivision from "./AgeDivision";
import FirstnameDivision from "./FirstnameDivision";
import LastnameDivision from "./LastnameDivision";
import GenderDivision from "./GenderDivision";
import CountryDivision from "./CountryDivision";

const useSignupPicture = ({ changeProfilePicture }) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    const changeProfilePictureUrl = (url) => setProfilePictureUrl(url);
    //This function change the states of this component
    //@Params { Type: Object } --> The param of the the onChange event listening the input file
    //The first state that got changed represents the blop url of the profile picture provided by the user
    //The second one is the file the will be given to the back-end
    const handleProfilePicture = (e) => {
        changeProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
        changeProfilePicture(e.target.files[0]);
    };

    return {
        profilePictureUrl,
        changeProfilePictureUrl,
        handleProfilePicture,
    };
};

const useSignupAge = () => {
    const [age, setAge] = useState("");

    const changeAge = (age) => setAge(age);

    return {
        age,
        changeAge,
    };
};

const useSignupFirstname = () => {
    const [firstName, setFirstName] = useState("");
    const [isFirstNameOk, setIsFirstNameOk] = useState(false);

    const changeFirstName = (firstname) => setFirstName(firstname);
    const changeIsFirstNameOk = (boolean) => setIsFirstNameOk(boolean);

    return {
        firstName,
        isFirstNameOk,
        changeFirstName,
        changeIsFirstNameOk,
    };
};

const useSignupLastname = () => {
    const [isLastNameOk, setIsLastNameOk] = useState(false);
    const [lastName, setLastName] = useState("");

    const changeLastname = (lastname) => setLastName(lastname);
    const changeIsLastnameOk = (boolean) => setIsLastNameOk(boolean);

    return {
        lastName,
        isLastNameOk,
        changeLastname,
        changeIsLastnameOk,
    };
};

const useSignupGender = () => {
    const [gender, setGender] = useState("");

    //This function is just here to allow the child component InputSelect representing the age of the user to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeChoice = (gender) => {
        setGender(gender);
    };

    return {
        gender,
        changeChoice,
    };
};

const useSignupCountry = () => {
    const [country, setCountry] = useState("");

    const changeCountry = (country) => setCountry(country);

    return {
        country,
        changeCountry,
    };
};

const SignupPersonalDataForm = ({
    changeStepState,
    changeProfilePicture,
    changeUserPersonals,
}) => {
    const { profilePictureUrl, handleProfilePicture } = useSignupPicture({
        changeProfilePicture,
    });
    const { age, changeAge } = useSignupAge();
    const { firstName, isFirstNameOk, changeFirstName, changeIsFirstNameOk } =
        useSignupFirstname();
    const { lastName, isLastNameOk, changeLastname, changeIsLastnameOk } =
        useSignupLastname();
    const { gender, changeChoice } = useSignupGender();
    const { country, changeCountry } = useSignupCountry();
    const userData = useSelector((state) => state.newSignupData.signupData);

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
                firstName,
                lastName,
                age,
                gender,
                country,
            };
            let data = {
                userAuth: { ...authData },
                userData: { ...userData },
            };
            changeUserPersonals(data);
            changeStepState("almost-done");
        }
    };

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
                        changeIsLastnameOk={changeIsLastnameOk}
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
            <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
                Continuer
            </Button>
        </form>
    );
};

export default SignupPersonalDataForm;
