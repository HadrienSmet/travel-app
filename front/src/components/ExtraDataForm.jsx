import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import TripModal from './TripModal';
import InputCountry from './InputCountry';


const ExtraDataForm = () => {
    const [fileArray, setFileArray] = useState(undefined);
    const [dreamTrip, setDreamTrip] = useState(undefined);
    const [description, setDescription] = useState("");
    const [previousTrips, setPreviousTrips] = useState(undefined);

    const changeFileArray = (array) => {
        setFileArray(array);
        console.log(fileArray);
    }

    const changeTrips = (trip) => {
        let tripsArr;
        if (previousTrips === undefined) {
            tripsArr = [trip];
        } else {
            tripsArr = [...previousTrips, trip]
        }
        setPreviousTrips(tripsArr);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const changeCountry = (country) => {
        let countries;
        if (dreamTrip === undefined) {
            countries = [country]
        } else {
            countries = [...dreamTrip, country]
        }
        setDreamTrip(countries);
    }
    const removeDestination = (e) => {
        console.log(e);
        // const countriesList = document.getElementById("countries-list");
        // let element = document.getElementById("li-" + e.target.id);
        let newDestinations = dreamTrip.splice(e.target.id, 1);
        
        e.target.remove();
        setDreamTrip(newDestinations);
        // countriesList.removeChild(element);
    }

    const handleSubmission = () => {
        console.log(fileArray + "************" + previousTrips + "************" + dreamTrip + "************" + description);
    }
 
    return (
        <form action="" className='extra-data-form'>
            <h3>Remplissez votre profil!</h3>
            <div className="extra-data-form__fields-displayer">
                <div className="extra-data-form__trips-area">
                    <TripModal changeFileArray={changeFileArray} changeTrips={changeTrips} />
                    <div className="extra-data-form__trips-displayer">
                        {previousTrips === undefined && <p>Listez vos précédents voyages!</p>}
                    </div>
                </div>
                <div className="extra-data-form__fields-displayer__left-column">
                    <TextField
                        id="outlined-textarea"
                        className='extra-data-form__text-area'
                        label="Décris-toi!"
                        placeholder=""
                        multiline
                        onBlur={(e) => handleDescription(e)}
                    />
                    <h4>Mes destinations de rêve</h4>
                    <InputCountry dynamicClass={"extra-data-form__input-destination"} dynamicPlaceholder={"Destination"} changeCountry={changeCountry} />
                    <ul id='countries-list'>
                        {dreamTrip !== undefined && dreamTrip.map((country) => (<li id={"li-" + country} key={country} onClick={((e) => removeDestination(e))}>{country}</li>))}
                        {dreamTrip === undefined && <p>Partagez à vos amis vos rêves les plus fous!</p>}
                    </ul>
                </div>  
            </div>
            <Button variant='outlined' onClick={() => handleSubmission()}>Confirmer</Button>
        </form>
    );
};

export default ExtraDataForm;