import { Button } from '@mui/material';
import Globe3D from './Globe3D';
import ProfileAddTripModal from './ProfileAddTripModal';

const ProfileTripsSection = ({ isAuthor, dataFrom }) => {
    const handleFutureTrip = () => {

    }

    return (
        <section className='profile-trips-section'>
            <div className="profile-trips-section__previous-trips">
                {isAuthor === true ? 
                    <h2>Mes précédents voyages.</h2>
                :
                    <h2>Ses précédents voyages.</h2>
                }
                {dataFrom.previousTrips.map((trip) => (
                    <div key={trip.destination + "-container"} className="profile-trips-section__trip-division">
                        <h3>{trip.destination + " " + trip.year}</h3>
                        <p>{"Ce voyage a duré " + trip.duration + "."}</p>
                        <p>{" J'ai voyagé " + trip.withWho}</p>
                        <p>{trip.details}</p>
                    </div>
                ))}
                {isAuthor === true && <ProfileAddTripModal />}
            </div>
            {isAuthor === true && 
                <div className="profile-trips-section__plan-a-trip">
                    <h2>Plannifier un voyage</h2>
                    <h3>Ou souhaitez vous partir?</h3>
                    <Globe3D />
                    <Button variant='outlined' onClick={() => handleFutureTrip()}>Faire une recherche</Button>
                </div>
            }
        </section>
    );
};

export default ProfileTripsSection;