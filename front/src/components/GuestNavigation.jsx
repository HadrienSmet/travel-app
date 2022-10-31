// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setWelcomeState } from "../features/welcomeState.slice";
import { Button, ButtonGroup } from "@mui/material";

const GuestNavigation = () => {
    const dispatch = useDispatch();
    return (
        <nav className="guest-navigation">
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={() => dispatch(setWelcomeState("signup"))}>Inscription</Button>
                <Button onClick={() => dispatch(setWelcomeState("signin"))}>Connexion</Button>
            </ButtonGroup>
        </nav>
    );
};

export default GuestNavigation;