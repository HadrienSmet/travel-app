import { useState, Fragment } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaCamera } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import InputCountry from './InputCountry';
import InputNumbers from './InputNumbers';
// import { setAlbumArrayStore } from '../features/albumArray.slice';
import { setAlbumObjectArrayStore } from '../features/albumObjectArray.slice';
import InputSelect from './InputSelect';

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

function ChildModal({ country, year, changeAlbumsArray }) {
    const [open, setOpen] = useState(false);
    const [albumPicture, setAlbumPicture] = useState(undefined);
    const [albumPictureUrl, setAlbumPictureUrl] = useState(undefined);
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
            name: `album ${country} ${year}`,
            urls: albumPictureUrl
        }
        setOpen(false);
        console.log(albumPicture, albumPictureUrl);
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
            <Button id='signup-album-creation-btn' variant='outlined' onClick={handleOpen}><span>Créer un album</span><FaPlus /></Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} className="child-modal">
                    <div className="child-modal__header">
                        <h3 id="child-modal-title">Album {country} {year}</h3>
                        <BsXLg onClick={() => setOpen(false)} />
                    </div>
                    <div className="child-modal__same-row">    
                        <p id="child-modal-description">
                            Partagez-nous des souvenirs de votre voyage!
                        </p>
                        <Button variant="outlined">
                            <label htmlFor="signup-file">Choisir une photo</label>
                        </Button>
                    </div>
                    <input type="file" name="profilePicture" id="signup-file" onChange={(e) => handleAlbumPicture(e)} />
                    <div className='child-modal__pictures-displayer' id="album-container">
                        {pictureAreas.map((area) => (
                        <label htmlFor="signup-file" className='child-modal__picture-area-label'>
                            <div className='child-modal__picture-area' key={area}>
                                <FaCamera className='child-modal__camera-icon' />
                                <FaPlus className='child-modal__plus-icon' />
                            </div>
                        </label>
                        ))}
                        <div className="child-modal__pictures-displayer--absolute">
                            {albumPictureUrl !== undefined && albumPictureUrl.map((url) => (<img key={url} src={url} alt="img" />))}
                        </div>
                    </div>
                    <Button variant="outlined" onClick={handleClose}>Madaaaame! J'ai fini mon album!</Button>
                </Box>
            </Modal>
        </Fragment>
    );
}

export default function NestedModal({ changeAlbumsArray, changeTrips }) {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [duration, setDuration] = useState("");
    const [year, setYear] = useState("");
    const [choice, setChoice] = useState("");
    const [details, setDetails] = useState("");
    const albumData = useSelector((state) => state.albumObjectArrayStore.albumObjectArray)  
    
    const durations = [
        '1 Mois',
        '2 Mois',
        '3 Mois',
        '4 Mois',
        '5 Mois',
        '6 Mois',
        '7 Mois',
        '8 Mois',
        '9 Mois',
        '10 Mois',
        '11 Mois',
        '1 Ans',
        '2 Ans',
        '3 Ans',
        'Je me suis perdu'
      ];

      const withFriendsChoices = [
        'Seul(e)',
        'En couple',
        'Aves des ami(e)s',
        'En famille',
      ];

    //This function changes the state of the component in order to open the parent modal
    const handleOpen = () => {
        setOpen(true);
    };
    //This function changes the state of the component in order to close the parent modal
    //Then it calls a function that will handles the submission of the datas
    const handleClose = () => {
        setOpen(false);
        handlePreviousTripSubmission();
    };

    //This function is only here to allow the child component InputCountry to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeCountry = (country) => {
        setCountry(country);
    }

    //This function is only here to allow the child component InputSelect thats represents the duration of the trip to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeDuration = (duration) => {
        setDuration(duration)
    }

    //This function is only here to allow the child component InputNumbers thats represents the year of the trip to change the state of this component
    //@Params { Type: Number } --> The value of the input
    const changeNumber = (year) => {
        setYear(year)
    }

    //This function is only here to allow the child component InputSelect thats tells if the user were accompanied during the trip to change the state of this component
    //@Params { Type: String } --> The value of the input
    const changeChoice = (choice) => {
        setChoice(choice)
    }

    //This function change the state of the components in order to let the user provides details about his trip
    //@Params { Type: String } --> The param of the onChange event
    const handleDetails = (e) => {
        setDetails(e.target.value);
    }

    //This functions handle the submission of the data provided by the two modals
    //Creates an object called trip that will contain all the data and gives it to his parent thanks to the function herited by him
    const handlePreviousTripSubmission = () => {
        console.log(country, duration, year, details);
        let trip = {
            country,
            year,
            duration,
            choice,
            details,
            album: { ...albumData }
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
                    <div className="trip-modal__header">
                        <h2>Ajouter un voyage</h2>
                        <BsXLg onClick={() => setOpen(false)}  />
                    </div>
                    <div className="trip-modal__content">
                        <div className="trip-modal__inputs-area">
                            <span>Quelle était la destination?</span>
                            <InputCountry 
                                dynamicClass={"trip-modal__input-destination"} dynamicPlaceholder={"Destination"} 
                                changeCountry={changeCountry} 
                            />
                            <span>Pendant combien de temps?</span>
                            <InputSelect
                                dynamicClass="trip-modal__input-duration"
                                dynamicPlaceholder="Durée"
                                choices={durations}
                                changeChoice={changeDuration}
                            />
                            <span>En quelle année?</span>
                            <InputNumbers 
                                changeNumber={changeNumber}
                                minNumber={1980}
                                maxNumber={2023}
                                dynamicClass="trip-modal__input-year"
                                dynamicPlaceholder="Année" />
                            <span>Avec qui?</span>
                            <InputSelect 
                                dynamicClass="trip-modal__input-accompanied"
                                dynamicPlaceholder="Accompagné(e)"
                                choices={withFriendsChoices}
                                changeChoice={changeChoice} 
                            />
                        </div>
                        <div className="trip-modal__description-area">
                            <span>Donne nous des détails!</span>
                            <TextField
                                id="outlined-textarea"
                                label="Lieux, expériences, ..."
                                placeholder="Placeholder"
                                multiline
                                onChange={(e) => handleDetails(e)}
                            />
                            <div className="trip-modal__album-container">
                            {albumData !== [] && albumData.map((album, index) => (
                                <div key={"divsion-" + index} className="trip-modal-album">
                                    <h4 key={"title-" + index}>{album.name}</h4>
                                    <div key={"child-divsion-" + index} className="trip-modal-album__pictures-container">
                                        {album.urls.map((url, index) => (<img key={"url" + index} src={url} alt="img" />))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="trip-modal__buttons-row">
                        <ChildModal country={country} year={year} changeAlbumsArray={changeAlbumsArray} />
                        <Button variant="outlined" onClick={handleClose}>Confirmer</Button>
                    </div>
                    
                </Box>
            </Modal>
        </div>
    );
}