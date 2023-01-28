import { TextField, Button } from "@mui/material";
import MUIClassicLoader from "./MUIClassicLoader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { setUserLoggedData } from "../features/userLoggedData.slice";
import { setLoggedState } from "../features/loggedState.slice";
import { setJwtToken } from "../utils/functions/tools";
import { axiosSignIn } from "../utils/functions/axiosSignIn";
import { useRef } from "react";

export const signIn = () => {};

const useSigninForm = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spanRef = useRef(null);

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
                    spanRef.current.textContent =
                        "Paire d'email et de mot de passe incorrect";
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
            .catch((err) => {
                spanRef.current.textContent =
                    "Paire d'email et de mot de passe incorrect";
            });
    };

    return {
        spanRef,
        isLoading,
        mail,
        password,
        setMail,
        setPassword,
        handleSubmission,
    };
};

const SigninForm = () => {
    const {
        spanRef,
        isLoading,
        mail,
        password,
        setMail,
        setPassword,
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
                <div className="signin-container__email-division">
                    <div className="signin-container__icons-container">
                        {mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && (
                            <FaCheck className="signin-icon check" />
                        )}
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
                        {password !== "" && (
                            <FaCheck className="signin-icon check" />
                        )}
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
