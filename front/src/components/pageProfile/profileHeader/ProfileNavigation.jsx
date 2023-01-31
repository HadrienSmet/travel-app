import { useEffect, useRef } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useWindowSize } from "../../../utils/hooks/hooks";

const useProfileNavigation = ({ profileState }) => {
    const screenWidth = useWindowSize().width;
    const ref = useRef();

    //This useEffect handles the position of the navigation bar of the profile section
    //His position is defined by the state of the component
    useEffect(() => {
        switch (profileState) {
            case "actuality":
                ref.current.style.transform = "translateX(0)";
                break;
            case "albums":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(110px)"
                        : "translateX(100%)";
                break;
            case "trips":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(220px)"
                        : "translateX(200%)";
                break;
            case "friends":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(330px)"
                        : "translateX(300%)";
                break;
            case "infos":
                ref.current.style.transform =
                    screenWidth > 1025
                        ? "translateX(440px)"
                        : "translateX(400%)";
                break;
            default:
                console.log("Bravo t'as réussi à faire bugger mon app");
        }
    }, [profileState, screenWidth]);

    return {
        ref,
    };
};

const ProfileNavigation = ({ profileState, handleProfileState }) => {
    const { ref } = useProfileNavigation({ profileState });
    return (
        <nav className="profile-section__navigation">
            <ButtonGroup
                className="profile-section__navigation__buttons-container"
                variant="text"
                aria-label="text button group"
            >
                <Button
                    id="actuality"
                    onClick={(e) => handleProfileState(e.target.id)}
                >
                    Actu
                </Button>
                <Button
                    id="albums"
                    onClick={(e) => handleProfileState(e.target.id)}
                >
                    Albums
                </Button>
                <Button
                    id="trips"
                    onClick={(e) => handleProfileState(e.target.id)}
                >
                    Trips
                </Button>
                <Button
                    id="friends"
                    onClick={(e) => handleProfileState(e.target.id)}
                >
                    Amis
                </Button>
                <Button
                    id="infos"
                    onClick={(e) => handleProfileState(e.target.id)}
                >
                    Infos
                </Button>
            </ButtonGroup>
            <span ref={ref} className="profile-section__navigation-bar"></span>
        </nav>
    );
};

export default ProfileNavigation;
