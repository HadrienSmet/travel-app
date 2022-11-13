import { useSelector } from 'react-redux';

const ProfileTripsSection = () => {
    const userData = useSelector((state) => state.userLoggedDataStore.userLoggedData);
    return (
        <div className='profile-trips-section'>
            <h2>Mes précédents voyages.</h2>
            {userData.previousTrips.map((trip) => (
                <div key={trip.destination + "-container"} className="profile-trips-section__trip-division">
                    <h3>{trip.destination + " " + trip.year}</h3>
                    <p>{"Ce voyage a duré " + trip.duration + "."}</p>
                    <p>{" J'ai voyagé " + trip.withWho}</p>
                    <p>{trip.details}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileTripsSection;