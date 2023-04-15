import { useRef } from "react";

import { TextField } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";

const useDescriptionDivision = ({ extraData }) => {
    const descriptionMsgRef = useRef(null);
    const descriptionCheckRef = useRef(null);
    const descriptionTimesRef = useRef(null);

    //This function change the state of this component in order to allow the user to share a description about himself
    //@Params { Type: Object } --> The param of the onChange event listening the textarea
    const handleDescription = (e) => {
        if (extraData.description.match(/\$<>=\+\*/i)) {
            descriptionMsgRef.current.textContent =
                "Les caractères suivants ne sont pas tolérés. $ > < = + *";
            descriptionTimesRef.current.classList.remove("invisible");
            descriptionTimesRef.current.classList.add("visible");
            descriptionCheckRef.current.classList.remove("visible");
            descriptionCheckRef.current.classList.add("invisible");
        } else {
            descriptionMsgRef.current.textContent = "";
            descriptionTimesRef.current.classList.remove("visible");
            descriptionTimesRef.current.classList.add("invisible");
            descriptionCheckRef.current.classList.remove("invisible");
            descriptionCheckRef.current.classList.add("visible");
        }
    };

    return {
        descriptionMsgRef,
        descriptionCheckRef,
        descriptionTimesRef,
        handleDescription,
    };
};

const DescriptionDivision = ({ extraData, changeDescription }) => {
    const {
        descriptionMsgRef,
        descriptionCheckRef,
        descriptionTimesRef,
        handleDescription,
    } = useDescriptionDivision({ extraData });

    return (
        <div className="extra-data-form__description-division">
            <div className="extra-data-form__description-division__icons-container">
                <div className="ref-div" ref={descriptionCheckRef}>
                    <FaCheck className="extra-data-form__description-division__check-icon last-step-icon check" />
                </div>
                <div className="ref-div" ref={descriptionTimesRef}>
                    <FaTimes className="extra-data-form__description-division__times-icon last-step-icon times" />
                </div>
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
