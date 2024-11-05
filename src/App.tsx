import data from "./lib/data";
import { Cubes } from "./components/Cubes";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FPV as Fpv } from "./components/FPV";
import { Physics } from "@react-three/cannon";
import DayNightCycle from "./components/DayNightCycle";
import CommandInterface from "./components/CommandInterface";
import { TextureSelector } from "./components/TextureSelect";
//import { InvisibleBarrier } from "./components/InvisibleBarrier";

function App() {
    
    const [_, setGravity] = useState(9.8); // Estado para la gravedad
    const [timeOfDay, setTimeOfDay] = useState(0); // Hora del día para DayNightCycle
    const [isCommandInputFocused, setIsCommandInputFocused] = useState(false);

    //const terrainSize = 20; // The size of your land in width and length.
    //const barrierHeight = 50; // Barrier and ceiling height.

    const handleCommand = (command: string) => {
        const args = command.split(" ");
        const mainCommand = args[0].toLowerCase();

        if (mainCommand === "/set") {
            const subCommand = args[1]?.toLowerCase();
            if (subCommand === "time") {
                const timeValue = args[2]?.toLowerCase();
                if (timeValue === "day") {
                    setTimeOfDay(12); // Establece a mediodía
                    console.log("Time set to day (12).");
                } else if (timeValue === "night") {
                    setTimeOfDay(0); // Establece a medianoche
                    console.log("Time set to night (0).");
                } else {
                    console.log("Invalid time value. Use 'day' or 'night'.");
                }
            } else if (subCommand === "gravity") {
                const gravityValue = parseFloat(args[2]);
                if (!isNaN(gravityValue)) {
                    setGravity(gravityValue);
                    console.log(`Gravity set to ${gravityValue}`);
                } else {
                    console.log("Invalid gravity value.");
                }
            }
        } else {
            console.log("Unknown command.");
        }
    };


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isCommandInputFocused) event.preventDefault();
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (isCommandInputFocused) event.preventDefault();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isCommandInputFocused]);

    return (
        <>
            <Canvas>
                <DayNightCycle initialTimeOfDay={timeOfDay} />
                <Fpv />
                <Physics>
                    <Cubes />
                    <Player />
                    <Ground />
                    {/* <InvisibleBarrier position={[terrainSize / 2, barrierHeight / 2, 0]} size={[1, barrierHeight, terrainSize]} />
                    <InvisibleBarrier position={[-terrainSize / 2, barrierHeight / 2, 0]} size={[1, barrierHeight, terrainSize]} />
                    <InvisibleBarrier position={[0, barrierHeight / 2, terrainSize / 2]} size={[terrainSize, barrierHeight, 1]} />
                    <InvisibleBarrier position={[0, barrierHeight / 2, -terrainSize / 2]} size={[terrainSize, barrierHeight, 1]} />
                    <InvisibleBarrier position={[0, barrierHeight, 0]} size={[terrainSize, 1, terrainSize]} /> */}
                </Physics>
            </Canvas>
            <div className="pointer">+</div>
            <div className="version">{data.version}</div>
            <TextureSelector />
            <CommandInterface 
                onCommand={handleCommand}
                onFocus={() => setIsCommandInputFocused(true)}
                onBlur={() => setIsCommandInputFocused(false)}
            />
        </>
    );
};

export default App;