import { useRef } from "react";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";

const useBgButtonsArea = () => {
    const pictureCheckRef = useRef(null);
    const pictureTimesRef = useRef(null);

    //This function displays the buttons handling the cover picture's editation
    //@Params { type: Object } => the param of the onClick event, only here to target an element on the DOM
    const showMeButtons = (e) => {
        pictureCheckRef.current.classList.add("active");
        pictureTimesRef.current.classList.add("active");
        e.target.style.opacity = "1";
    };

    return {
        pictureCheckRef,
        pictureTimesRef,
        showMeButtons,
    };
};

const BgButtonsArea = ({
    startEditCoverPicture,
    handleEditCoverPicture,
    handleCancelCoverPicture,
}) => {
    const { pictureCheckRef, pictureTimesRef, showMeButtons } =
        useBgButtonsArea();
    return (
        <div className="profile-section__header-background__buttons-area">
            <form action="" encType="multipart/form-data">
                <label
                    htmlFor="cover-picture"
                    onClick={(e) => showMeButtons(e)}
                >
                    <FaEdit />
                </label>
                <input
                    type="file"
                    name="cover-picture"
                    id="cover-picture"
                    onChange={(e) => startEditCoverPicture(e)}
                />
                <span
                    id="cover-picture-validation"
                    ref={pictureCheckRef}
                    onClick={() =>
                        handleEditCoverPicture(pictureCheckRef, pictureTimesRef)
                    }
                >
                    <FaCheck />
                </span>
                <span
                    id="cover-picture-cancel"
                    ref={pictureTimesRef}
                    onClick={() =>
                        handleCancelCoverPicture(
                            pictureCheckRef,
                            pictureTimesRef
                        )
                    }
                >
                    <FaTimes />
                </span>
            </form>
        </div>
    );
};

export default BgButtonsArea;
