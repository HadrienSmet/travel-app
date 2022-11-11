import { useSelector } from "react-redux";
import GuestNavigation from "./GuestNavigation";
import Logo from "./Logo";
import UserNavigation from "./UserNavigation";

const Header = () => {
    const isUserLogged = useSelector((state) => state.currentLoggedState.loggedState);
    return (
        <header className="header">
            <div className="header__logo-container">
                <Logo /> 
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