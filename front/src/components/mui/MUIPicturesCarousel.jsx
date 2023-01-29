import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const MUIPicturesCarousel = ({ pictures }) => {
    return (
        <Carousel autoPlay={false} swipeable={true} interval={15000}>
            {pictures.map((picture, i) => (
                <div className="carousel__picture-container" key={i}>
                    <img
                        src={picture}
                        alt={"Contenu de l'album de l'utilisateur"}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default MUIPicturesCarousel;
