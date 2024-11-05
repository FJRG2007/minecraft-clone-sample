import { Cube } from "./Cube.js";
import { useStore } from "../hooks/useStore";

/**
 * A component that renders all the cubes in the world.
 * @returns {JSX.Element}
 * @example
 * <Cubes />
 */
export const Cubes = () => {
    const [cubes] = useStore(state => [state.cubes]);
    return (
        <>
            {cubes.map(({ id, pos, texture }) => {
                return (
                    <Cube
                        key={id}
                        id={id}
                        position={pos}
                        texture={texture}
                    />
                );
            })}
        </>
    );
};