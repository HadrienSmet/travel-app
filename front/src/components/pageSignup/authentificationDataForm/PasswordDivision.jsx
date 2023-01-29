import { TextField } from "@mui/material";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const usePasswordDivision = ({ password, changeIsPasswordOk }) => {
    const progressBarRef = useRef(null);
    const passwordMsgRef = useRef(null);
    const passwordCheckRef = useRef(null);
    const passwordTimesRef = useRef(null);

    const handleWrongPassword = () => {
        changeIsPasswordOk(false);
        passwordMsgRef.current.textContent =
            "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial";
        progressBarRef.current.classList.add("progressRed");
        passwordTimesRef.current.style.opacity = "1";
        passwordCheckRef.current.style.opacity = "0";
    };

    const handleFinePassword = () => {
        changeIsPasswordOk(true);
        progressBarRef.current.classList.add("progressBlue");
        passwordMsgRef.current.textContent =
            "Mot de passe assez fiable. Rajoutez des caractères si vous souhaitez plus de sécurité";
        passwordTimesRef.current.style.opacity = "0";
        passwordCheckRef.current.style.opacity = "1";
    };

    const handleGreatPassword = () => {
        changeIsPasswordOk(true);
        progressBarRef.current.classList.add("progressGreen");
        passwordMsgRef.current.textContent = "Mot de passe fiable";
        passwordTimesRef.current.style.opacity = "0";
        passwordCheckRef.current.style.opacity = "1";
    };
    //This function handles the behavior of the input password and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //It handles the behavior of a bar indicating the level of security of his password
    //And it also show or hide icons that indicates the user if he did well
    const handlePassword = () => {
        progressBarRef.current.classList = "";
        passwordMsgRef.current.textContent = "";
        if (
            !password.match(
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
            )
        ) {
            handleWrongPassword();
        } else if (password.length < 12) {
            handleFinePassword();
        } else {
            handleGreatPassword();
        }
    };

    return {
        progressBarRef,
        passwordMsgRef,
        passwordCheckRef,
        passwordTimesRef,
        handlePassword,
    };
};

const PasswordDivision = ({ password, changePassword, changeIsPasswordOk }) => {
    const {
        progressBarRef,
        passwordMsgRef,
        passwordCheckRef,
        passwordTimesRef,
        handlePassword,
    } = usePasswordDivision({ password, changeIsPasswordOk });
    return (
        <div className="signup-form__password-division">
            <div className="signup-form__password-division__icons-container">
                <FaCheck
                    ref={passwordCheckRef}
                    className="signup-form__password-division__check-icon signup-icon"
                />
                <FaTimes
                    ref={passwordTimesRef}
                    className="signup-form__password-division__times-icon signup-icon"
                />
            </div>
            <TextField
                id="outlined-password"
                label="Mot de passe"
                variant="outlined"
                type="password"
                required={true}
                onChange={(e) => changePassword(e.target.value)}
                onBlur={() => handlePassword()}
            />
            <span ref={passwordMsgRef} id="outlined-password-msg"></span>
            <div ref={progressBarRef} id="password__progress-bar"></div>
        </div>
    );
};

export default PasswordDivision;
