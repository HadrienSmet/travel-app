import { Fragment, useState } from "react";

import { useDispatch } from "react-redux";
import { setAlbumObjectArrayStore } from "../../../../features/albumObjectArray.slice";

import { Box, Button, Modal } from "@mui/material";
import { BsXLg } from "react-icons/bs";
import { FaCamera, FaPlus } from "react-icons/fa";
import MUIGradientBorder from "../../../mui/MUIGradientBorder";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const useChildModal = ({ prevTripsData, changeAlbumsArray }) => {
    const [open, setOpen] = useState(false);
    const [albumPicture, setAlbumPicture] = useState(undefined);
    const [albumPictureUrl, setAlbumPictureUrl] = useState(undefined);
    const dispatch = useDispatch();

    const changeAlbumPicture = (fileArray) => setAlbumPicture(fileArray);
    const changeAlbumPictureUrl = (urlArray) => setAlbumPictureUrl(urlArray);

    //This function handles the submission of the child modal (the creation of an album).
    //It gives the files to his parent components using the function herited by his grand-parent to change his state.
    //And it gives the name of the album and the urls of the blop links by the redux store.
    //And it also changes the state of the component in purpose to close the child modal.
    const handleClose = () => {
        let album = {
            name: `album ${prevTripsData.destination} ${prevTripsData.year}`,
            urls: albumPictureUrl,
        };
        setOpen(false);
        changeAlbumsArray(albumPicture);
        dispatch(setAlbumObjectArrayStore(album));
    };

    //This function fills two differents array when the input files suffer a change
    //@Params {Type: Object} --> the param of the onChange event
    //The first array will contain the urls, when the second contains the files
    //If those arrays are undefined their value is only defined by the new data
    //Else those arrays will contain the new data and conserve the old one
    const handleAlbumPicture = (e) => {
        let albumArrayUrl;
        let albumArray;
        if (albumPictureUrl === undefined) {
            albumArrayUrl = [URL.createObjectURL(e.target.files[0])];
        } else {
            albumArrayUrl = [
                ...albumPictureUrl,
                URL.createObjectURL(e.target.files[0]),
            ];
        }
        if (albumPicture === undefined) {
            albumArray = [e.target.files[0]];
        } else {
            albumArray = [...albumPicture, e.target.files[0]];
        }
        changeAlbumPictureUrl(albumArrayUrl);
        changeAlbumPicture(albumArray);
    };

    return {
        albumPictureUrl,
        open,
        handleClose,
        handleAlbumPicture,
        setOpen,
    };
};

const ChildModal = ({ prevTripsData, changeAlbumsArray }) => {
    const { albumPictureUrl, open, handleClose, handleAlbumPicture, setOpen } =
        useChildModal({ prevTripsData, changeAlbumsArray });

    const pictureAreas = [];
    for (let i = 0; i < 12; i++) {
        pictureAreas.push(i);
    }

    return (
        <Fragment>
            <Button
                id="signup-album-creation-btn"
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                <span>Créer un album</span>
                <FaPlus />
            </Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} className="child-modal">
                    <div className="child-modal__header">
                        <h4 id="child-modal-title">
                            Album {prevTripsData.destination}{" "}
                            {prevTripsData.year}
                        </h4>
                        <BsXLg onClick={() => setOpen(false)} />
                    </div>
                    <div className="child-modal__same-row">
                        <p id="child-modal-description">
                            Partagez-nous des souvenirs de votre voyage!
                        </p>
                    </div>
                    <input
                        type="file"
                        name="file"
                        id="trip-file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => handleAlbumPicture(e)}
                    />
                    <div
                        className="child-modal__pictures-displayer"
                        id="album-container"
                    >
                        {pictureAreas.map((area, index) => (
                            <label
                                key={"picture-area-label-" + index}
                                htmlFor="trip-file"
                                className="child-modal__picture-area-label"
                            >
                                <div className="child-modal__picture-area">
                                    <FaCamera className="child-modal__camera-icon" />
                                    <FaPlus className="child-modal__plus-icon" />
                                </div>
                            </label>
                        ))}
                        <div className="child-modal__pictures-displayer--absolute">
                            {albumPictureUrl !== undefined &&
                                albumPictureUrl.map((url) => (
                                    <img
                                        key={url}
                                        src={url}
                                        alt={
                                            "Photo pour l'ablum " +
                                            prevTripsData.destination +
                                            " " +
                                            prevTripsData.year
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                    <MUIGradientBorder>
                        <span onClick={() => handleClose()}>confirmer</span>
                    </MUIGradientBorder>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default ChildModal;
