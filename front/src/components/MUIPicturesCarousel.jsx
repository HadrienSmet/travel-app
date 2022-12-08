import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const MUIPicturesCarousel = ({ pictures, index }) => {
        return (
            <Carousel autoPlay={false} swipeable={true} interval={15000}>    
                {pictures.map((picture, i) => (
                    <div className="carousel__picture-container" key={"picture-container-" + i}>
                        <img src={picture} alt={"image venant de l'" + pictures.name} key={"more-picture__modal-" + index + "-picture-" + i} />
                    </div>
                ))}
            </Carousel>
        );
};

export default MUIPicturesCarousel;