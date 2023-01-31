import { Button, Popover } from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const useNavigationUserMobile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const ref = useRef();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        ref.current.classList.add("active");
    };

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

const NavigationUserMobile = () => {
    const { anchorEl, ref, handleClick, handleClose } =
        useNavigationUserMobile();

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className="user-mobile-nav">
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
                className="mobile-user-popover"
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
                <Button onClick={() => handleClose()}>
                    <Link to="/home">Accueil</Link>
                </Button>
                <Button onClick={() => handleClose()}>
                    <Link to="/profile">Profil</Link>
                </Button>
                <Button onClick={() => handleClose()}>
                    <Link to="/">Déconnexion</Link>
                </Button>
            </Popover>
        </div>
    );
};

export default NavigationUserMobile;
