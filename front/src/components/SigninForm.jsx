import { TextField, Button } from '@mui/material'
import { useState } from 'react';

const SigninForm = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmission = (e) => {
        e.preventDefault();
        if (mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) 
            && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)) {
            console.log("ce mail et ce mot de passe et ce pseudo me semblent tout a fait correct jeune homme");
        }
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
                    <Button variant="outlined">Connexion</Button>
            </form>
        </div>
    );
};

export default SigninForm;