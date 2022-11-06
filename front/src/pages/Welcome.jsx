import React from 'react';
import { Parallax, useParallax } from 'react-scroll-parallax';
import { useSelector } from "react-redux";
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import imageBanner from '../assets/images/carousel-bg4.jpeg';

const Welcome = () => {
    const welcomeState = useSelector((state) => state.currentWelcomeState.welcomeState);
    const bannerParallax = useParallax({
        speed: -10,
    })
    return (
        <section className='welcome'>
            <img src={imageBanner} alt="img" ref={bannerParallax.ref} className='welcome__background-img' />
            <Parallax speed={30} scale={[1, 0.4]} className="welcome-carousel-content__paralaxed-element">
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
            </Parallax>
        </section>
    );
};

export default Welcome;