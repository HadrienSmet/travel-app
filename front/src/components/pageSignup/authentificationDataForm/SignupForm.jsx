import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSignupData } from "../../../features/signupData.slice";

import { Button } from "@mui/material";
import EmailDivision from "./EmailDivision";
import PasswordDivision from "./PasswordDivision";

const useSignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [authData, setAuthData] = useState({
        email: "",
        isEmailOk: false,
        isPasswordOk: false,
        password: "",
    });
    const changeEmail = (email) => setAuthData({ ...authData, email });
    const changeIsEmailOk = (boolean) =>
        setAuthData({ ...authData, isEmailOk: boolean });
    const changeIsPasswordOk = (boolean) =>
        setAuthData({ ...authData, isPasswordOk: boolean });
    const changePassword = (password) => setAuthData({ ...authData, password });

    //This function handles the submission of the first signup form
    //@Params { Type: Object } --> the param of the onSubmit event
    //After checking that all the fields have been well filled it creates an object called user and gives it to the redux store
    //And then this function redirects the user to the next step
    const handleSubmission = (e) => {
        e.preventDefault();
        if (authData.isEmailOk === true && authData.isPasswordOk === true) {
            let userData = {
                email: authData.email,
                password: authData.password,
            };
            navigate("/signup-steps");
            dispatch(setSignupData(userData));
        }
    };

    return {
        authData,
        changeEmail,
        changeIsEmailOk,
        changeIsPasswordOk,
        changePassword,
        handleSubmission,
    };
};

const SignupForm = () => {
    const {
        authData,
        changeEmail,
        changeIsEmailOk,
        changeIsPasswordOk,
        changePassword,
        handleSubmission,
    } = useSignupForm();
    const { email, password } = authData;

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
                    changeEmail={changeEmail}
                    changeIsEmailOk={changeIsEmailOk}
                />
                <PasswordDivision
                    password={password}
                    changePassword={changePassword}
                    changeIsPasswordOk={changeIsPasswordOk}
                />
                <Button variant="outlined" onClick={(e) => handleSubmission(e)}>
                    Inscription
                </Button>
            </form>
        </div>
    );
};

export default SignupForm;
