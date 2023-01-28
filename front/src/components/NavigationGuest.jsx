// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setWelcomeState } from "../features/welcomeState.slice";
import { Button, ButtonGroup, Popover } from "@mui/material";
import { useWindowSize } from "../utils/functions/hooks";
import { useState } from "react";
import { useRef } from "react";

const useNavigationGuest = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const ref = useRef();

    //This function is called when the user clicks on the menu button on the mobile version
    //@Params { type: Object } => the param from the onClick event
    //It just open the menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        ref.current.classList.add("active");
    };

    //This function is called when the user clicks on the X button on the mobile version
    //@Params { type: Object } => the param from the onClick event
    //It just close the menu
    const handleClose = () => {
        setAnchorEl(null);
        ref.current.classList.remove("active");
    };

    return {
        anchorEl,
        ref,
        handleClick,
        handleClose,
    };
};

const NavigationGuest = () => {
    const { anchorEl, ref, handleClick, handleClose } = useNavigationGuest();
    const screenWidth = useWindowSize().width;
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
                <div className="guest-mobile-nav">
                    <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                    >
                        <div ref={ref} className="toggle-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Button>
                    <Popover
                        className="mobile-guest-popover"
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Button
                            onClick={() => {
                                dispatch(setWelcomeState("signup"));
                                handleClose();
                            }}
                        >
                            Inscription
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(setWelcomeState("signin"));
                                handleClose();
                            }}
                        >
                            Connexion
                        </Button>
                    </Popover>
                </div>
            )}
        </nav>
    );
};

export default NavigationGuest;
