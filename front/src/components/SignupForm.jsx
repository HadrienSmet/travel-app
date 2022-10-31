import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSignupData } from '../features/signupData.slice';
import { FaCheck, FaTimes } from "react-icons/fa";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [isEmailOk, setIsEmailOk] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [isPseudoOk, setIsPseudoOk] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordOk, setIsPasswordOk] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMail = () => {
        const mailMsg = document.getElementById('outlined-mail-msg');
        const checkIcon = document.querySelector(".signup-form__email-division__check-icon");
        const timesIcon = document.querySelector(".signup-form__email-division__times-icon");
        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            mailMsg.textContent = "Le mail inséré n'est pas valide";
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else {
            setIsEmailOk(true);
            mailMsg.textContent = "";
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        }
    }
    const handlePseudo = () => {
        const pseudoMsg = document.getElementById('outlined-pseudo-msg');
        const checkIcon = document.querySelector(".signup-form__pseudo-division__check-icon");
        const timesIcon = document.querySelector(".signup-form__pseudo-division__times-icon");
        if (!pseudo.match(/^([a-zA-Z0-9]){3,20}$/)) {
            pseudoMsg.textContent = "Doit faire entre 3 et 20 caractères et ne peut contenir des caractères spéciaux";
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else {
            setIsPseudoOk(true);
            pseudoMsg.textContent = "";
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        }
    }
    const handlePassword = () => {
        const passwordMsg = document.getElementById('outlined-password-msg');
        const progressBar = document.getElementById('password__progress-bar');
        const checkIcon = document.querySelector(".signup-form__password-division__check-icon");
        const timesIcon = document.querySelector(".signup-form__password-division__times-icon");
        progressBar.classList = "";
        passwordMsg.textContent = "";
        if (!password.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
            passwordMsg.textContent = "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial";
            progressBar.classList.add("progressRed");
            timesIcon.style.opacity = "1";
            checkIcon.style.opacity = "0";
        } else if (password.length < 12) {
            progressBar.classList.add("progressBlue");
            passwordMsg.textContent = "Mot de passe assez fiable. Rajoutez des caractères si vous souhaitez plus de sécurité"
            setIsPasswordOk(true);
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        } else {
            progressBar.classList.add("progressGreen");
            passwordMsg.textContent = "Mot de passe fiable"
            setIsPasswordOk(true);
            timesIcon.style.opacity = "0";
            checkIcon.style.opacity = "1";
        }
    }

    const handleSubmission = (e) => {
        e.preventDefault();
        if (isEmailOk === true 
        && isPasswordOk === true 
        && isPseudoOk === true) {
            let userData = {
                email,
                pseudo,
                password
            }
            
            navigate("/signup-steps");
            dispatch(setSignupData(userData));
        }
        console.log(email + "--" + password + "--" + pseudo)
    }
    return (
        <div className='signup-container start-form'>
            <form 
                action=""
                className='signup-form'
                onSubmit={(e) => handleSubmission(e)}>
                    <h3>Inscrivez-vous!</h3>
                    <div className="signup-form__email-division">
                        <div className="signup-form__email-division__icons-container">
                            <FaCheck className='signup-form__email-division__check-icon signup-icon' />
                            <FaTimes className='signup-form__email-division__times-icon signup-icon' />
                        </div>
                        <TextField 
                            id="outlined-mail" 
                            label="Email" 
                            variant="outlined"
                            type="email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleMail()} />
                        <span id="outlined-mail-msg"></span>
                    </div>
                    <div className="signup-form__pseudo-division">
                        <div className="signup-form__pseudo-division__icons-container">
                            <FaCheck className='signup-form__pseudo-division__check-icon signup-icon' />
                            <FaTimes className='signup-form__pseudo-division__times-icon signup-icon' />
                        </div>
                        <TextField 
                            id='outlined-pseudo'
                            label="Pseudo"
                            variant='outlined'
                            required={true}
                            onChange={(e) => setPseudo(e.target.value)}
                            onBlur={() => handlePseudo()} />
                        <span id="outlined-pseudo-msg"></span>
                    </div>
                    <div className="signup-form__password-division">
                        
                        
                        <div className="signup-form__password-division__icons-container">
                            <FaCheck className='signup-form__password-division__check-icon signup-icon' />
                            <FaTimes className='signup-form__password-division__times-icon signup-icon' />
                        </div>
                        <TextField 
                            id="outlined-password" 
                            label="Mot de passe" 
                            variant="outlined"
                            type="password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handlePassword()} />
                        <span id="outlined-password-msg"></span>
                        <div id="password__progress-bar"></div>
                    </div>  
                    <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Inscription</Button>
            </form>
        </div>
    );
};

export default SignupForm;