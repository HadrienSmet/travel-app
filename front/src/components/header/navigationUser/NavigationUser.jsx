import { useWindowSize } from "../../../utils/hooks/hooks";
import NavigationUserDesktop from "./NavigationUserDesktop";
import NavigationUserMobile from "./NavigationUserMobile";

const NavigationUser = () => {
    const screenWidth = useWindowSize().width;

    return (
        <nav className="user-navigation">
            {screenWidth > 1025 ? (
                <NavigationUserDesktop />
            ) : (
                <NavigationUserMobile />
            )}
        </nav>
    );
};

export default NavigationUser;
