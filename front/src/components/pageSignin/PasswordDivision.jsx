import { TextField } from "@mui/material";
import { FaCheck } from "react-icons/fa";

const PasswordDivision = ({ password, handlePassword }) => {
    return (
        <div className="signin-container__password-division">
            <div className="signin-container__icons-container">
                {password !== "" && <FaCheck className="signin-icon check" />}
            </div>
            <TextField
                id="outlined-password"
                label="Mot de passe"
                variant="outlined"
                type="password"
                required={true}
                onChange={(e) => handlePassword(e.target.value)}
            />
        </div>
    );
};

export default PasswordDivision;
