import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import imgGlobe from "../assets/images/globe.webp";
import countryList from 'react-select-country-list';
import { useWindowSize } from "../utils/functions/hooks";


const Globe = () => {
    const mapBackground = useLoader(TextureLoader, imgGlobe);
    const meshRef = useRef();
    
    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.y += 0.0004;
    });
    
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[5, 50, 50]} />
            <meshBasicMaterial map={mapBackground} />
        </mesh>
    )
}

const Globe3D = ({ dynamicClassName, changeSelectedCountry }) => {
    const options = useMemo(() => countryList().getData(), []);
    const screenWidth = useWindowSize().width;
    const cameraPosition = screenWidth > 768 ? [0, 0, 10] : [0, 0, 12];


    return (
        <div className={"globe-container " + dynamicClassName + "-globe-container"}>
            <div className={"globe-container__canvas-area " + dynamicClassName + "-globe-container__canvas-area"}>
                <Canvas>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.1} />
                        <directionalLight color="red" position={[2, 0, 5]} />
                        <PerspectiveCamera makeDefault fov={75} position={cameraPosition} />
                        <Globe />
                    </Suspense>
                </Canvas>
            </div>
            <ul className={"globe-container__countries-list " + dynamicClassName + "-globe-container__countries-list"}>
                {options.map((option) => (
                    <li 
                        key={option.label} 
                        onClick={() => changeSelectedCountry(option.label)}
                    >
                        <a href="#home_anchor" key={option.label + "-link"}>{option.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Globe3D;