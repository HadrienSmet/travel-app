import { useState, Fragment } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { FaPlus, FaCamera } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import InputCountry from './InputCountry';
import InputNumbers from './InputNumbers';
// import { setAlbumArrayStore } from '../features/albumArray.slice';
import { setAlbumObjectArrayStore } from '../features/albumObjectArray.slice';

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

const ProfileAlbumModal = ({ changeAlbumsArray }) => {
    const [open, setOpen] = useState(false);
    const [albumPicture, setAlbumPicture] = useState(undefined);
    const [albumPictureUrl, setAlbumPictureUrl] = useState(undefined);
    const [year, setYear] = useState("");
    const [destination, setDestination] = useState("");
    const dispatch = useDispatch();

    const pictureAreas = [];
    for (let i = 0; i < 12; i++) {
        pictureAreas.push(i);
    }

    //This function change the state of the component in purpose to open the child modal.
    const handleOpen = () => {
        setOpen(true);
    };

    //This function handles the submission of the child modal (the creation of an album).
    //It gives the files to his parent components using the function herited by his grand-parent to change his state.
    //And it gives the name of the album and the urls of the blop links by the redux store.
    //And it also changes the state of the component in purpose to close the child modal.
    const handleClose = () => {
        let album = {
            name: `album ${destination} ${year}`,
            urls: albumPictureUrl
        }
        setOpen(false);
        console.log(albumPicture, albumPictureUrl);
        changeAlbumsArray(albumPicture);
        dispatch(setAlbumObjectArrayStore(album));
    };

    const changeNumber = (year) => {
        setYear(year);
    }

    const changeCountry = (country) => {
        setDestination(country);
    }

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
            albumArrayUrl = [...albumPictureUrl, URL.createObjectURL(e.target.files[0])]
        }
        if (albumPicture === undefined) {
            albumArray = [e.target.files[0]];
        } else {
            albumArray = [...albumPicture, e.target.files[0]]
        }
        setAlbumPictureUrl(albumArrayUrl);
        setAlbumPicture(albumArray);
        
        console.log(albumArray);
        console.log(albumArrayUrl);
    }

    return (
        <Fragment>
            <Button id='album-modal__toggle-btn' variant='outlined' onClick={handleOpen}>Créer un nouvel album<FaPlus /></Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} className="album-modal">
                    <div className="child-modal__header">
                        <h3 id="child-modal-title">Album {destination} {year}</h3>
                        <BsXLg onClick={() => setOpen(false)} />
                    </div>
                    <h4 id="album-modal-description">Partagez-nous des souvenirs de votre voyage!</h4>
                    <div className="album-modal__same-row">
                        <div className="album-modal__country-field">    
                            <p>Dans quel pays êtiez-vous parti?</p>
                            <InputCountry 
                                dynamicClass="album-modal__input-country"
                                dynamicPlaceholder="Pays"
                                changeCountry={changeCountry}
                            />
                        </div>
                        <div className="album-modal__input-year">
                            <p>En quelle année?</p>
                            <InputNumbers 
                                changeNumber={changeNumber}
                                minNumber={1980}
                                maxNumber={2023}
                                dynamicClass="album-modal__input-year"
                                dynamicPlaceholder="Année" 
                            />
                        </div>
                    </div>
                    <input type="file" name="file" id="trip-file" accept=".jpg, .jpeg, .png" onChange={(e) => handleAlbumPicture(e)} />
                    <div className='album-modal__pictures-displayer' id="album-container">
                        {pictureAreas.map((area, index) => (
                            <label key={"picture-area-label-" + index} htmlFor="trip-file" className='album-modal__picture-area-label'>
                                <div className='album-modal__picture-area' key={"picture-area" + index}>
                                    <FaCamera className='album-modal__camera-icon' key={"picture-area-camera-" + index} />
                                    <FaPlus className='album-modal__plus-icon' key={"picture-area-plus-" + index} />
                                </div>
                            </label>
                        ))}
                        <div className="album-modal__pictures-displayer--absolute">
                            {albumPictureUrl !== undefined && albumPictureUrl.map((url) => (<img key={url} src={url} alt="img" />))}
                        </div>
                    </div>
                    <Button variant="outlined" onClick={handleClose}>Madaaaame! J'ai fini mon album!</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default ProfileAlbumModal;