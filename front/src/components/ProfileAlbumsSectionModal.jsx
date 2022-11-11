import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FaPlus, FaTimes } from "react-icons/fa"

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

const ProfileAlbumSectionModal = ({ album }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <div className="more-picture__div">
            <Button onClick={handleOpen}><FaPlus /></Button>
        </div> 
      <Modal
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
                <FaTimes onClick={() => setOpen(false)} />
            </div>
            
            <div className="album-modal__pictures-displayer">
                {album.pictures.map((picture) => (
                    <img src={picture} alt={"image venant de l'" + album.name} />
                ))}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default ProfileAlbumSectionModal;