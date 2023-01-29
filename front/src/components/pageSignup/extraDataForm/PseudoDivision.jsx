import { TextField } from "@mui/material";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { axiosCheckPseudo } from "../../../utils/functions/axiosCheckPseudo";

const usePseudoDivision = ({ pseudo, changeIsPseudoOk }) => {
    const pseudoMsgRef = useRef(null);
    const pseudoCheckRef = useRef(null);
    const pseudoTimesRef = useRef(null);

    const handleFinePseudo = () => {
        changeIsPseudoOk(true);
        pseudoMsgRef.current.textContent = "";
        pseudoTimesRef.current.style.opacity = "0";
        pseudoCheckRef.current.style.opacity = "1";
    };

    const handleWrongPseudo = (message) => {
        changeIsPseudoOk(false);
        pseudoMsgRef.current.textContent = message;
        pseudoTimesRef.current.style.opacity = "1";
        pseudoCheckRef.current.style.opacity = "0";
    };

    //This function handles the behavior of the input text representing the user pseudo and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //And it also show or hide icons that indicates the user if he did well
    const handlePseudo = () => {
        if (!pseudo.match(/^([a-zA-Z0-9]){3,20}$/)) {
            handleWrongPseudo(
                "Doit faire entre 3 et 20 caractères et ne peut contenir des caractères spéciaux"
            );
        } else {
            axiosCheckPseudo(pseudo)
                .then((res) => {
                    if (res.data === null) {
                        handleFinePseudo();
                    } else {
                        handleWrongPseudo(
                            "Le pseudo existe déjà dans notre base de donnée"
                        );
                    }
                })
                .catch((err) => {
                    handleFinePseudo();
                });
        }
    };

    return {
        pseudoMsgRef,
        pseudoCheckRef,
        pseudoTimesRef,
        handlePseudo,
    };
};

const PseudoDivision = ({ pseudo, changePseudo, changeIsPseudoOk }) => {
    const { pseudoMsgRef, pseudoCheckRef, pseudoTimesRef, handlePseudo } =
        usePseudoDivision({ pseudo, changeIsPseudoOk });
    return (
        <div className="extra-data-form__pseudo-division">
            <div className="extra-data-form__pseudo-division__icons-container">
                <FaCheck
                    ref={pseudoCheckRef}
                    className="extra-data-form__pseudo-division__check-icon last-step-icon check"
                />
                <FaTimes
                    ref={pseudoTimesRef}
                    className="extra-data-form__pseudo-division__times-icon last-step-icon times"
                />
            </div>
            <TextField
                id="outlined-pseudo"
                label="Pseudo"
                variant="outlined"
                required={true}
                onChange={(e) => changePseudo(e.target.value)}
                onBlur={() => handlePseudo()}
            />
            <span ref={pseudoMsgRef} id="extra-pseudo-msg"></span>
        </div>
    );
};

export default PseudoDivision;
