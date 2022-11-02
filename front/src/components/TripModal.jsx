import { useState, Fragment } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import InputCountry from './InputCountry';
import InputDuration from './inputDuration';
import InputYears from './InputYears';
// import { setAlbumArrayStore } from '../features/albumArray.slice';
import { setAlbumUrlArrayStore } from '../features/albumUrlArray.slice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal({ country, year, changeFileArray }) {
    const [open, setOpen] = useState(false);
    const [albumPicture, setAlbumPicture] = useState(undefined);
    const [albumPictureUrl, setAlbumPictureUrl] = useState(undefined);
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        console.log(albumPicture, albumPictureUrl);
        changeFileArray(albumPicture);
        dispatch(setAlbumUrlArrayStore(albumPictureUrl));
    };

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
            <Button variant='outlined' onClick={handleOpen}>Créer un album</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Album {country} {year}</h2>
                    <p id="child-modal-description">
                        Partagez-nous des souvenirs de votre voyage!
                    </p>
                    <Button variant="outlined">
                        <label htmlFor="signup-file">Choisir une photo</label>
                    </Button>
                    <input type="file" name="profilePicture" id="signup-file" onChange={(e) => handleAlbumPicture(e)} />
                    <div id="album-container">
                    {albumPictureUrl !== undefined && albumPictureUrl.map((url) => (<img key={url} src={url} alt="img" />))}
                    </div>
                    <Button onClick={handleClose}>Madaaaame! J'ai fini mon album!</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default function NestedModal({ changeFileArray, changeTrips }) {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [duration, setDuration] = useState("");
    const [year, setYear] = useState("");
    const [details, setDetails] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        handlePreviousTripSubmission();
    };

    const changeCountry = (country) => {
        setCountry(country);
    }

    const changeDuration = (duration) => {
        setDuration(duration)
    }

    const changeYear = (year) => {
        setYear(year)
    }

    const handleDetails = (e) => {
        setDetails(e.target.value);
    }

    const handlePreviousTripSubmission = () => {
        console.log(country, duration, year, details);
        let trip = {
            country,
            year,
            duration,
            details
        }
        changeTrips(trip);
    }

    return (
        <div>
            <Button variant='outlined' onClick={handleOpen}>
                <span>Ajouter un voyage</span>
                <FaPlus />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <span>Quelle était la destination?</span>
                    <InputCountry changeCountry={changeCountry} />
                    <span>Pendant combien de temps?</span>
                    <InputDuration changeDuration={changeDuration} />
                    <span>En quelle année?</span>
                    <InputYears changeYear={changeYear} />
                    <span>Donne nous des détails!</span>
                    <TextField
                        id="outlined-textarea"
                        label="Lieux, expériences, ..."
                        placeholder="Placeholder"
                        multiline
                        onChange={(e) => handleDetails(e.target.value)}
                    />
                    <ChildModal country={country} year={year} changeFileArray={changeFileArray} />
                </Box>
            </Modal>
        </div>
    );
}