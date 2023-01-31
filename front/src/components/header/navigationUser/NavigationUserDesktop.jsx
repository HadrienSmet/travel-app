import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationUserDesktop = () => {
    return (
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
    );
};

export default NavigationUserDesktop;
