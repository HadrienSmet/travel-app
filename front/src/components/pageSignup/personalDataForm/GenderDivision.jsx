import { FaCheck } from "react-icons/fa";
import MUIInputSelect from "../../mui/MUIInputSelect";

const GenderDivision = ({ gender, changeChoice }) => {
    const genders = ["Homme", "Femme", "Transexuel", "Non-binaire"];
    return (
        <div className="personal-data-form__gender-division">
            <div className="personal-data-form__icons-container">
                {gender !== "" && (
                    <FaCheck className="personal-data-form__gender-division__check-icon signup-perso-icon check" />
                )}
            </div>
            <MUIInputSelect
                dynamicClass="personal-data-form__input"
                dynamicPlaceholder="Genre"
                choices={genders}
                changeChoice={changeChoice}
            />
        </div>
    );
};

export default GenderDivision;
