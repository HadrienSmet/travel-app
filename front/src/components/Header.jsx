import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GuestNavigation from "./GuestNavigation";
import Logo from "./Logo";
import UserNavigation from "./UserNavigation";

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
                <UserNavigation />
            :
                <GuestNavigation />
            }
        </header>
    );
};

export default Header;