import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe3D from "../../Globe3D";
import MUIGradientBorder from "../../mui/MUIGradientBorder";
import MUIPreviousTripsAccordion from "../../mui/MUIPreviousTripsAccordion";
import ProfileAddTripModal from "./ProfileAddTripModal";

const useProfileTripsSection = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const navigate = useNavigate();

    const changeSelectedCountry = (country) => setSelectedCountry(country);

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
                    <h2>Mes précédents voyages.</h2>
                ) : (
                    <h2>Ses précédents voyages.</h2>
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
