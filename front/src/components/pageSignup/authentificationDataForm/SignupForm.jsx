import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../features/signupData.slice";
import EmailDivision from "./EmailDivision";
import PasswordDivision from "./PasswordDivision";

const useSignupEmail = () => {
    const [email, setEmail] = useState("");
    const [isEmailOk, setIsEmailOk] = useState(false);

    const changeEmail = (email) => setEmail(email);
    const changeIsEmailOk = (boolean) => setIsEmailOk(boolean);

    return {
        email,
        isEmailOk,
        changeEmail,
        changeIsEmailOk,
    };
};

const useSignupPassword = () => {
    const [password, setPassword] = useState("");
    const [isPasswordOk, setIsPasswordOk] = useState(false);

    const changePassword = (password) => setPassword(password);
    const changeIsPasswordOk = (boolean) => setIsPasswordOk(boolean);

    return {
        password,
        isPasswordOk,
        changePassword,
        changeIsPasswordOk,
    };
};

const useSignupForm = () => {
    const { email, isEmailOk } = useSignupEmail();
    const { password, isPasswordOk } = useSignupPassword();
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
    const { email, changeEmail, changeIsEmailOk } = useSignupEmail();
    const { password, changePassword, changeIsPasswordOk } =
        useSignupPassword();
    const { handleSubmission } = useSignupForm();

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
