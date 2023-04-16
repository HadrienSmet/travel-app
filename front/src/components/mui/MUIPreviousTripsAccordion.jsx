import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MUIPreviousTripsAccordion = ({
    previousTrips,
    dynamicClass,
    signingUp,
}) => {
    return (
        <div className={dynamicClass + "__accordion"}>
            {previousTrips.map((trip, index) => (
                <Accordion key={"trip-" + trip.destination + "-accordion"}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel" + index + "a-content"}
                        id={"panel" + index + "a-header"}
                    >
                        <h3>{trip.destination + " " + trip.year}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div
                            className={
                                dynamicClass + "__accordion-details-displayer"
                            }
                        >
                            <span>{trip.duration}</span>
                            <span>{trip.withWho}</span>
                            <span>{trip.details}</span>
                        </div>
                        {signingUp === true && (
                            <div
                                className={
                                    dynamicClass + "__previous-trip-album"
                                }
                            >
                                {trip.album[index].urls.map((url, index) => (
                                    <img
                                        key={
                                            "trip-child-div-picture-url" +
                                            trip.destination +
                                            index
                                        }
                                        src={url}
                                        alt={
                                            "Photo faite pendant le voyage en" +
                                            trip.destination
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default MUIPreviousTripsAccordion;
