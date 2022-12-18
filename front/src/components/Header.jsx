import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigationGuest from "./NavigationGuest";
import Logo from "./Logo";
import NavigationUser from "./NavigationUser";
import { useState } from "react";

const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const isUserLogged = useSelector(
        (state) => state.currentLoggedState.loggedState
    );

    //Handles the header's behavior when the user is scrolling
    const handleScroll = () => {
        const header = document.querySelector("header");
        if (window.scrollY < scrollY) {
            header.style.top = 0;
        } else {
            header.style.top = "-104px";
        }
        setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return (
        <header className="header">
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
