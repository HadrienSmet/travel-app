import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const UserNavigation = () => {
    return (
        <nav className="user-navigation">
            <ButtonGroup variant="text" aria-label="text button group">
                <Button>
                    <Link to="/home">Accueil</Link>
                </Button>
                <Button id="nav-scd-child">
                    <Link to="/profile">Profil</Link>
                </Button>
                <Button id="nav-thrd-child">
                    <Link to ="/">Déconnexion</Link>
                </Button>
                <Button id="nav-thrd-child">
                    <Link to ="/globe">Globe</Link>
                </Button>
            </ButtonGroup>
        </nav>
    );
};

export default UserNavigation;