import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FaPlus, FaTimes } from "react-icons/fa"
import MUIPicturesCarousel from './MUIPicturesCarousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ProfileAlbumSectionModal = ({ album, index }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <div key={"more-picture__div-" + index} className="more-picture__div">
            <Button className="btn-toggle-full-album-modal" key={"btn-toggle-modal-" + index} onClick={handleOpen}><FaPlus /></Button>
        </div> 
      <Modal
        key={"more-picture__modal-" + index} 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade key={"more-picture__fade-" + index} in={open}>
          <Box key={"more-picture__box" + index} sx={style} className="album-modal">
            <div key={"more-picture__modal-header-" + index} className="album-modal__header">
                <Typography
                    key={"more-picture__modal-header-typo" + index} 
                    id="transition-modal-title" 
                    variant="h6" 
                    component="h2"
                    className="album-modal__title"
                >
                  {album.name}
                </Typography>
                <FaTimes key={"more-picture__modal-header-icon-" + index} onClick={() => setOpen(false)} />
            </div>
            {/* <div key={"more-picture__modal-pictures-displayer-" + index} className="album-modal__pictures-displayer">
                {album.pictures.map((picture, i) => (
                    <img src={picture} alt={"image venant de l'" + album.name} key={"more-picture__modal-" + index + "-picture-" + i} />
                ))}
            </div> */}
            <MUIPicturesCarousel pictures={album.pictures} index={index} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ProfileAlbumSectionModal;