import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from '@mui/material'
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import InputAge from "./InputAge";
import InputGender from "./InputGender";
import InputCountry from "./InputCountry";
// import { setSignupPersonalData } from "../features/signupPersonalData.slice";

const PersonalDataForm = () => {
    const [profilePicture, setProfilePicture] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    // const dispatch = useDispatch();
    const userData = useSelector((state) => state.newSignupData.signupData);

    const handleProfilePicture = (e) => {
        setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
        setProfilePicture(e.target.files[0]);
    }

    const changeAge = (age) => {
        setAge(age);
    }

    const changeGender = (gender) => {
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
                console.log(res.data);
                axios.patch("http://localhost:3000/api/auth/profilePicture/" + res.data.userId, fileData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": `bearer ${res.data.token}`
                    }
                })
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
                    <InputAge className="personal-data-form__input" changeAge={changeAge} />
                    <InputGender className="personal-data-form__input" changeGender={changeGender} />
                    <InputCountry className="personal-data-form__input" changeCountry={changeCountry} />
                </div>
            </div>
            <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Confirmer</Button>
        </form>
    );
};

export default PersonalDataForm;