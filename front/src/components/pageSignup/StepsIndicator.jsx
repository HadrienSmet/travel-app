import React, { useEffect } from "react";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const useStepsIndicator = ({ stepState }) => {
    const firstStepCheckRef = useRef(null);
    const scdStepCheckRef = useRef(null);

    //This useEffect is here to show to the user on wich step of the signup form he stands
    useEffect(() => {
        if (stepState === "just-started") {
            firstStepCheckRef.current.style.opacity = "1";
        } else if (stepState === "almost-done") {
            scdStepCheckRef.current.style.opacity = "1";
        }
    }, [stepState]);

    return {
        firstStepCheckRef,
        scdStepCheckRef,
    };
};

const StepsIndicator = ({ stepState }) => {
    const { firstStepCheckRef, scdStepCheckRef } = useStepsIndicator({
        stepState,
    });
    return (
        <section className="signup-steps__content__steps-indicator">
            <div className="signup-steps__content__step">
                <div className="signup-steps__content__step__icons-container">
                    <FaCheck
                        ref={firstStepCheckRef}
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
                        ref={scdStepCheckRef}
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
    );
};

export default StepsIndicator;
