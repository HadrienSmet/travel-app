// import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const UserNavigation = () => {
    // const dispatch = useDispatch();
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
            </ButtonGroup>
        </nav>
    );
};

export default UserNavigation;