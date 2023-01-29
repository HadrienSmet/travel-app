import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import MUIInputCountry from "../../mui/MUIInputCountry";

const DreamTripDivision = ({ dreamTrip, changeDreamTrip, changeCountry }) => {
    const removeDreamDestination = (e) => {
        let selectedDestination;
        if (e.target.id === "") {
            selectedDestination = e.target.parentElement.id.split("_")[0];
        } else {
            selectedDestination = e.target.id.split("_")[0];
        }
        let countries = [...dreamTrip];
        let newArr = countries.filter(
            (country) => country !== selectedDestination
        );
        changeDreamTrip(newArr);
    };

    return (
        <>
            <h2>Mes destinations de rêve</h2>
            <div className="extra-data-form__dream-trips-division">
                <div className="extra-data-form__dream-trips-division__icons-container">
                    {dreamTrip !== undefined && (
                        <FaCheck className="extra-data-form__dream-trips-division__check-icon last-step-icon check" />
                    )}
                </div>
                <MUIInputCountry
                    dynamicClass={"extra-data-form__input-destination"}
                    dynamicPlaceholder={"Destination"}
                    changeCountry={changeCountry}
                />
                <div className="countries-list__division">
                    <ul id="countries-list">
                        {dreamTrip !== undefined &&
                            dreamTrip.map((country) => (
                                <li id={"li-" + country} key={country}>
                                    <span>{country}</span>
                                    <FaTimes
                                        onClick={(e) =>
                                            removeDreamDestination(e)
                                        }
                                        id={country + "_delete-btn"}
                                    />
                                </li>
                            ))}
                    </ul>
                    {dreamTrip === undefined && (
                        <div className="text-centralizer">
                            <p>Partagez à vos amis vos rêves les plus fous!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DreamTripDivision;
