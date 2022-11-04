import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExtraDataFormAccordion = ({ previousTrips }) => {

  return (
    <div className='extra-form__accordion'>
        {previousTrips.map((trip, index) => (
          <Accordion key={"trip-" + trip.country + "-accordion"}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel"+ index + "a-content"}
              id={"panel"+ index + "a-header"}
              key={"trip-title-container__" + trip.country + index}
            >
              <h4 key={"trip-title__" + trip.country + index}>{trip.country + " " + trip.year}</h4>
            </AccordionSummary>
            <AccordionDetails key={"trip-hidden-details__" + trip.country + trip.index}>
              <div className="extra-form__accordion-details-displayer">
                <span key={"trip-duration__" + trip.country + index}>{trip.duration}</span>
                <span key={"trip-span__" + trip.country + index}>{trip.choice}</span>
                <span key={"trip-country__" + trip.country + index}>{trip.details}</span>
              </div> 
              <div key={"trip-child-div__" + trip.country + index} className="extra-data-form__previous-trip-album">
                {trip.album[index].urls.map((url) => (<img key={"trip-child-div-picture-url" + trip.country + index} src={url} alt="img" />))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

export default ExtraDataFormAccordion;