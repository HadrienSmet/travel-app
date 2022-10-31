import GuestNavigation from "./GuestNavigation";
import Logo from "./Logo";

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo-container">
                <Logo /> 
            </div>
            <GuestNavigation />
        </header>
    );
};

export default Header;