import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSignupData } from "../../../features/signupData.slice";

import { Button } from "@mui/material";
import EmailDivision from "./EmailDivision";
import PasswordDivision from "./PasswordDivision";

const useSignupForm = ({ isEmailOk, isPasswordOk, email, password }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    return {
        handleSubmission,
    };
};

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [isEmailOk, setIsEmailOk] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordOk, setIsPasswordOk] = useState(false);
    const { handleSubmission } = useSignupForm({
        isEmailOk,
        isPasswordOk,
        email,
        password,
    });

    return (
        <div id="signup" className="signup-container start-form">
            <form
                action=""
                className="signup-form"
                onSubmit={(e) => handleSubmission(e)}
            >
                <h2>Inscrivez-vous!</h2>
                <EmailDivision
                    email={email}
                    changeEmail={(value) => setEmail(value)}
                    changeIsEmailOk={(value) => setIsEmailOk(value)}
                />
                <PasswordDivision
                    password={password}
                    changePassword={(value) => setPassword(value)}
                    changeIsPasswordOk={(value) => setIsPasswordOk(value)}
                />
                <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
                    Inscription
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
