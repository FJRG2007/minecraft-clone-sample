import { useState } from "react";
import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface DayNightCycleProps {
    initialTimeOfDay?: number;
}

const DayNightCycle: React.FC<DayNightCycleProps> = ({ initialTimeOfDay = 0 }) => {
    const [timeOfDay, setTimeOfDay] = useState(initialTimeOfDay); // 0 is midnight, 12 is noon.

    useFrame((_, delta) => {
        setTimeOfDay((prev) => (prev + (delta * 24) / 60) % 24);
    });

    // Calculate the position of the sun.
    const sunPosition: [number, number, number] = [
        Math.sin((timeOfDay / 24) * Math.PI * 2) * 100,
        Math.cos((timeOfDay / 24) * Math.PI * 2) * 100,
        20,
    ];

    // Adjusts the intensity of the light according to the time of day.
    const ambientIntensity = Math.max(0.1, Math.sin((timeOfDay / 24) * Math.PI));

    return (
        <>
            <Sky
                sunPosition={sunPosition}
                distance={4500000}
                turbidity={8}
                rayleigh={6}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
                inclination={(timeOfDay / 24) * 2}
                azimuth={0.25}
            />
            <ambientLight intensity={ambientIntensity} />
            <directionalLight
                position={sunPosition}
                intensity={ambientIntensity * 0.7}
                castShadow
            />
        </>
    );
};

export default DayNightCycle;