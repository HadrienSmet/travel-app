import { useState } from "react";
import Globe3D from "./Globe3D";
import MUIGradientBorder from "./MUIGradientBorder";
import MUIPreviousTripsAccordion from "./MUIPreviousTripsAccordion";
import ProfileAddTripModal from "./ProfileAddTripModal";

const ProfileTripsSection = ({ isAuthor, dataFrom }) => {
    const [selectedCountry, setSelectedCountry] = useState("");

    //This function is here to allow a children component to change the state of this component
    //@Params { type: String } => the value of the onChange event listening a select input containing a list of each country
    const changeSelectedCountry = (country) => {
        setSelectedCountry(country);
    };

    //This function doesn't do anything right now
    //It will just log the country selected by the user
    const handleFutureTrip = () => {
        console.log(selectedCountry);
    };

    return (
        <section className="profile-trips-section">
            <div className="profile-trips-section__previous-trips">
                {isAuthor === true ? (
                    <h1>Mes précédents voyages.</h1>
                ) : (
                    <h1>Ses précédents voyages.</h1>
                )}
                <div className="profile-trips-section__previous-trips-container">
                    <MUIPreviousTripsAccordion
                        previousTrips={dataFrom.previousTrips}
                        dynamicClass="profile-trips-section"
                        signingUp={false}
                    />
                </div>
                {isAuthor === true && <ProfileAddTripModal />}
            </div>
            {isAuthor === true && (
                <div className="profile-trips-section__plan-a-trip">
                    <h2>Plannifier un voyage</h2>
                    <h3>Ou souhaitez vous partir?</h3>
                    <Globe3D
                        dynamicClassName="profile"
                        changeSelectedCountry={changeSelectedCountry}
                    />
                    <MUIGradientBorder onClick={() => handleFutureTrip()}>
                        <span>Faire une recherche</span>
                    </MUIGradientBorder>
                </div>
            )}
        </section>
    );
};

export default ProfileTripsSection;
