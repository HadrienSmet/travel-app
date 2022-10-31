import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import carouselImg1 from '../assets/images/carousel-bg1.jpeg';
import carouselImg2 from '../assets/images/carousel-bg2.jpg';
import carouselImg3 from '../assets/images/carousel-bg3.jpeg';
import carouselImg4 from '../assets/images/carousel-bg4.jpeg';
import carouselImg5 from '../assets/images/carousel-bg5.jpg';
import carouselImg6 from '../assets/images/carousel-bg6.jpg';


const WelcomeCarousel = () => {
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

export default WelcomeCarousel;

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>