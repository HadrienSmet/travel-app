import { TextField, Button } from '@mui/material'
import MUIClassicLoader from './MUIClassicLoader';
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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmission = (e) => {
        const span = document.getElementById('signin-msg');
        e.preventDefault();
        setIsLoading(true);
        let data = {
            email: mail,
            password
        }
        axios.post(`${process.env.REACT_APP_API_URL}api/auth/login`, data, {
            "Content-Type": "application/json"
        })
        .then((res) => {
            console.log(res);
            if (res.status === 401) {
                span.textContent = "Paire d'email et de mot de passe incorrect";
            } else {
                dispatch(setLoggedState(true));
                dispatch(setUserLoggedData(res.data));
                setJwtToken(res.data);
                navigate("/home");
                setIsLoading(false)
            }
            
        })
        .catch((err) => {
            console.log(err)
            span.textContent = "Paire d'email et de mot de passe incorrect";
        });
    }
    return (
        <div id='signin' className='signin-container start-form'>
            <form 
                action=""
                className='signin-form'
                onSubmit={(e) => handleSubmission(e)}
            >
                <h3>Connectez-vous!</h3>
                <div className="signin-container__email-division">
                    <div className="signin-container__icons-container">
                        {mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && <FaCheck className='signin-icon check' />}
                    </div>
                    <TextField 
                        id="outlined-mail" 
                        label="Email" 
                        variant="outlined"
                        type="email"
                        required={true}
                        onChange={(e) => setMail(e.target.value)}
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
                    />
                </div>
                <span id="signin-msg"></span>
                {isLoading === false && <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Connexion</Button>}
                {isLoading !== false && <MUIClassicLoader dynamicId="signin-loader" />}
            </form>
        </div>
    );
};

export default SigninForm;