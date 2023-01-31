import { TextField } from "@mui/material";
import { FaCheck } from "react-icons/fa";

const EmailDivision = ({ mail, handleMail }) => {
    return (
        <div className="signin-container__email-division">
            <div className="signin-container__icons-container">
                {mail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) && (
                    <FaCheck className="signin-icon check" />
                )}
            </div>
            <TextField
                id="outlined-mail"
                label="Email"
                variant="outlined"
                type="email"
                required={true}
                onChange={(e) => handleMail(e.target.value)}
            />
        </div>
    );
};

export default EmailDivision;
