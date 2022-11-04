import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import carouselImg1 from '../assets/images/signup-carousel-bg1.jpeg';
import carouselImg2 from '../assets/images/signup-carousel-bg2.jpeg';
import carouselImg3 from '../assets/images/signup-carousel-bg3.jpeg';
import carouselImg4 from '../assets/images/signup-carousel-bg4.jpeg';
import carouselImg5 from '../assets/images/signup-carousel-bg5.jpeg';
import carouselImg6 from '../assets/images/signup-carousel-bg6.jpeg';


const SignupCarousel = () => {
        return (
            <Carousel autoPlay={true} swipeable={true} interval={15000}>
                <div>
                    <img src={carouselImg1} alt="Paysage Asiatique"/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={carouselImg2} alt="Paysage de savane"/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={carouselImg3} alt="Paysage fleuve entouré de forêts"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={carouselImg4} alt="Paysage de forêt en automne"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={carouselImg5} alt="Paysage ville arabe"/>
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={carouselImg6} alt="Paysage arctique"/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
};

export default SignupCarousel;