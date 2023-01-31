import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useWindowSize } from "../utils/hooks/hooks";

import imgGlobe from "../assets/images/globe.webp";
import countryList from "react-select-country-list";

const useGlobe = () => {
    const mapBackground = useLoader(TextureLoader, imgGlobe);
    const meshRef = useRef();

    //This hooks defines the speed rotation of the globe. As much the number is increased it rotates faster
    useFrame(() => {
        if (!meshRef.current) {
            return;
        }
        meshRef.current.rotation.y += 0.0004;
    });

    return {
        mapBackground,
        meshRef,
    };
};

const Globe = () => {
    const { mapBackground, meshRef } = useGlobe();

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[5, 50, 50]} />
            <meshBasicMaterial map={mapBackground} />
        </mesh>
    );
};

const Globe3D = ({ dynamicClassName, changeSelectedCountry, forHome }) => {
    const options = useMemo(() => countryList().getData(), []);
    const screenWidth = useWindowSize().width;
    const cameraPosition = screenWidth > 768 ? [0, 0, 10] : [0, 0, 12];

    return (
        <div
            className={
                "globe-container " + dynamicClassName + "-globe-container"
            }
        >
            <div
                className={
                    "globe-container__canvas-area " +
                    dynamicClassName +
                    "-globe-container__canvas-area"
                }
            >
                <Canvas>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.1} />
                        <directionalLight color="red" position={[2, 0, 5]} />
                        <PerspectiveCamera
                            makeDefault
                            fov={75}
                            position={cameraPosition}
                        />
                        <Globe />
                    </Suspense>
                </Canvas>
            </div>
            <ul
                className={
                    "globe-container__countries-list " +
                    dynamicClassName +
                    "-globe-container__countries-list"
                }
            >
                {forHome === true &&
                    options.map((option) => (
                        <li
                            key={option.label}
                            onClick={() => changeSelectedCountry(option.label)}
                        >
                            <a href="#home_anchor">{option.label}</a>
                        </li>
                    ))}
                {forHome !== true &&
                    options.map((option) => (
                        <li
                            key={option.label}
                            onClick={() => changeSelectedCountry(option.label)}
                        >
                            {option.label}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Globe3D;
