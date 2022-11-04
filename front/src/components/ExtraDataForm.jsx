import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import TripModal from './TripModal';
import InputCountry from './InputCountry';
import ExtraDataFormAccordion from './ExtraDataFormAccordion';


const ExtraDataForm = () => {
    const [albumsArray, setAlbumsArray] = useState(undefined);
    const [dreamTrip, setDreamTrip] = useState(undefined);
    const [description, setDescription] = useState("");
    const [previousTrips, setPreviousTrips] = useState(undefined);

    const changeAlbumsArray = (array) => {
        setAlbumsArray(array);
        console.log(albumsArray);
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
    // const removeDestination = (e) => {
    //     console.log(e);
    //     // const countriesList = document.getElementById("countries-list");
    //     // let element = document.getElementById("li-" + e.target.id);
    //     // let newDestinations = dreamTrip.splice(e.target.id, 1);
        
    //     e.target.remove();
    //     // setDreamTrip(newDestinations);
    //     // countriesList.removeChild(element);
    // }

    const handleSubmission = () => {
        console.log(albumsArray + "************" + previousTrips + "************" + dreamTrip + "************" + description);
    }
 
    return (
        <form action="" className='extra-data-form'>
            <h3>Remplissez votre profil!</h3>
            <div className="extra-data-form__fields-displayer">
                <div className="extra-data-form__trips-area">
                    <TripModal changeAlbumsArray={changeAlbumsArray} changeTrips={changeTrips} />
                    <div className="extra-data-form__trips-displayer">
                        {previousTrips === undefined && <p>Listez vos précédents voyages!</p>}
                        {/* {previousTrips !== undefined && previousTrips.map((trip, index) => (
                            <div key={"trip-div__" + trip.country +index} className="extra-data-form__previous-trip">
                                {console.log(trip.album[index].urls)}
                                <h4 key={"trip-title__" + trip.country + index}>{trip.country + " " + trip.year}</h4>
                                <span key={"trip-duration__" + trip.country + index}>{trip.duration}</span>
                                <span key={"trip-span__" + trip.country + index}>{trip.choice}</span>
                                <span key={"trip-country__" + trip.country + index}>{trip.details}</span>
                                <div key={"trip-child-div__" + trip.country + index} className="extra-data-form__previous-trip-album">
                                    {trip.album[index].urls.map((url) => (<img key={"trip-child-div-" + trip.country + index} src={url} alt="img" />))}
                                </div>
                            </div>
                        ))} */}
                        {previousTrips !== undefined && <ExtraDataFormAccordion previousTrips={previousTrips} />}
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
                        {dreamTrip !== undefined && dreamTrip.map((country) => (
                            <li 
                                id={"li-" + country} 
                                key={country} 
                                // onClick={((e) => removeDestination(e))}
                            >{country}</li>))}
                        {dreamTrip === undefined && <p>Partagez à vos amis vos rêves les plus fous!</p>}
                    </ul>
                </div>  
            </div>
            <Button variant='outlined' onClick={() => handleSubmission()}>Confirmer</Button>
        </form>
    );
};

export default ExtraDataForm;