import { useRef } from "react";
import { axiosCheckPseudo } from "../../../utils/functions/user/axiosCheckPseudo";

import { TextField } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";

const usePseudoDivision = ({ extraData, changeIsPseudoOk }) => {
    const pseudoMsgRef = useRef(null);
    const pseudoCheckRef = useRef(null);
    const pseudoTimesRef = useRef(null);

    const handleFinePseudo = () => {
        changeIsPseudoOk(true);
        pseudoMsgRef.current.textContent = "";
        pseudoTimesRef.current.classList.remove("visible");
        pseudoCheckRef.current.classList.remove("invisible");
        pseudoTimesRef.current.classList.add("invisible");
        pseudoCheckRef.current.classList.add("visible");
    };

    const handleWrongPseudo = (message) => {
        changeIsPseudoOk(false);
        pseudoMsgRef.current.textContent = message;
        pseudoTimesRef.current.classList.remove("invisible");
        pseudoCheckRef.current.classList.remove("visible");
        pseudoTimesRef.current.classList.add("visible");
        pseudoCheckRef.current.classList.add("invisible");
    };

    //This function handles the behavior of the input text representing the user pseudo and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //And it also show or hide icons that indicates the user if he did well
    const handlePseudo = () => {
        if (!extraData.pseudo.match(/^([a-zA-Z0-9]){3,20}$/)) {
            handleWrongPseudo(
                "Doit faire entre 3 et 20 caractères et ne peut contenir des caractères spéciaux"
            );
        } else {
            axiosCheckPseudo(extraData.pseudo)
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

const PseudoDivision = ({ extraData, changePseudo, changeIsPseudoOk }) => {
    const { pseudoMsgRef, handlePseudo, pseudoCheckRef, pseudoTimesRef } =
        usePseudoDivision({
            extraData,
            changeIsPseudoOk,
        });
    return (
        <div className="extra-data-form__pseudo-division">
            <div className="extra-data-form__pseudo-division__icons-container">
                <div className="ref-div" ref={pseudoCheckRef}>
                    <FaCheck className="extra-data-form__pseudo-division__check-icon last-step-icon check" />
                </div>
                <div className="ref-div" ref={pseudoTimesRef}>
                    <FaTimes className="extra-data-form__pseudo-division__times-icon last-step-icon times" />
                </div>
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
