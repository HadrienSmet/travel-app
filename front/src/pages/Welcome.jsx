import React from 'react';
import WelcomeCarousel from "../components/WelcomeCarousel";
import { useSelector } from "react-redux";
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';

const Welcome = () => {
    const welcomeState = useSelector((state) => state.currentWelcomeState.welcomeState)
    return (
        <section className='welcome'>
            <WelcomeCarousel />
            <div className="welcome-carousel-content">
                <div className="welcome-carousel-content-intro">
                    <h2>Partagez vos aventures, faites des rencontres, vivez des expériences grâce à Travel App!</h2>
                    <p>Cette application est une plateforme mise à disposition pour organiser des voyages, <br />
                       partager vos aventures avec vos amis <br />
                       et pour conserver les rencontres inoubliables que vous ne manquerez pas de vivre!</p>
                </div>
                { welcomeState === "signup" && <SignupForm /> }
                { welcomeState === "signin" && <SigninForm /> }
            </div>    
        </section>
    );
};

export default Welcome;