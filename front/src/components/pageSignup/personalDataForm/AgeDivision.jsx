import { FaCheck } from "react-icons/fa";
import MUIInputNumbers from "../../mui/MUIInputNumbers";

const AgeDivision = ({ age, changeAge }) => {
    return (
        <div className="personal-data-form__age-division">
            <div className="personal-data-form__icons-container">
                {age !== "" && (
                    <FaCheck className="personal-data-form__age-division__check-icon signup-perso-icon check" />
                )}
            </div>
            <MUIInputNumbers
                minNumber={16}
                maxNumber={100}
                dynamicClass="personal-data-form__input"
                dynamicPlaceholder="Age"
                changeNumber={changeAge}
            />
        </div>
    );
};

export default AgeDivision;
