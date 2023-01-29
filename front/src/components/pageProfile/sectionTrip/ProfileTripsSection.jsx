import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe3D from "../../Globe3D";
import MUIGradientBorder from "../../mui/MUIGradientBorder";
import MUIPreviousTripsAccordion from "../../mui/MUIPreviousTripsAccordion";
import ProfileAddTripModal from "./ProfileAddTripModal";

const useProfileTripsSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const navigate = useNavigate();

    //This function is here to allow a children component to change the state of this component
    //@Params { type: String } => the value of the onChange event listening a select input containing a list of each country
    const changeSelectedCountry = (country) => {
        setSelectedCountry(country);
    };

    //This function doesn't do anything right now
    //It will just log the country selected by the user
    const handleFutureTrip = () => {
        console.log(selectedCountry);
        navigate(`/error-404`);
    };

    return {
        changeSelectedCountry,
        handleFutureTrip,
    };
};

const ProfileTripsSection = ({ isAuthor, dataFrom }) => {
    const { changeSelectedCountry, handleFutureTrip } =
        useProfileTripsSection();

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
                        forHome={false}
                    />
                    <MUIGradientBorder onClick={() => handleFutureTrip()}>
                        <span onClick={() => handleFutureTrip()}>
                            Faire une recherche
                        </span>
                    </MUIGradientBorder>
                </div>
            )}
        </section>
    );
};

export default ProfileTripsSection;
