import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigationGuest from "./NavigationGuest";
import Logo from "./Logo";
import NavigationUser from "./NavigationUser";

const Header = () => {
    const isUserLogged = useSelector((state) => state.currentLoggedState.loggedState);
    return (
        <header className="header">
            <div className="header__logo-container">
                <Link to="/" >
                    <Logo /> 
                </Link>
            </div>
            { isUserLogged === true ? 
                <NavigationUser />
            :
                <NavigationGuest />
            }
        </header>
    );
};

export default Header;