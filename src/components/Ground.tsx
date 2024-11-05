import { Mesh } from "three";
import { useStore } from "../hooks/useStore";
import { usePlane } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { groundTexture } from "../images/textures";

/**
 * A plane representing the ground in the game world.
 *
 * This component renders a plane at y=-0.5 and responds to clicks by adding a cube
 * at the position of the click.
 *
 * @returns {JSX.Element} The ground plane.
 */
export function Ground(): JSX.Element {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0]
    }));

    const [addCube, cubes, playerPosition] = useStore((state) => [
        state.addCube,
        state.cubes,
        state.playerPosition
    ]);

    groundTexture.repeat.set(100, 100);

    /**
     * Handles a click event on the ground plane by adding a cube
     * at the position of the click.
     *
     * @param {ThreeEvent<MouseEvent>} event The event object.
     */
    const handleClickGround = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        const [x, y, z] = Object.values(event.point).map((n) => Math.ceil(n));

        // Calculate distance between player and clicked point.
        const distance = Math.sqrt(
            Math.pow(x - playerPosition[0], 2) +
            Math.pow(y - playerPosition[1], 2) +
            Math.pow(z - playerPosition[2], 2)
        );

        // Limit the construction distance.
        if (distance > 5) return;

        // Check if a cube already exists in this position.
        const existingCube = cubes.find((cube) => cube.pos[0] === x && cube.pos[2] === z);

        // If there is already a bucket in this position, add it on top of it.
        if (existingCube) addCube(x, existingCube.pos[1] + 1, z);
        // If there is no cube, add it in the clicked position.
        else addCube(x, y, z);
    };

    return (
        <mesh onClick={handleClickGround} ref={ref as React.Ref<Mesh>}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    );
};