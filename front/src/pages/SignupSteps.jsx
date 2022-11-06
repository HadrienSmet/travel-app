import React, { useState } from 'react';
import PersonalDataForm from '../components/PersonalDataForm';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useEffect } from 'react';
import ExtraDataForm from '../components/ExtraDataForm';
import signupBanner from '../assets/images/carousel-bg1.jpeg'
import { useParallax } from 'react-scroll-parallax';

const SignupSteps = () => {
    const [stepState, setStepState] = useState("just-started");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [userPersonals, setUserPersonals] = useState(undefined);
    const parallax = useParallax({
        speed: -10,
    })
    const elemParallax = useParallax({
        speed: 30,
    })
    
    //This useEffect is here to show to the user on wich step of the signup form he stands
    useEffect(() => {
        const firstStepCheck = document.getElementById('step-auth-check');
        const scdStepCheck = document.getElementById('step-perso-check');
        if (stepState === "just-started") {
            firstStepCheck.style.opacity = "1";
        } else if (stepState === "almost-done") {
            scdStepCheck.style.opacity = "1"
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepState])

    //This function allow a child component to change the state of this one
    //@Params {Type: String}
    //When the form about the personal data is complete a new state is set wich leads us to the last step
    const changeStepState = (newState) => {
        setStepState(newState)
    }

    const changeProfilePicture = (file) => {
        setProfilePicture(file);
    }

    const changeUserPersonals = (data) => {
        setUserPersonals(data);
    }

    return (
        <section className="signup-steps">
            <img src={signupBanner} alt="img" ref={parallax.ref} className='signup-steps__background-img' />
            <div className="signup-steps__content" ref={elemParallax.ref}>
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
                    {stepState === "just-started" && 
                        <PersonalDataForm 
                            changeStepState={changeStepState} 
                            changeProfilePicture={changeProfilePicture} 
                            changeUserPersonals={changeUserPersonals} 
                        />
                    }
                    {stepState === "almost-done" && 
                        <ExtraDataForm 
                            profilePicture={profilePicture}
                            userPersonals={userPersonals}
                        /> 
                    }
                </div>
            </div>
        </section>
    );
};

export default SignupSteps;