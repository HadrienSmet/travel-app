import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { FaPlus, FaTimes } from "react-icons/fa";
import MUIPicturesCarousel from "../../mui/MUIPicturesCarousel";

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

const useProfileAlbumSectionModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return {
        open,
        handleOpen,
        handleClose,
    };
};

const ProfileAlbumSectionModal = ({ album, index }) => {
    const { open, handleOpen, handleClose } = useProfileAlbumSectionModal();

    return (
        <>
            <div className="more-picture__div" onClick={handleOpen}>
                <FaPlus />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Fade in={open}>
                    <Box sx={style} className="album-modal">
                        <div className="album-modal__header">
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                className="album-modal__title"
                            >
                                {album.name}
                            </Typography>
                            <FaTimes onClick={handleClose} />
                        </div>
                        <MUIPicturesCarousel
                            pictures={album.pictures}
                            index={index}
                        />
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};
export default ProfileAlbumSectionModal;
