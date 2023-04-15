import MUIPreviousTripsAccordion from "../../mui/MUIPreviousTripsAccordion";
import ParentModal from "./tripModal/ParentModal";

const PreviousTripsDivision = ({
    extraData,
    changeAlbumsArray,
    changeTrips,
}) => {
    return (
        <div className="extra-data-form__trips-area">
            <h2>Mes précédents voyages</h2>
            {extraData.previousTrips === undefined && (
                <ParentModal
                    changeAlbumsArray={changeAlbumsArray}
                    changeTrips={changeTrips}
                />
            )}
            <div className="extra-data-form__trips-displayer">
                {extraData.previousTrips === undefined && (
                    <p>Listez vos précédents voyages!</p>
                )}
                {extraData.previousTrips !== undefined && (
                    <MUIPreviousTripsAccordion
                        previousTrips={extraData.previousTrips}
                        dynamicClass="extra-form"
                        signingUp={true}
                    />
                )}
            </div>
        </div>
    );
};

export default PreviousTripsDivision;
