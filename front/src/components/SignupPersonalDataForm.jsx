import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { FaUser, FaTimes, FaCheck } from "react-icons/fa";
import MUIInputCountry from "./MUIInputCountry";
import MUIInputNumbers from "./MUIInputNumbers";
import MUIInputSelect from "./MUIInputSelect";

const SignupPersonalDataForm = ({
    changeStepState,
    changeProfilePicture,
    changeUserPersonals,
}) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isFirstNameOk, setIsFirstNameOk] = useState(false);
    const [isLastNameOk, setIsLastNameOk] = useState(false);
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const userData = useSelector((state) => state.newSignupData.signupData);
    const genders = ["Homme", "Femme", "Transexuel", "Non-binaire"];

    //This function change the states of this component
    //@Params { Type: Object } --> The param of the the onChange event listening the input file
    //The first state that got changed represents the blop url of the profile picture provided by the user
    //The second one is the file the will be given to the back-end
    const handleProfilePicture = (e) => {
        setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
        changeProfilePicture(e.target.files[0]);
    };

    //This function helps the user to understand how to fill properly the input handling the firstNames
    //A control structure indicates three different behavior that are depending of the value provided by the user
    //The first case is here to get sure that the first character is an uppercase and to allow a list of special characters
    //The second case is here to analyse the length of the name provided by the user: not too short, not too long
    //The last case is called when the user correctly filled the input
    //For each case an icon and a text are displayed to indicates the user how he managed it
    const handleFirstName = () => {
        const msg = document.getElementById(
            "personal-data-form__first-name-msg"
        );
        const checkIcon = document.querySelector(
            ".personal-data-form__first-name-division__check-icon"
        );
        const timesIcon = document.querySelector(
            ".personal-data-form__first-name-division__times-icon"
        );
        if (
            !firstName.match(
                /^[A-Z][a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ,.'-]+$/u
            )
        ) {
            msg.textContent =
                "Un pr??nom doit commencer par une majuscule. Attention certains caract??res sp??ciaux ne sont pas admis.";
            checkIcon.style.opacity = "0";
            timesIcon.style.opacity = "1";
        } else if (firstName.length < 3 || firstName.length > 30) {
            msg.textContent =
                "Nous acceptons les pr??noms faisant entre 3 et 30 caract??res.";
            checkIcon.style.opacity = "0";
            timesIcon.style.opacity = "1";
        } else {
            setIsFirstNameOk(true);
            msg.textContent = "";
            checkIcon.style.opacity = "1";
            timesIcon.style.opacity = "0";
        }
    };

    //This function helps the user to understand how to fill properly the input handling the firstNames
    //A control structure indicates three different behavior that are depending of the value provided by the user
    //The first case is here to get sure that the first character is an uppercase and to allow a list of special characters
    //The second case is here to analyse the length of the name provided by the user: not too short, not too long
    //The last case is called when the user correctly filled the input
    //For each case an icon and a text are displayed to indicates the user how he managed it
    const handleLastName = () => {
        const msg = document.getElementById(
            "personal-data-form__last-name-msg"
        );
        const checkIcon = document.querySelector(
            ".personal-data-form__last-name-division__check-icon"
        );
        const timesIcon = document.querySelector(
            ".personal-data-form__last-name-division__times-icon"
        );
        if (
            !lastName.match(
                /^[A-Z][a-zA-Z??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ,.'-]+$/u
            )
        ) {
            msg.textContent =
                "Un pr??nom doit commencer par une majuscule. Attention certains caract??res sp??ciaux ne sont pas admis.";
            checkIcon.style.opacity = "0";
            timesIcon.style.opacity = "1";
        } else if (lastName.length < 3 || lastName.length > 30) {
            msg.textContent =
                "Nous acceptons les noms faisant entre 3 et 30 caract??res.";
            checkIcon.style.opacity = "0";
            timesIcon.style.opacity = "1";
        } else {
            setIsLastNameOk(true);
            msg.textContent = "";
            checkIcon.style.opacity = "1";
            timesIcon.style.opacity = "0";
        }
    };

    //This function is just here to allow the child component InputNumbers representing the age of the user to change the state of this component
    //@Params { Type: Number } --> The value of the input
    const changeNumber = (age) => {
        setAge(age);
    };

    //This function is just here to allow the child component InputSelect representing the age of the user to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeChoice = (gender) => {
        setGender(gender);
    };

    //This function is just here to allow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeCountry = (country) => {
        setCountry(country);
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
                    <div className="personal-data-form__picture-area">
                        <div className="personal-data-form__picture-container">
                            {profilePictureUrl !== "" ? (
                                <div className="personal-data-form__profile-picture-container">
                                    <img
                                        className="personal-data-form__profile-picture"
                                        src={profilePictureUrl}
                                        alt={"Profil de l'utilisateur"}
                                    />
                                </div>
                            ) : (
                                <div className="personal-data-form__icon-background">
                                    <FaUser />
                                </div>
                            )}
                        </div>
                        <Button variant="outlined">
                            {profilePictureUrl === "" && (
                                <label htmlFor="signup-file">
                                    Choisir une photo
                                </label>
                            )}
                            {profilePictureUrl !== "" && (
                                <label htmlFor="signup-file">
                                    Changer de photo
                                </label>
                            )}
                        </Button>
                        <input
                            type="file"
                            name="file"
                            id="signup-file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleProfilePicture(e)}
                        />
                    </div>
                    <div className="personal-data-form__age-division">
                        <div className="personal-data-form__icons-container">
                            {age !== "" && (
                                <FaCheck className="personal-data-form__age-division__check-icon signup-perso-icon check" />
                            )}
                        </div>
                        <MUIInputNumbers
                            minNumber={16}
                            maxNumber={100}
                            dynamicClass="personal-data-form__input"
                            dynamicPlaceholder="Age"
                            changeNumber={changeNumber}
                        />
                    </div>
                </div>

                <div className="personal-data-form__inputs-container">
                    <div className="personal-data-form__first-name-division">
                        <div className="personal-data-form__icons-container">
                            <FaCheck className="personal-data-form__first-name-division__check-icon signup-perso-icon check js-handled" />
                            <FaTimes className="personal-data-form__first-name-division__times-icon signup-perso-icon times js-handled" />
                        </div>
                        <TextField
                            id="outlined-first-name"
                            label="Pr??nom"
                            variant="outlined"
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => handleFirstName()}
                        />
                        <span id="personal-data-form__first-name-msg"></span>
                    </div>
                    <div className="personal-data-form__last-name-division">
                        <div className="personal-data-form__icons-container">
                            <FaCheck className="personal-data-form__last-name-division__check-icon signup-perso-icon check js-handled" />
                            <FaTimes className="personal-data-form__last-name-division__times-icon signup-perso-icon times js-handled" />
                        </div>
                        <TextField
                            id="outlined-last-name"
                            label="Nom"
                            variant="outlined"
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={() => handleLastName()}
                        />
                        <span id="personal-data-form__last-name-msg"></span>
                    </div>
                    <div className="personal-data-form__gender-division">
                        <div className="personal-data-form__icons-container">
                            {gender !== "" && (
                                <FaCheck className="personal-data-form__gender-division__check-icon signup-perso-icon check" />
                            )}
                        </div>
                        <MUIInputSelect
                            dynamicClass="personal-data-form__input"
                            dynamicPlaceholder="Genre"
                            choices={genders}
                            changeChoice={changeChoice}
                        />
                    </div>
                    <div className="personal-data-form__country-division">
                        <div className="personal-data-form__icons-container">
                            {country !== "" && (
                                <FaCheck className="personal-data-form__country-division__check-icon signup-perso-icon check" />
                            )}
                        </div>
                        <MUIInputCountry
                            dynamicClass={"personal-data-form__input"}
                            dynamicPlaceholder={"Pays"}
                            changeCountry={changeCountry}
                        />
                    </div>
                </div>
            </div>
            <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
                Continuer
            </Button>
        </form>
    );
};

export default SignupPersonalDataForm;
