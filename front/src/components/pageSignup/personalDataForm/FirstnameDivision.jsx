import { useRef } from "react";

import { TextField } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";

const useFirstnameDivision = ({ firstName, changeIsFirstNameOk }) => {
    const firstnameMsgRef = useRef(null);
    const firstnameCheckRef = useRef(null);
    const firstnameTimesRef = useRef(null);

    const handleWrongFirstname = (message) => {
        changeIsFirstNameOk(false);
        firstnameMsgRef.current.textContent = message;
        firstnameCheckRef.current.classList.remove("visible");
        firstnameCheckRef.current.classList.add("invisible");
        firstnameTimesRef.current.classList.remove("invisible");
        firstnameTimesRef.current.classList.add("visible");
    };

    const handleFineFirstname = () => {
        changeIsFirstNameOk(true);
        firstnameMsgRef.current.textContent = "";
        firstnameCheckRef.current.classList.remove("invisible");
        firstnameCheckRef.current.classList.add("visible");
        firstnameTimesRef.current.classList.remove("visible");
        firstnameTimesRef.current.classList.add("invisible");
    };
    //This function helps the user to understand how to fill properly the input handling the firstNames
    //A control structure indicates three different behavior that are depending of the value provided by the user
    //The first case is here to get sure that the first character is an uppercase and to allow a list of special characters
    //The second case is here to analyse the length of the name provided by the user: not too short, not too long
    //The last case is called when the user correctly filled the input
    //For each case an icon and a text are displayed to indicates the user how he managed it
    const handleFirstName = () => {
        if (
            !firstName?.match(
                /^[A-Z][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
            )
        ) {
            handleWrongFirstname(
                "Un prénom doit commencer par une majuscule. Attention certains caractères spéciaux ne sont pas admis."
            );
        } else if (firstName.length < 3 || firstName.length > 30) {
            handleWrongFirstname(
                "Nous n'acceptons que les prénoms faisant entre 3 et 30 caractères."
            );
        } else {
            handleFineFirstname();
        }
    };

    return {
        firstnameMsgRef,
        firstnameCheckRef,
        firstnameTimesRef,
        handleFirstName,
    };
};

const FirstnameDivision = ({
    firstName,
    changeFirstName,
    changeIsFirstNameOk,
}) => {
    const {
        firstnameMsgRef,
        firstnameCheckRef,
        firstnameTimesRef,
        handleFirstName,
    } = useFirstnameDivision({ firstName, changeIsFirstNameOk });

    return (
        <div className="personal-data-form__first-name-division">
            <div className="personal-data-form__icons-container">
                <div className="ref-div" ref={firstnameCheckRef}>
                    <FaCheck className="personal-data-form__first-name-division__check-icon signup-perso-icon check js-handled" />
                </div>
                <div className="ref-div" ref={firstnameTimesRef}>
                    <FaTimes className="personal-data-form__first-name-division__times-icon signup-perso-icon times js-handled" />
                </div>
            </div>
            <TextField
                id="outlined-first-name"
                label="Prénom"
                variant="outlined"
                onChange={(e) => changeFirstName(e.target.value)}
                onBlur={() => handleFirstName()}
            />
            <span
                ref={firstnameMsgRef}
                id="personal-data-form__first-name-msg"
            ></span>
        </div>
    );
};

export default FirstnameDivision;
