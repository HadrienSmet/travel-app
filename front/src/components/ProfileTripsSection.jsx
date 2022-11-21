// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import HomeGlobe3D from './HomeGlobe3D';
// import InputDateTwoCalendars from './InputDateTwoCalendars';
import ProfileAddTripModal from './ProfileAddTripModal';

const ProfileTripsSection = () => {
    // const [dates, setDates] = useState(undefined)
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);

    // const changeDates = (dates) => {
    //     setDates(dates);
    // }

    const handleFutureTrip = () => {
        // console.log(dates);
    }

    return (
        <section className='profile-trips-section'>
            <div className="profile-trips-section__previous-trips">
                <h2>Mes précédents voyages.</h2>
                {userData.previousTrips.map((trip) => (
                    <div key={trip.destination + "-container"} className="profile-trips-section__trip-division">
                        <h3>{trip.destination + " " + trip.year}</h3>
                        <p>{"Ce voyage a duré " + trip.duration + "."}</p>
                        <p>{" J'ai voyagé " + trip.withWho}</p>
                        <p>{trip.details}</p>
                    </div>
                ))}
                <ProfileAddTripModal />
            </div>
            <div className="profile-trips-section__plan-a-trip">
                <h2>Plannifier un voyage</h2>
                <h3>Ou souhaitez vous partir?</h3>
                <HomeGlobe3D />
                {/* <InputDateTwoCalendars changeDates={changeDates} /> */}
                <Button variant='outlined' onClick={() => handleFutureTrip()}>Faire une recherche</Button>
            </div>
        </section>
    );
};

export default ProfileTripsSection;