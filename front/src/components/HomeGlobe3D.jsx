import { useMemo } from 'react';
import countryList from 'react-select-country-list';


const HomeGlobe3D = () => {
    const options = useMemo(() => countryList().getData(), [])

    const handleScroll = (e) => {
        const scrollBar = document.getElementById("globe-scroll-bar");
        
        scrollBar.style.top = ((e.target.scrollTop / 4511) * 100) + "%";
    }
    return (
        <div className="globe-division">
            <span className="globe-division__globe"></span>
            <ul className="globe-division__countries-list" onScroll={(e) => handleScroll(e)}>
                {options.map((option) => (<li key={option.label}>{option.label}</li>))}
            </ul>
            <div className="globe-division__countries-list__scroll-bar-track">
                <span id="globe-scroll-bar" className="globe-division__countries-list__scroll-bar"></span>
            </div>
        </div>
    );
};

export default HomeGlobe3D;