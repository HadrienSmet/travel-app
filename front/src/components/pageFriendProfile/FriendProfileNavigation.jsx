import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useRef } from "react";

const useFriendProfileNavigation = ({ friendProfileState }) => {
    const ref = useRef();

    useEffect(() => {
        switch (friendProfileState) {
            case "actuality":
                ref.current.style.transform = "translateX(0)";
                break;
            case "albums":
                ref.current.style.transform = "translateX(100%)";
                break;
            case "trips":
                ref.current.style.transform = "translateX(200%)";
                break;
            case "friends":
                ref.current.style.transform = "translateX(300%)";
                break;
            case "infos":
                ref.current.style.transform = "translateX(400%)";
                break;
            default:
                console.log("Bravo t'as réussi à faire bugger mon app");
                break;
        }
    }, [friendProfileState]);

    return {
        ref,
    };
};

const FriendProfileNavigation = ({
    friendProfileState,
    changeFriendProfileState,
}) => {
    const { ref } = useFriendProfileNavigation({ friendProfileState });

    return (
        <nav className="profile-section__navigation">
            <ButtonGroup
                className="profile-section__navigation__buttons-container"
                variant="text"
                aria-label="text button group"
            >
                <Button
                    id="actuality"
                    onClick={(e) => changeFriendProfileState(e.target.id)}
                >
                    Actu
                </Button>
                <Button
                    id="albums"
                    onClick={(e) => changeFriendProfileState(e.target.id)}
                >
                    Albums
                </Button>
                <Button
                    id="trips"
                    onClick={(e) => changeFriendProfileState(e.target.id)}
                >
                    Trips
                </Button>
                <Button
                    id="friends"
                    onClick={(e) => changeFriendProfileState(e.target.id)}
                >
                    Amis
                </Button>
                <Button
                    id="infos"
                    onClick={(e) => changeFriendProfileState(e.target.id)}
                >
                    Infos
                </Button>
            </ButtonGroup>
            <span
                ref={ref}
                id="friend-nav-bar"
                className="profile-section__navigation-bar"
            ></span>
        </nav>
    );
};

export default FriendProfileNavigation;
