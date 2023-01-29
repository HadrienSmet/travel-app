import { TextField } from "@mui/material";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const useLastnameDivision = ({ lastName, changeIsLastnameOk }) => {
    const lastnameMsgRef = useRef(null);
    const lastnameCheckRef = useRef(null);
    const lastnameTimesRef = useRef(null);

    const handleWrongLastname = (message) => {
        changeIsLastnameOk(false);
        lastnameMsgRef.current.textContent = message;
        lastnameCheckRef.current.style.opacity = "0";
        lastnameTimesRef.current.style.opacity = "1";
    };

    const handleFineLastname = () => {
        changeIsLastnameOk(true);
        lastnameMsgRef.current.textContent = "";
        lastnameCheckRef.current.style.opacity = "1";
        lastnameTimesRef.current.style.opacity = "0";
    };

    //This function helps the user to understand how to fill properly the input handling the firstNames
    //A control structure indicates three different behavior that are depending of the value provided by the user
    //The first case is here to get sure that the first character is an uppercase and to allow a list of special characters
    //The second case is here to analyse the length of the name provided by the user: not too short, not too long
    //The last case is called when the user correctly filled the input
    //For each case an icon and a text are displayed to indicates the user how he managed it
    const handleLastName = () => {
        if (
            !lastName.match(
                /^[A-Z][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
            )
        ) {
            handleWrongLastname(
                "Un prénom doit commencer par une majuscule. Attention certains caractères spéciaux ne sont pas admis."
            );
        } else if (lastName.length < 3 || lastName.length > 30) {
            handleWrongLastname(
                "Nous acceptons les noms faisant entre 3 et 30 caractères."
            );
        } else {
            handleFineLastname();
        }
    };

    return {
        lastnameMsgRef,
        lastnameCheckRef,
        lastnameTimesRef,
        handleLastName,
    };
};

const LastnameDivision = ({ lastName, changeLastName, changeIsLastnameOk }) => {
    const {
        lastnameMsgRef,
        lastnameCheckRef,
        lastnameTimesRef,
        handleLastName,
    } = useLastnameDivision({ lastName, changeIsLastnameOk });
    return (
        <div className="personal-data-form__last-name-division">
            <div className="personal-data-form__icons-container">
                <FaCheck
                    ref={lastnameCheckRef}
                    className="personal-data-form__last-name-division__check-icon signup-perso-icon check js-handled"
                />
                <FaTimes
                    ref={lastnameTimesRef}
                    className="personal-data-form__last-name-division__times-icon signup-perso-icon times js-handled"
                />
            </div>
            <TextField
                id="outlined-last-name"
                label="Nom"
                variant="outlined"
                onChange={(e) => changeLastName(e.target.value)}
                onBlur={() => handleLastName()}
            />
            <span
                ref={lastnameMsgRef}
                id="personal-data-form__last-name-msg"
            ></span>
        </div>
    );
};

export default LastnameDivision;
