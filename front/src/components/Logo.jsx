// import logo from "../assets/images/logo-globe.png"
import { MdOutlineLanguage } from "react-icons/md";

const Logo = () => {
    return (
        <div className="logo-container">
            {/* <img src={logo} alt="logo app" /> */}
            <MdOutlineLanguage />
            <h2>Travel App</h2>
        </div>
    );
};

export default Logo;