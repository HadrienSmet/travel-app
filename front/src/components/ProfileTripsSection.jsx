import { Button } from '@mui/material';
import { useState } from 'react';
import { useWindowSize } from '../utils/functions/hooks';
import Globe3D from './Globe3D';
import MUIGradientBorder from './MUIGradientBorder';
import MUIPreviousTripsAccordion from './MUIPreviousTripsAccordion';
import ProfileAddTripModal from './ProfileAddTripModal';

const ProfileTripsSection = ({ isAuthor, dataFrom }) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const screenWidth = useWindowSize().width;

    const changeSelectedCountry = (country) => {
        setSelectedCountry(country)
    }

    const handleScroll = (e) => {
        const scrollBar = document.getElementById("globe-scroll-bar");
        const listHeight = screenWidth > 768 ? 5478 : 4482;
        
        scrollBar.style.top = ((e.target.scrollTop / listHeight) * 100) + "%";
    }

    const handleFutureTrip = () => {
        console.log(selectedCountry)
    }

    return (
        <section className='profile-trips-section'>
            <div className="profile-trips-section__previous-trips">
                {isAuthor === true ? 
                    <h2>Mes précédents voyages.</h2>
                :
                    <h2>Ses précédents voyages.</h2>
                }
                <div className="profile-trips-section__previous-trips-container">
                    <MUIPreviousTripsAccordion 
                        previousTrips={dataFrom.previousTrips}
                        dynamicClass="profile-trips-section"
                        signingUp={false}
                    />
                </div>
                {isAuthor === true && <ProfileAddTripModal />}
            </div>
            {isAuthor === true && 
                <div className="profile-trips-section__plan-a-trip">
                    <h2>Plannifier un voyage</h2>
                    <h3>Ou souhaitez vous partir?</h3>
                    <Globe3D 
                        dynamicClassName="profile" 
                        changeSelectedCountry={changeSelectedCountry} 
                        handleScroll={handleScroll}
                    />
                    <MUIGradientBorder onClick={() => handleFutureTrip()}>
                        <span>Faire une recherche</span>
                    </MUIGradientBorder>
                </div>
            }
        </section>
    );
};

export default ProfileTripsSection;