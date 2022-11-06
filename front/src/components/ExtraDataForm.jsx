import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import TripModal from './TripModal';
import InputCountry from './InputCountry';
import ExtraDataFormAccordion from './ExtraDataFormAccordion';
import { FaCheck, FaTimes } from "react-icons/fa";


const ExtraDataForm = ({ profilePicture, userPersonals }) => {
    const [pseudo, setPseudo] = useState("");
    const [isPseudoOk, setIsPseudoOk] = useState(false);
    const [description, setDescription] = useState("");
    const [dreamTrip, setDreamTrip] = useState(undefined);
    const [previousTrips, setPreviousTrips] = useState(undefined);
    const [albumsArray, setAlbumsArray] = useState(undefined);
    

    //This function is here to allow the child modal to change the state of this component
    //@Params { Type: Array } --> Array of objects. Each objects represents an album and has a key for the name and a key for all the pictures url
    const changeAlbumsArray = (array) => {
        setAlbumsArray(array);
        console.log(albumsArray);
    }

    //This function his here to allow the trip-modal wich is the child of this component to change the state of this component
    //@Params { Type: Object } --> The data called trip in the modal component
    const changeTrips = (trip) => {
        let tripsArr;
        if (previousTrips === undefined) {
            tripsArr = [trip];
        } else {
            tripsArr = [...previousTrips, trip]
        }
        setPreviousTrips(tripsArr);
    }

    //This function handles the behavior of the input text representing the user pseudo and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //And it also show or hide icons that indicates the user if he did well
    const handlePseudo = () => {
        const pseudoMsg = document.getElementById('extra-pseudo-msg');
        const checkIcon = document.querySelector(".extra-data-form__pseudo-division__check-icon");
        const timesIcon = document.querySelector(".extra-data-form__pseudo-division__times-icon");
        if (!pseudo.match(/^([a-zA-Z0-9]){3,20}$/)) {
            pseudoMsg.textContent = "Doit faire entre 3 et 20 caractères et ne peut contenir des caractères spéciaux";
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else {
            setIsPseudoOk(true);
            pseudoMsg.textContent = "";
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        }
    }

    //This function change the state of this component in order to allow the user to share a description about himself
    //@Params { Type: Object } --> The param of the onChange event listening the textarea
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    //This function aloow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    //If the state isn't defined yet it will only contains the data provided by the input
    //Otherwise it will conserve the old data and add the new one 
    const changeCountry = (country) => {
        let countries;
        if (dreamTrip === undefined) {
            countries = [country]
        } else {
            countries = [...dreamTrip, country]
        }
        setDreamTrip(countries);
    }

    const handleSubmission = () => {
        console.log(userPersonals);
        const { userAuth, userData } = userPersonals;
        const { email, password } = userAuth;
        const { firstName, lastName, age, gender, country } = userData;
        if (
            isPseudoOk === true 
            && description !== "" 
            && dreamTrip !== undefined 
            && previousTrips !== undefined 
            && albumsArray !== undefined
        ) {
            let data = {
                userAuth: {
                    email,
                    password,
                },
                userData: {
                    firstName,
                    lastName,
                    age,
                    gender,
                    country,
                },
                userProfile: {
                    profilePicture,
                    pseudo,
                    description,
                    dreamTrips: [...dreamTrip],
                    previousTrips: [...previousTrips]
                }
            }
            console.log(data);
        }
    }
 
    return (
        <form action="" className='extra-data-form'>
            <h3>Remplissez votre profil!</h3>
            <div className="extra-data-form__fields-displayer">
                <div className="extra-data-form__trips-area">
                    <TripModal changeAlbumsArray={changeAlbumsArray} changeTrips={changeTrips} />
                    <div className="extra-data-form__trips-displayer">
                        {previousTrips === undefined && <p>Listez vos précédents voyages!</p>}
                        {previousTrips !== undefined && <ExtraDataFormAccordion previousTrips={previousTrips} />}
                    </div>
                </div>
                <div className="extra-data-form__fields-displayer__left-column">
                    <div className="extra-data-form__pseudo-division">
                        <div className="extra-data-form__pseudo-division__icons-container">
                            <FaCheck className='extra-data-form__pseudo-division__check-icon signup-icon check' />
                            <FaTimes className='extra-data-form__pseudo-division__times-icon signup-icon times' />
                        </div>
                        <TextField 
                            id='outlined-pseudo'
                            label="Pseudo"
                            variant='outlined'
                            required={true}
                            onChange={(e) => setPseudo(e.target.value)}
                            onBlur={() => handlePseudo()} />
                        <span id="extra-pseudo-msg"></span>
                    </div>
                    <div className="extra-data-form__description-division">
                        <div className="extra-data-form__description-division__icons-container">
                            {description !== "" && <FaCheck className='extra-data-form__description-division__check-icon last-step-icon check' />}
                        </div>
                        <TextField
                            id="outlined-textarea"
                            className='extra-data-form__text-area'
                            label="Présentes-toi!"
                            placeholder=""
                            multiline
                            onChange={(e) => handleDescription(e)}
                        />
                    </div>
                    <h4>Mes destinations de rêve</h4>
                    <div className="extra-data-form__dream-trips-division">
                        <div className="extra-data-form__dream-trips-division__icons-container">
                            {dreamTrip !== undefined && <FaCheck className='extra-data-form__dream-trips-division__check-icon last-step-icon check' />}
                        </div>
                        <InputCountry dynamicClass={"extra-data-form__input-destination"} dynamicPlaceholder={"Destination"} changeCountry={changeCountry} />
                        <ul id='countries-list'>
                            {dreamTrip !== undefined && dreamTrip.map((country) => (<li id={"li-" + country} key={country}>{country}</li>))}
                            {dreamTrip === undefined && <p>Partagez à vos amis vos rêves les plus fous!</p>}
                        </ul>
                    </div>  
                </div>  
            </div>
            <Button variant='outlined' onClick={() => handleSubmission()}>Confirmer</Button>
        </form>
    );
};

export default ExtraDataForm;