import { useEffect } from "react";
import { Parallax, useParallax } from "react-scroll-parallax";
import { useWindowSize } from "../utils/functions/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedState } from "../features/loggedState.slice";
import { setUserLoggedData } from "../features/userLoggedData.slice";
import { resetAlbumObjectArray } from "../features/albumObjectArray.slice";
import { setWelcomeState } from "../features/welcomeState.slice";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import imageDesktop from "../assets/images/home-desktop-bg.webp";
import imageMobile from "../assets/images/home-mobile-bg.webp";

const Welcome = () => {
    const dispatch = useDispatch();
    const welcomeState = useSelector(
        (state) => state.currentWelcomeState.welcomeState
    );
    const screenWidth = useWindowSize().width;
    const parallaxBannerSpeed = screenWidth > 1025 ? -10 : -5;
    const parallaxElementSpeed = screenWidth > 1025 ? 40 : 5;
    const scaleElement = screenWidth > 1025 ? [1, 0.4] : [1, 0.9];
    const backgroundImg = screenWidth > 678 ? imageDesktop : imageMobile;
    const backgroundImgAlt = screenWidth > 678 ? "Cascades dans un paysage polaire" : "Chemin au milieu des montagnes";

    const bannerParallax = useParallax({
        speed: parallaxBannerSpeed,
    });

    //This useEffect is here to clean the store redux and the localStorage when the user arrive on the page
    useEffect(() => {
        dispatch(setLoggedState(false));
        dispatch(setUserLoggedData(null));
        dispatch(resetAlbumObjectArray([]));
        dispatch(setWelcomeState(null));
        localStorage.clear();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);
    return (
        <main className="welcome">
            <img
                src={backgroundImg}
                alt={backgroundImgAlt}
                ref={bannerParallax.ref}
                className="welcome__background-img"
            />
            <Parallax
                speed={parallaxElementSpeed}
                scale={scaleElement}
                className="welcome-main-content__paralaxed-element"
            >
                <div className="welcome-main-content">
                    <div className="welcome-main-content-intro">
                        <h1>
                            Partagez vos aventures, faites des rencontres, vivez
                            des exp??riences gr??ce ?? Travel App!
                        </h1>
                        <p>
                            Cette application est une plateforme mise ??
                            disposition pour organiser des voyages, <br />
                            partager vos aventures avec vos amis <br />
                            et pour conserver les rencontres inoubliables que
                            vous ne manquerez pas de vivre!
                        </p>
                    </div>
                    {welcomeState === "signup" && <SignupForm />}
                    {welcomeState === "signin" && <SigninForm />}
                </div>
            </Parallax>
        </main>
    );
};

export default Welcome;
