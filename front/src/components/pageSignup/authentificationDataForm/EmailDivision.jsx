import { useRef } from "react";

import { TextField } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";

import { axiosCheckMail } from "../../../utils/functions/user/axiosCheckMail";

const useEmailDivision = ({ email, changeIsEmailOk }) => {
    const mailMsgRef = useRef(null);
    const mailCheckRef = useRef(null);
    const mailTimesRef = useRef(null);

    const handleFineMail = () => {
        changeIsEmailOk(true);
        mailMsgRef.current.textContent = "";
        mailTimesRef.current.classList.remove("visible");
        mailCheckRef.current.classList.remove("invisible");
        mailTimesRef.current.classList.add("invisible");
        mailCheckRef.current.classList.add("visible");
    };

    const handleWrongMail = (message) => {
        changeIsEmailOk(false);
        mailMsgRef.current.textContent = message;
        mailTimesRef.current.classList.remove("invisible");
        mailCheckRef.current.classList.remove("visible");
        mailTimesRef.current.classList.add("visible");
        mailCheckRef.current.classList.add("invisible");
    };

    //This function handles the behavior of the input mail and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //And it also show or hide icons that indicates the user if he did well
    const handleMail = () => {
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            handleWrongMail("Le mail inséré n'est pas valide");
        } else {
            axiosCheckMail(email)
                .then((res) => {
                    if (res.data === null) {
                        handleFineMail();
                    } else {
                        handleWrongMail(
                            "Le mail existe déjà dans notre base de donnée"
                        );
                    }
                })
                .catch((err) => {
                    handleFineMail();
                });
        }
    };

    return {
        mailMsgRef,
        mailCheckRef,
        mailTimesRef,
        handleMail,
    };
};

const EmailDivision = ({ email, changeEmail, changeIsEmailOk }) => {
    const { mailMsgRef, mailCheckRef, mailTimesRef, handleMail } =
        useEmailDivision({ email, changeIsEmailOk });
    return (
        <div className="signup-form__email-division">
            <div className="signup-form__email-division__icons-container">
                <div className="ref-div" ref={mailCheckRef}>
                    <FaCheck className="signup-form__email-division__check-icon signup-icon" />
                </div>
                <div className="ref-div" ref={mailTimesRef}>
                    <FaTimes className="signup-form__email-division__times-icon signup-icon" />
                </div>
            </div>
            <TextField
                id="outlined-mail"
                label="Email"
                variant="outlined"
                type="email"
                required={true}
                onChange={(e) => changeEmail(e.target.value)}
                onBlur={() => handleMail()}
            />
            <span ref={mailMsgRef} id="outlined-mail-msg"></span>
        </div>
    );
};

export default EmailDivision;
