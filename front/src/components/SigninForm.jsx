import { TextField, Button } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { setUserLoggedData } from '../features/userLoggedData.slice';
import { setLoggedState } from '../features/loggedState.slice';
import { setJwtToken } from '../utils/functions/tools';

const SigninForm = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMailBehavior = () => {

    }
    const handlePasswordBehavior = () => {

    }

    const handleSubmission = (e) => {
        e.preventDefault();
        // if (mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) 
        //     && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)) {
        //     console.log("ce mail et ce mot de passe et ce pseudo me semblent tout a fait correct jeune homme");
        // }
        let data = {
            email: mail,
            password
        }
        axios.post("http://localhost:3000/api/auth/login", data, {
            "Content-Type": "application/json"
        })
        .then((res) => {
            console.log(res);
            dispatch(setLoggedState(true));
            dispatch(setUserLoggedData(res.data));
            setJwtToken(res.data);
            navigate("/home");
        })
        .catch((err) => console.log(err));
    }
    return (
        <div className='signin-container start-form'>
            <form 
                action=""
                className='signin-form'
                onSubmit={(e) => handleSubmission(e)}>
                    <h3>Connectez-vous!</h3>
                    <div className="signin-container__email-division">
                        <div className="signin-container__icons-container">
                            { mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && <FaCheck className='signin-icon check' />}
                        </div>
                            <TextField 
                            id="outlined-mail" 
                            label="Email" 
                            variant="outlined"
                            type="email"
                            required={true}
                            onChange={(e) => setMail(e.target.value)}
                            onBlur={() => handleMailBehavior()} 
                        />
                    </div>
                    <div className="signin-container__password-division">
                        <div className="signin-container__icons-container">
                            {password !== "" && <FaCheck className='signin-icon check' />}
                        </div>
                        <TextField 
                            id="outlined-password" 
                            label="Mot de passe" 
                            variant="outlined"
                            type="password"
                            required={true}
                            onChange={(e) => setPassword(e.target.value)} 
                            onBlur={() => handlePasswordBehavior()} 
                        />
                    </div>
                    
                    
                    
                    
                    <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Connexion</Button>
            </form>
        </div>
    );
};

export default SigninForm;