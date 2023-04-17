import MUIPreviousTripsAccordion from "../../mui/MUIPreviousTripsAccordion";
import ParentModal from "./tripModal/ParentModal";

const PreviousTripsDivision = ({
    extraData,
    changeAlbumsArray,
    changeTrips,
}) => {
    const { previousTrips } = extraData;
    return (
        <div className="extra-data-form__trips-area">
            <h2>Mes précédents voyages</h2>
            {previousTrips === undefined && (
                <ParentModal
                    changeAlbumsArray={changeAlbumsArray}
                    changeTrips={changeTrips}
                />
            )}
            <div className="extra-data-form__trips-displayer">
                {previousTrips === undefined && (
                    <p>Listez vos précédents voyages!</p>
                )}
                {previousTrips !== undefined && (
                    <MUIPreviousTripsAccordion
                        previousTrips={previousTrips}
                        dynamicClass="extra-form"
                        signingUp={true}
                    />
                )}
            </div>
        </div>
    );
};

export default PreviousTripsDivision;
