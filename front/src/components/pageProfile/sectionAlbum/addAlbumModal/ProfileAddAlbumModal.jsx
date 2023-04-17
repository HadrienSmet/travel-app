import { useState, Fragment } from "react";
import { Button, Modal, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import MUIGradientBorder from "../../../mui/MUIGradientBorder";
import { getJwtToken } from "../../../../utils/functions/tools/getJwtToken";
import { pushAlbumInUserLoggedData } from "../../../../features/userLoggedData.slice";
import { axiosCreateAlbum } from "../../../../utils/functions/user/axiosCreateAlbum";
import AlbumForm from "./AlbumForm";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const useProfileAlbumModal = () => {
    const [open, setOpen] = useState(false);
    const [albumPicture, setAlbumPicture] = useState(undefined);
    const [albumPictureUrl, setAlbumPictureUrl] = useState(undefined);
    const [year, setYear] = useState("");
    const [destination, setDestination] = useState("");
    const dispatch = useDispatch();
    let { userId, token } = getJwtToken();

    const handleAlbumFormData = () => {
        const data = new FormData();
        data.append("name", `album ${destination} ${year}`);
        albumPicture.forEach((picture) => {
            data.append("file", picture);
        });

        return data;
    };

    //This function change the state of the component in purpose to open the child modal.
    const handleOpen = () => {
        setOpen(true);
    };

    //This function handles the submission of the child modal (the creation of an album).
    //It gives the files to his parent components using the function herited by his grand-parent to change his state.
    //And it gives the name of the album and the urls of the blop links by the redux store.
    //And it also changes the state of the component in purpose to close the child modal.
    const handleClose = () => {
        const data = handleAlbumFormData();
        axiosCreateAlbum(userId, data, token)
            .then((res) => {
                setOpen(false);
                dispatch(pushAlbumInUserLoggedData(res.data.newAlbum));
            })
            .catch((err) => console.log(err));
    };
    //This function is here to allow a children component to change the local state of this component.
    //@Params { type: Number } => the value of the onChange event listening the input of type numbers
    //The value refers the year where the pictures were made
    const changeNumber = (year) => {
        setYear(year);
    };
    //This function is here to allow a children component to change the local state of this component.
    //@Params { type: String } => the value of the onChange event listening the input containing a list of each country
    //The value refers the country where the pictures were made
    const changeCountry = (country) => {
        setDestination(country);
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
        setAlbumPictureUrl(albumArrayUrl);
        setAlbumPicture(albumArray);
    };

    return {
        open,
        destination,
        year,
        albumPictureUrl,
        setOpen,
        changeCountry,
        changeNumber,
        handleOpen,
        handleClose,
        handleAlbumPicture,
    };
};

const ProfileAlbumModal = () => {
    const {
        open,
        destination,
        year,
        albumPictureUrl,
        setOpen,
        changeCountry,
        changeNumber,
        handleOpen,
        handleClose,
        handleAlbumPicture,
    } = useProfileAlbumModal();

    return (
        <Fragment>
            <Button
                id="add-album-modal__toggle-btn"
                variant="outlined"
                onClick={handleOpen}
            >
                Créer un nouvel album
                <FaPlus />
            </Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} className="add-album-modal">
                    <div className="add-album-modal__header">
                        <h2 className="add-album-modal-title">
                            Album {destination} {year}
                        </h2>
                        <BsXLg onClick={() => setOpen(false)} />
                    </div>
                    <h3 id="add-album-modal-description">
                        Partagez-nous des souvenirs de votre voyage!
                    </h3>
                    <AlbumForm
                        changeCountry={changeCountry}
                        changeNumber={changeNumber}
                        handleAlbumPicture={handleAlbumPicture}
                        albumPictureUrl={albumPictureUrl}
                        destination={destination}
                        year={year}
                    />
                    <MUIGradientBorder onClick={handleClose}>
                        <span onClick={handleClose}>Confirmer</span>
                    </MUIGradientBorder>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default ProfileAlbumModal;
