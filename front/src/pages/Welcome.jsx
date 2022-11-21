import React from 'react';
import { Parallax, useParallax } from 'react-scroll-parallax';
import { useDispatch, useSelector } from "react-redux";
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import imageBanner from '../assets/images/carousel-bg4.jpeg';

import  { useEffect } from 'react';

import { setLoggedState } from '../features/loggedState.slice';
import { setUserLoggedData } from '../features/userLoggedData.slice';
// import { setAlbumObjectArrayStore } from '../features/albumObjectArray.slice';
import { setWelcomeState } from '../features/welcomeState.slice';

const Welcome = () => {
    const dispatch = useDispatch();
    const welcomeState = useSelector((state) => state.currentWelcomeState.welcomeState);
    const bannerParallax = useParallax({
        speed: -10,
    })

    //This useEffect is here to clean the store redux and the localStorage when the user arrive on the page
    useEffect(() => {
        dispatch(setLoggedState(false));
        dispatch(setUserLoggedData(null));
        // dispatch(setAlbumObjectArrayStore([]));
        dispatch(setWelcomeState(null))
        localStorage.clear();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])
    return (
        <main className='welcome'>
            <img src={imageBanner} alt="img" ref={bannerParallax.ref} className='welcome__background-img' />
            <Parallax speed={30} scale={[1, 0.4]} className="welcome-main-content__paralaxed-element">
                <div className="welcome-main-content">
                    <div className="welcome-main-content-intro">
                        <h1>Partagez vos aventures, faites des rencontres, vivez des expériences grâce à Travel App!</h1>
                        <p>Cette application est une plateforme mise à disposition pour organiser des voyages, <br />
                        partager vos aventures avec vos amis <br />
                        et pour conserver les rencontres inoubliables que vous ne manquerez pas de vivre!</p>
                    </div>
                    { welcomeState === "signup" && <SignupForm /> }
                    { welcomeState === "signin" && <SigninForm /> }
                </div> 
            </Parallax>
        </main>
    );
};

export default Welcome;