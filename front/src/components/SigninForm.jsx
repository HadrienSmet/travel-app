import { TextField, Button } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLoggedData } from '../features/userLoggedData.slice';

const SigninForm = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            navigate("/home");
            dispatch(setUserLoggedData(res.data));
        })
        .catch((err) => console.log(err));
    }
    return (
        <div className='signup-container start-form'>
            <form 
                action=""
                className='signin-form'
                onSubmit={(e) => handleSubmission(e)}>
                    <h3>Connectez-vous!</h3>
                    <TextField 
                        id="outlined-mail" 
                        label="Email" 
                        variant="outlined"
                        type="email"
                        required={true}
                        onChange={(e) => setMail(e.target.value)} />
                    <TextField 
                        id="outlined-password" 
                        label="Mot de passe" 
                        variant="outlined"
                        type="password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="outlined" onClick={(e) => handleSubmission(e)}>Connexion</Button>
            </form>
        </div>
    );
};

export default SigninForm;