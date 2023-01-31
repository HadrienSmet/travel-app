import { Button, ButtonGroup } from "@mui/material";

import { useDispatch } from "react-redux";
import { setWelcomeState } from "../../../features/welcomeState.slice";

const NavigationGuestDesktop = () => {
    const dispatch = useDispatch();
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => dispatch(setWelcomeState("signup"))}>
                Inscription
            </Button>
            <Button onClick={() => dispatch(setWelcomeState("signin"))}>
                Connexion
            </Button>
        </ButtonGroup>
    );
};

export default NavigationGuestDesktop;
