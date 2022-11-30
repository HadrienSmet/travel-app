import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import imgGlobe from "../assets/images/globe.jpg";
import countryList from 'react-select-country-list';


const Globe = () => {
    const mapBackground = useLoader(TextureLoader, imgGlobe);
    const meshRef = useRef();

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.y += 0.001;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[5, 50, 50]} />
            <meshBasicMaterial map={mapBackground} />
        </mesh>
    )
}

const Globe3D = ({ changeSelectedCountry }) => {
    const options = useMemo(() => countryList().getData(), [])

    const handleScroll = (e) => {
        const scrollBar = document.getElementById("globe-scroll-bar");
        
        scrollBar.style.top = ((e.target.scrollTop / 7719) * 100) + "%";
    }

    return (
        <div className="globe-container">
            <div className="globe-container__canvas-area">
                <Canvas>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.1} />
                        <directionalLight color="red" position={[2, 0, 5]} />
                        <PerspectiveCamera makeDefault fov={75} position={[0, 0, 10]} />
                        <Globe />
                    </Suspense>
                </Canvas>
            </div>
            <ul className="globe-container__countries-list" onScroll={(e) => handleScroll(e)}>
                {options.map((option) => (
                    <li 
                        key={option.label} 
                        onClick={() => changeSelectedCountry(option.label)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
            <div className="globe-container__countries-list__scroll-bar-track">
                <span id="globe-scroll-bar" className="globe-container__countries-list__scroll-bar"></span>
            </div>
        </div>
    );
};


export default Globe3D;