import { Button, ButtonGroup, Popover } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../utils/functions/hooks";

const NavigationUser = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const screenWidth = useWindowSize().width;
    const ref = useRef();

    //This function is called when the user clicks on the menu button on the mobile version
    //@Params { type: Object } => the param from the onClick event
    //It just opens the menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        ref.current.classList.add("active");
        // document.querySelector("body").style.width = "calc(100vw + 17px)";
    };

    //This function is called when the user clicks on the X button on the mobile version
    //@Params { type: Object } => the param from the onClick event
    //It just closes the menu
    const handleClose = () => {
        setAnchorEl(null);
        ref.current.classList.remove("active");
        // document.querySelector("body").style.width = "100%";
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <nav className="user-navigation">
            {screenWidth > 1025 ? (
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button>
                        {window.location.href.split("3001/")[1] === "home" ? (
                            <a href="#go-on-top">Accueil</a>
                        ) : (
                            <Link to="/home">Accueil</Link>
                        )}
                    </Button>
                    <Button id="nav-scd-child">
                        <Link to="/profile">Profil</Link>
                    </Button>
                    <Button id="nav-thrd-child">
                        <Link to="/">Déconnexion</Link>
                    </Button>
                </ButtonGroup>
            ) : (
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
            )}
        </nav>
    );
};

export default NavigationUser;
