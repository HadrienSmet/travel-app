import React from 'react';
import PersonalDataForm from '../components/PersonalDataForm';
import SignupCarousel from '../components/SignupCarousel';

const SignupSteps = () => {
    return (
        <section className="signup-steps">
            <SignupCarousel />
            <div className="signup-steps__content">
                <div className="signup-steps__content__steps-indicator">
                    <div className="signup-steps__content__step">
                        <span className='signup-steps__content__step-dot' id='dot-step1'></span>
                        <p>1. Authentification</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <span className='signup-steps__content__step-dot' id='dot-step2'></span>
                        <p>2. Informations personnelles</p>
                    </div>
                    <div className="signup-steps__content__step">
                        <span className='signup-steps__content__step-dot' id='dot-step3'></span>
                        <p>3. Informations facultatives</p>
                    </div>
                </div>
                <div className="signup-steps__content__form-container">
                    <PersonalDataForm />
                </div>
            </div>
        </section>
    );
};

export default SignupSteps;