import { TextField } from "@mui/material";
import { useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const useDescriptionDivision = ({ description }) => {
    const descriptionMsgRef = useRef(null);
    const descriptionCheckRef = useRef(null);
    const descriptionTimesRef = useRef(null);

    //This function change the state of this component in order to allow the user to share a description about himself
    //@Params { Type: Object } --> The param of the onChange event listening the textarea
    const handleDescription = (e) => {
        if (description.match(/\$<>=\+\*/i)) {
            descriptionMsgRef.current.textContent =
                "Les caractères suivants ne sont pas tolérés. $ > < = + *";
            descriptionTimesRef.current.style.opacity = "1";
            descriptionCheckRef.current.style.opacity = "0";
        } else {
            descriptionMsgRef.current.textContent = "";
            descriptionTimesRef.current.style.opacity = "0";
            descriptionCheckRef.current.style.opacity = "1";
        }
    };

    return {
        descriptionMsgRef,
        descriptionCheckRef,
        descriptionTimesRef,
        handleDescription,
    };
};

const DescriptionDivision = ({ description, changeDescription }) => {
    const {
        descriptionMsgRef,
        descriptionCheckRef,
        descriptionTimesRef,
        handleDescription,
    } = useDescriptionDivision({ description });

    return (
        <div className="extra-data-form__description-division">
            <div className="extra-data-form__description-division__icons-container">
                <FaCheck
                    ref={descriptionCheckRef}
                    className="extra-data-form__description-division__check-icon last-step-icon check"
                />
                <FaTimes
                    ref={descriptionTimesRef}
                    className="extra-data-form__description-division__times-icon last-step-icon times"
                />
            </div>
            <TextField
                id="outlined-textarea"
                className="extra-data-form__text-area"
                label="Présentes-toi!"
                placeholder=""
                multiline
                onChange={(e) => changeDescription(e.target.value)}
                onBlur={() => handleDescription()}
            />
            <span ref={descriptionMsgRef} id="extra-description-msg"></span>
        </div>
    );
};

export default DescriptionDivision;
