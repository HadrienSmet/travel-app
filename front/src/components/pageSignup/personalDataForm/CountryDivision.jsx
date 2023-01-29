import { FaCheck } from "react-icons/fa";
import MUIInputCountry from "../../mui/MUIInputCountry";

const CountryDivision = ({ country, changeCountry }) => {
    return (
        <div className="personal-data-form__country-division">
            <div className="personal-data-form__icons-container">
                {country !== "" && (
                    <FaCheck className="personal-data-form__country-division__check-icon signup-perso-icon check" />
                )}
            </div>
            <MUIInputCountry
                dynamicClass={"personal-data-form__input"}
                dynamicPlaceholder={"Pays"}
                changeCountry={changeCountry}
            />
        </div>
    );
};

export default CountryDivision;
