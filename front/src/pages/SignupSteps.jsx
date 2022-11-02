import React, { useState } from 'react';
import PersonalDataForm from '../components/PersonalDataForm';
import SignupCarousel from '../components/SignupCarousel';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useEffect } from 'react';
import ExtraDataForm from '../components/ExtraDataForm';

const SignupSteps = () => {
    const [stepState, setStepState] = useState("just-started");
    

    useEffect(() => {
        // handleStateEffect(stepState)
        const firstStepCheck = document.getElementById('step-auth-check');
        const scdStepCheck = document.getElementById('step-perso-check');
        if (stepState === "just-started") {
            firstStepCheck.style.opacity = "1";
        } else if (stepState === "almost-done") {
            scdStepCheck.style.opacity = "1"
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepState])

    const changeStepState = (newState) => {
        setStepState(newState)
    }

    // const handleStateEffect = () => {
    //     const firstStepCheck = document.querySelector("#step-auth:first-child");
    //     const scdStepCheck = document.querySelector("#step-perso:first-child");
    //     if (stepState === "just-started") {
    //         firstStepCheck.style.opacity = "1";
    //     } else if (stepState === "almost-done") {
    //         scdStepCheck.style.opacity = "1"
    //     }
    // }
    return (
        <section className="signup-steps">
            <SignupCarousel />
            <div className="signup-steps__content">
                <div className="signup-steps__content__steps-indicator">
                    <div className="signup-steps__content__step">
                        <div  className="signup-steps__content__step__icons-container">
                            <FaCheck id="step-auth-check" className='signup-steps__content__step__check-icon' />
                            <FaTimes id="step-auth-times" className='signup-steps__content__step__times-icon' />
                        </div>
                        <span className='signup-steps__content__step-dot' id='dot-step1'></span>
                        <p>1. Authentification</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <div  className="signup-steps__content__step__icons-container">
                            <FaCheck id='step-perso-check' className='signup-steps__content__step__check-icon' />
                            <FaTimes id='step-perso-times' className='signup-steps__content__step__times-icon' />
                        </div>
                        <span className='signup-steps__content__step-dot' id='dot-step2'></span>
                        <p>2. Informations personnelles</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <div  className="signup-steps__content__step__icons-container">
                            <FaCheck id='step-extra-check' className='signup-steps__content__step__check-icon' />
                            <FaTimes id='step-extra-times' className='signup-steps__content__step__times-icon' />
                        </div>
                        <span className='signup-steps__content__step-dot' id='dot-step3'></span>
                        <p>3. Informations facultatives</p>
                    </div>
                </div>
                <div className="signup-steps__content__form-container">
                    {stepState === "just-started" && <PersonalDataForm changeStepState={changeStepState} />}
                    {stepState === "almost-done" && <ExtraDataForm /> }
                </div>
            </div>
        </section>
    );
};

export default SignupSteps;