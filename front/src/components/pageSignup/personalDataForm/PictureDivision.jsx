import { Button } from "@mui/material";
import { FaUser } from "react-icons/fa";

const PictureDivision = ({ profilePictureUrl, handleProfilePicture }) => {
    return (
        <div className="personal-data-form__picture-area">
            <div className="personal-data-form__picture-container">
                {profilePictureUrl !== "" ? (
                    <div className="personal-data-form__profile-picture-container">
                        <img
                            className="personal-data-form__profile-picture"
                            src={profilePictureUrl}
                            alt={"Profil de l'utilisateur"}
                        />
                    </div>
                ) : (
                    <div className="personal-data-form__icon-background">
                        <FaUser />
                    </div>
                )}
            </div>
            <Button variant="outlined">
                {profilePictureUrl === "" && (
                    <label htmlFor="signup-file">Choisir une photo</label>
                )}
                {profilePictureUrl !== "" && (
                    <label htmlFor="signup-file">Changer de photo</label>
                )}
            </Button>
            <input
                type="file"
                name="file"
                id="signup-file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleProfilePicture(e)}
            />
        </div>
    );
};

export default PictureDivision;
