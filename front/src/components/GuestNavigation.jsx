// import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setWelcomeState } from "../features/welcomeState.slice";
import { Button, ButtonGroup, Popover } from "@mui/material";
import { useWindowSize } from "../utils/functions/hooks";
import { useState } from "react";
import { useRef } from "react";

const GuestNavigation = () => {
    const screenWidth = useWindowSize().width;
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const ref = useRef();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        ref.current.classList.add('active');
        document.querySelector("body").style.width = "calc(100vw + 17px)";
    };
    
    const handleClose = () => {
        setAnchorEl(null);
        ref.current.classList.remove('active');
        document.querySelector("body").style.width = "100%";
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <nav className="guest-navigation">
        {screenWidth > 1024 ?
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={() => dispatch(setWelcomeState("signup"))}>Inscription</Button>
                <Button onClick={() => dispatch(setWelcomeState("signin"))}>Connexion</Button>
            </ButtonGroup>
        :
        <div className="guest-mobile-nav">
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
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
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Button onClick={() => {
                    dispatch(setWelcomeState("signup"));
                    handleClose();
                }}>Inscription</Button>
                <Button onClick={() => {
                    dispatch(setWelcomeState("signin"));
                    handleClose();
                }}>Connexion</Button>
            </Popover>
        </div>
        }
        </nav>
    );
};

export default GuestNavigation;