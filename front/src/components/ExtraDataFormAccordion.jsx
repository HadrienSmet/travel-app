import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExtraDataFormAccordion = ({ previousTrips }) => {

  return (
    <div className='extra-form__accordion'>
        {previousTrips.map((trip, index) => (
          <Accordion key={"trip-" + trip.destination + "-accordion"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel"+ index + "a-content"}
              id={"panel"+ index + "a-header"}
              key={"trip-title-container__" + trip.destination + index}
            >
              <h4 key={"trip-title__" + trip.destination + index}>{trip.destination + " " + trip.year}</h4>
            </AccordionSummary>
            <AccordionDetails key={"trip-hidden-details__" + trip.destination + trip.index}>
              <div className="extra-form__accordion-details-displayer">
                <span key={"trip-duration__" + trip.destination + index}>{trip.duration}</span>
                <span key={"trip-span__" + trip.destination + index}>{trip.choice}</span>
                <span key={"trip-country__" + trip.destination + index}>{trip.details}</span>
              </div> 
              <div key={"accordion-trip-child-div__" + trip.destination + index} className="extra-data-form__previous-trip-album">
                {trip.album[index].urls.map((url, index) => (<img key={"trip-child-div-picture-url" + trip.destination + index} src={url} alt="img" />))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

export default ExtraDataFormAccordion;