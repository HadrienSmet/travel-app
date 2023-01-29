import { TextField } from "@mui/material";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { axiosCheckMail } from "../../../utils/functions/axiosCheckMail";

const useEmailDivision = ({ email, changeIsEmailOk }) => {
    const mailMsgRef = useRef(null);
    const mailCheckRef = useRef(null);
    const mailTimesRef = useRef(null);

    const handleFineMail = () => {
        changeIsEmailOk(true);
        mailMsgRef.current.textContent = "";
        mailTimesRef.current.style.opacity = "0";
        mailCheckRef.current.style.opacity = "1";
    };

    const handleWrongMail = (message) => {
        changeIsEmailOk(false);
        mailMsgRef.current.textContent = message;
        mailTimesRef.current.style.opacity = "1";
        mailCheckRef.current.style.opacity = "0";
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
                <FaCheck
                    ref={mailCheckRef}
                    className="signup-form__email-division__check-icon signup-icon"
                />
                <FaTimes
                    ref={mailTimesRef}
                    className="signup-form__email-division__times-icon signup-icon"
                />
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
