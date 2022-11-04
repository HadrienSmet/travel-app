import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material'
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import InputCountry from "./InputCountry";
import { setJwtToken } from "../utils/functions/tools";
import { setUserData } from "../features/userData.slice";
import InputNumbers from "./InputNumbers";
import InputSelect from "./InputSelect";

const PersonalDataForm = ({ changeStepState }) => {
    const [profilePicture, setProfilePicture] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.newSignupData.signupData);

    const genders = ["Homme", "Femme", "Transexuel", "Non-binaire"];

    const handleProfilePicture = (e) => {
        setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
        setProfilePicture(e.target.files[0]);
    }

    const changeNumber = (age) => {
        setAge(age);
    }

    const changeChoice = (gender) => {
        setGender(gender);
    }

    const changeCountry = (country) => {
        setCountry(country);
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        const { email, pseudo, password } = userData;
        if (profilePicture !== "" && age !== "" && gender !== "" && country !== "") { 
            console.log(profilePicture);
            const fileData = new FormData();
            fileData.append("file", profilePicture);

            let data = {
                email,
                pseudo,
                password,
                age,
                gender,
                country, 
            }  

            axios.post("http://localhost:3000/api/auth/signup", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                setJwtToken(res.data);
                console.log(res.data);
                axios.patch("http://localhost:3000/api/auth/profilePicture/" + res.data.userId, fileData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": `bearer ${res.data.token}`
                    }
                })
                .then((res) => {
                    dispatch(setUserData(res.data))
                    changeStepState("almost-done");
                })
                .catch();
                console.log(res.data);
            })
        } 
    }

    return (
        <form action="" className="personal-data-form">
            <h3>Informations personnelles</h3>
            <div className="personal-data-form__fields-displayer">
                <div className="personal-data-form__picture-area">
                    <div className="personal-data-form__picture-container">
                        {profilePictureUrl !== "" 
                            ?
                                <div className="personal-data-form__profile-picture-container">
                                    <img className="personal-data-form__profile-picture" src={profilePictureUrl} alt="img" />
                                </div>
                            :
                                <div className="personal-data-form__icon-background">
                                    <FaUser />
                                </div>
                        }
                        
                    </div>
                    <Button variant="outlined">
                        <label htmlFor="signup-file">Choisir une photo</label>
                    </Button>
                    <input type="file" name="profilePicture" id="signup-file" onChange={(e) => handleProfilePicture(e)} />
                </div>
                <div className="personal-data-form__inputs-container">
                    <InputNumbers 
                        minNumber={16}
                        maxNumber={100}
                        dynamicClass="personal-data-form__input"
                        dynamicPlaceholder="Age"
                        changeNumber={changeNumber}
                    />
                    <InputSelect 
                        dynamicClass="personal-data-form__input"
                        dynamicPlaceholder="Genre"
                        choices={genders}
                        changeChoice={changeChoice}
                    />
                    {/* <InputGender className="personal-data-form__input" changeGender={changeGender} /> */}
                    <InputCountry dynamicClass={"personal-data-form__input"} dynamicPlaceholder={"Pays"} changeCountry={changeCountry} />
                </div>
            </div>
            <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Continuer</Button>
        </form>
    );
};

export default PersonalDataForm;