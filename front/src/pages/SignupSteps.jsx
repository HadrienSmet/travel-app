import { useState } from "react";
import { useParallax } from "react-scroll-parallax";
import { useWindowSize } from "../utils/hooks/hooks";

import SignupPersonalDataForm from "../components/pageSignup/personalDataForm/SignupPersonalDataForm";
import SignupExtraDataForm from "../components/pageSignup/extraDataForm/SignupExtraDataForm";
import signupBanner from "../assets/images/signup-steps-bg.webp";
import StepsIndicator from "../components/pageSignup/StepsIndicator";

const useSignupSteps = () => {
    const [stepState, setStepState] = useState("just-started");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [userPersonals, setUserPersonals] = useState(undefined);

    const changeStepState = (newState) => setStepState(newState);
    const changeProfilePicture = (file) => setProfilePicture(file);
    const changeUserPersonals = (data) => setUserPersonals(data);

    return {
        stepState,
        profilePicture,
        userPersonals,
        changeProfilePicture,
        changeStepState,
        changeUserPersonals,
    };
};

const useSignupStepsParallax = () => {
    const screenWidth = useWindowSize().width;

    const bgSpeed = screenWidth > 1025 ? -10 : -5;
    const elemSpeed = screenWidth > 1025 ? 30 : 5;

    const parallax = useParallax({
        speed: bgSpeed,
    });
    const elemParallax = useParallax({
        speed: elemSpeed,
    });

    return {
        parallax,
        elemParallax,
    };
};

const SignupSteps = () => {
    const {
        stepState,
        profilePicture,
        userPersonals,
        changeProfilePicture,
        changeStepState,
        changeUserPersonals,
    } = useSignupSteps();
    const { parallax, elemParallax } = useSignupStepsParallax();

    return (
        <main className="signup-steps">
            <img
                src={signupBanner}
                alt="Montagnes orientales enveloppées de brume"
                ref={parallax.ref}
                className="signup-steps__background-img"
            />
            <div className="signup-steps__content" ref={elemParallax.ref}>
                <StepsIndicator stepState={stepState} />
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
