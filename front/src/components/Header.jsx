import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigationGuest from "./NavigationGuest";
import Logo from "./Logo";
import NavigationUser from "./NavigationUser";
import { useRef, useState } from "react";
import { useEffect } from "react";

const useHeader = () => {
    const [scrollY, setScrollY] = useState(0);
    const headerRef = useRef(null);
    const isUserLogged = useSelector(
        (state) => state.currentLoggedState.loggedState
    );

    useEffect(() => {
        //Handles the header's behavior when the user is scrolling
        const handleScroll = () => {
            if (window.scrollY < scrollY) {
                headerRef.current.style.top = 0;
            } else {
                headerRef.current.style.top = "-104px";
            }
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollY]);

    return {
        headerRef,
        isUserLogged,
    };
};

const Header = () => {
    const { headerRef, isUserLogged } = useHeader();

    return (
        <header className="header" ref={headerRef}>
            <div className="header__logo-container">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            {isUserLogged === true ? <NavigationUser /> : <NavigationGuest />}
        </header>
    );
};

export default Header;
