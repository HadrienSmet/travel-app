import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserLoggedData } from "../../features/userLoggedData.slice";
import { setLoggedState } from "../../features/loggedState.slice";

import { Button } from "@mui/material";
import MUIClassicLoader from "../mui/MUIClassicLoader";

import { setJwtToken } from "../../utils/functions/tools/setJwtToken";
import { axiosSignIn } from "../../utils/functions/user/axiosSignIn";
import EmailDivision from "./EmailDivision";
import PasswordDivision from "./PasswordDivision";

const useSigninForm = () => {
    // const [mail, setMail] = useState("");
    // const [password, setPassword] = useState("");
    const [signinData, setSigninData] = useState({
        mail: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spanRef = useRef(null);
    const { mail, password } = signinData;

    const handleMail = (mail) => setSigninData({ ...signinData, mail });
    const handlePassword = (password) =>
        setSigninData({ ...signinData, password });

    const handleError = () => {
        spanRef.current.textContent =
            "Paire d'email et de mot de passe incorrect";
    };

    //This function is called when the user is trying to get connected to the app
    //@Params { type: Object } => the param froms the onClick event. Only here to prevent the default behavior
    //It starts by changing the local state to starts the loading animation
    //The mail and the password of the user are put into an object then axios make a call with a post method
    //If everything is ok and if the response doesn't indicates a lack in the request's authentification:
    //We set the data for the authentification in the local sotrage
    //We tell to the redux store that the user is connected to display the proper header and we also display the user's data
    //It ends the loading animation and leads the user to the home page
    //If an error is caught, a message is injected on the DOM
    const handleSubmission = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let data = {
            email: mail,
            password,
        };
        axiosSignIn(data)
            .then((res) => {
                if (res.status === 401) {
                    handleError();
                } else {
                    dispatch(setLoggedState(true));
                    dispatch(setUserLoggedData(res.data));
                    setJwtToken({
                        userId: res.data.userId,
                        token: res.data.token,
                    });
                    navigate("/home");
                    setIsLoading(false);
                }
            })
            .catch(() => {
                handleError();
            });
    };

    return {
        spanRef,
        isLoading,
        mail,
        password,
        handleMail,
        handlePassword,
        handleSubmission,
    };
};

const SigninForm = () => {
    const {
        spanRef,
        isLoading,
        mail,
        password,
        handleMail,
        handlePassword,
        handleSubmission,
    } = useSigninForm();
    return (
        <div id="signin" className="signin-container start-form">
            <form
                action=""
                className="signin-form"
                onSubmit={(e) => handleSubmission(e)}
            >
                <h2>Connectez-vous!</h2>
                <EmailDivision mail={mail} handleMail={handleMail} />
                <PasswordDivision
                    password={password}
                    handlePassword={handlePassword}
                />
                <span id="signin-msg" ref={spanRef}></span>
                {isLoading === false && (
                    <Button
                        variant="outlined"
                        onClick={(e) => handleSubmission(e)}
                    >
                        Connexion
                    </Button>
                )}
                {isLoading !== false && (
                    <MUIClassicLoader dynamicId="signin-loader" />
                )}
            </form>
        </div>
    );
};

export default SigninForm;
