import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../features/signupData.slice";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [isEmailOk, setIsEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordOk, setIsPasswordOk] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //This function handles the behavior of the input mail and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //And it also show or hide icons that indicates the user if he did well
    const handleMail = () => {
        const mailMsg = document.getElementById("outlined-mail-msg");
        const checkIcon = document.querySelector(
            ".signup-form__email-division__check-icon"
        );
        const timesIcon = document.querySelector(
            ".signup-form__email-division__times-icon"
        );
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            mailMsg.textContent = "Le mail inséré n'est pas valide";
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else {
            axios
                .get(
                    `${process.env.REACT_APP_API_URL}api/auth/checkMail/${email}`,
                    {
                        "Content-Type": "application/json",
                    }
                )
                .then((res) => {
                    if (res.data === null) {
                        setIsEmailOk(true);
                        mailMsg.textContent = "";
                        timesIcon.style.opacity = "0";
                        checkIcon.style.opacity = "1";
                    } else {
                        mailMsg.textContent =
                            "Le mail existe déjà dans notre base de donnée";
                        timesIcon.style.opacity = "1";
                        checkIcon.style.opacity = "0";
                    }
                })
                .catch((err) => {
                    setIsEmailOk(true);
                    mailMsg.textContent = "";
                    timesIcon.style.opacity = "0";
                    checkIcon.style.opacity = "1";
                });
        }
    };

    //This function handles the behavior of the input password and his data
    //Called on a onBlur event it displays a message if the data provided by the user doesn't fit our expectations
    //It handles the behavior of a bar indicating the level of security of his password
    //And it also show or hide icons that indicates the user if he did well
    const handlePassword = () => {
        const passwordMsg = document.getElementById("outlined-password-msg");
        const progressBar = document.getElementById("password__progress-bar");
        const checkIcon = document.querySelector(
            ".signup-form__password-division__check-icon"
        );
        const timesIcon = document.querySelector(
            ".signup-form__password-division__times-icon"
        );
        progressBar.classList = "";
        passwordMsg.textContent = "";
        if (
            !password.match(
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
            )
        ) {
            passwordMsg.textContent =
                "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial";
            progressBar.classList.add("progressRed");
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else if (password.length < 12) {
            progressBar.classList.add("progressBlue");
            passwordMsg.textContent =
                "Mot de passe assez fiable. Rajoutez des caractères si vous souhaitez plus de sécurité";
            setIsPasswordOk(true);
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        } else {
            progressBar.classList.add("progressGreen");
            passwordMsg.textContent = "Mot de passe fiable";
            setIsPasswordOk(true);
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        }
    };

    //This function handles the submission of the first signup form
    //@Params { Type: Object } --> the param of the onSubmit event
    //After checking that all the fields have been well filled it creates an object called user and gives it to the redux store
    //And then this function redirects the user to the next step
    const handleSubmission = (e) => {
        e.preventDefault();
        if (isEmailOk === true && isPasswordOk === true) {
            let userData = {
                email,
                password,
            };
            navigate("/signup-steps");
            dispatch(setSignupData(userData));
        }
    };
    return (
        <div id="signup" className="signup-container start-form">
            <form
                action=""
                className="signup-form"
                onSubmit={(e) => handleSubmission(e)}
            >
                <h2>Inscrivez-vous!</h2>
                <div className="signup-form__email-division">
                    <div className="signup-form__email-division__icons-container">
                        <FaCheck className="signup-form__email-division__check-icon signup-icon" />
                        <FaTimes className="signup-form__email-division__times-icon signup-icon" />
                    </div>
                    <TextField
                        id="outlined-mail"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleMail()}
                    />
                    <span id="outlined-mail-msg"></span>
                </div>
                <div className="signup-form__password-division">
                    <div className="signup-form__password-division__icons-container">
                        <FaCheck className="signup-form__password-division__check-icon signup-icon" />
                        <FaTimes className="signup-form__password-division__times-icon signup-icon" />
                    </div>
                    <TextField
                        id="outlined-password"
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handlePassword()}
                    />
                    <span id="outlined-password-msg"></span>
                    <div id="password__progress-bar"></div>
                </div>
                <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
                    Inscription
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
