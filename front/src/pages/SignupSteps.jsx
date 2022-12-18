import { useState } from "react";
import SignupPersonalDataForm from "../components/SignupPersonalDataForm";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import SignupExtraDataForm from "../components/SignupExtraDataForm";
import signupBanner from "../assets/images/signup-steps-bg.webp";
import { useParallax } from "react-scroll-parallax";
import { useWindowSize } from "../utils/functions/hooks";

const SignupSteps = () => {
    const [stepState, setStepState] = useState("just-started");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [userPersonals, setUserPersonals] = useState(undefined);
    const screenWidth = useWindowSize().width;
    const bgSpeed = screenWidth > 1025 ? -10 : -5;
    const elemSpeed = screenWidth > 1025 ? 30 : 5;
    const parallax = useParallax({
        speed: bgSpeed,
    });
    const elemParallax = useParallax({
        speed: elemSpeed,
    });

    //This useEffect is here to show to the user on wich step of the signup form he stands
    useEffect(() => {
        const firstStepCheck = document.getElementById("step-auth-check");
        const scdStepCheck = document.getElementById("step-perso-check");
        if (stepState === "just-started") {
            firstStepCheck.style.opacity = "1";
        } else if (stepState === "almost-done") {
            scdStepCheck.style.opacity = "1";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepState]);

    //This function allow a child component to change the state of this one
    //@Params {Type: String}
    //When the form about the personal data is complete a new state is set wich leads us to the last step
    const changeStepState = (newState) => {
        setStepState(newState);
    };

    //This function allow a child component to change the state of this one
    //@Params {Type: String}
    //When the form about the personal data is complete a new state is set wich leads us to the last step
    const changeProfilePicture = (file) => {
        setProfilePicture(file);
    };

    //This function allow a child component to change the state of this one
    //@Params {Type: String}
    //When the form about the personal data is complete a new state is set wich leads us to the last step
    const changeUserPersonals = (data) => {
        setUserPersonals(data);
    };

    return (
        <main className="signup-steps">
            <img
                src={signupBanner}
                alt="Montagnes orientales enveloppées de brume"
                ref={parallax.ref}
                className="signup-steps__background-img"
            />
            <div className="signup-steps__content" ref={elemParallax.ref}>
                <section className="signup-steps__content__steps-indicator">
                    <div className="signup-steps__content__step">
                        <div className="signup-steps__content__step__icons-container">
                            <FaCheck
                                id="step-auth-check"
                                className="signup-steps__content__step__check-icon"
                            />
                            <FaTimes
                                id="step-auth-times"
                                className="signup-steps__content__step__times-icon"
                            />
                        </div>
                        <span
                            className="signup-steps__content__step-dot"
                            id="dot-step1"
                        ></span>
                        <p>1. Authentification</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <div className="signup-steps__content__step__icons-container">
                            <FaCheck
                                id="step-perso-check"
                                className="signup-steps__content__step__check-icon"
                            />
                            <FaTimes
                                id="step-perso-times"
                                className="signup-steps__content__step__times-icon"
                            />
                        </div>
                        <span
                            className="signup-steps__content__step-dot"
                            id="dot-step2"
                        ></span>
                        <p>2. Informations personnelles</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <div className="signup-steps__content__step__icons-container">
                            <FaCheck
                                id="step-extra-check"
                                className="signup-steps__content__step__check-icon"
                            />
                            <FaTimes
                                id="step-extra-times"
                                className="signup-steps__content__step__times-icon"
                            />
                        </div>
                        <span
                            className="signup-steps__content__step-dot"
                            id="dot-step3"
                        ></span>
                        <p>3. Informations facultatives</p>
                    </div>
                </section>
                <section className="signup-steps__content__form-container">
                    {stepState === "just-started" && (
                        <SignupPersonalDataForm
                            changeStepState={changeStepState}
                            changeProfilePicture={changeProfilePicture}
                            changeUserPersonals={changeUserPersonals}
                        />
                    )}
                    {stepState === "almost-done" && (
                        <SignupExtraDataForm
                            profilePicture={profilePicture}
                            userPersonals={userPersonals}
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default SignupSteps;
