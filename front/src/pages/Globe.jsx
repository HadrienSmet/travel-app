import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import imgGlobe from "../assets/images/globe.jpg";
import { Suspense, useRef } from "react";
// import { AmbientLight } from "three";

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

const Globe3D = () => {
    return (
        <div className="globe-container">
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} />
                    <directionalLight color="red" position={[2, 0, 5]} />
                    <PerspectiveCamera makeDefault fov={75} position={[0, 0, 25]} />
                    <Globe />
                </Suspense>
            </Canvas>
        </div>
        
    );
};


export default Globe3D;