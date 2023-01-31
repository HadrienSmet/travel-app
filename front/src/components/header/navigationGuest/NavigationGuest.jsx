import { Button, ButtonGroup } from "@mui/material";

import { useDispatch } from "react-redux";
import { setWelcomeState } from "../../../features/welcomeState.slice";

import { useWindowSize } from "../../../utils/hooks/hooks";

import NavigationGuestMobile from "./NavigationGuestMobile";

const NavigationGuest = () => {
    const screenWidth = useWindowSize().width;
    const dispatch = useDispatch();

    return (
        <nav className="guest-navigation">
            {screenWidth > 1025 ? (
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button onClick={() => dispatch(setWelcomeState("signup"))}>
                        Inscription
                    </Button>
                    <Button onClick={() => dispatch(setWelcomeState("signin"))}>
                        Connexion
                    </Button>
                </ButtonGroup>
            ) : (
                <NavigationGuestMobile />
            )}
        </nav>
    );
};

export default NavigationGuest;
