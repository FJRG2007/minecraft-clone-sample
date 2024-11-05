import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import { Mesh, Texture, Vector3 } from "three";
import * as textures from "../images/textures";
import { ThreeEvent } from "@react-three/fiber";
import { useState, useCallback, forwardRef, Ref } from "react";

/**
 * A single cube in the game world.
 * @param {{ id: string; position: [number, number, number]; texture: string; }} props
 * @prop {string} id The unique id for this cube.
 * @prop {[number, number, number]} position The position of the cube in the world.
 * @prop {string} texture The texture to use for this cube. Valid values are "dirt", "glass", "grass", "log", or "wood".
 */
export const Cube = forwardRef<Mesh, { id: string; position: [number, number, number]; texture: string; }>(({ id, position, texture }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const [removeCube, addCube] = useStore((state) => [state.removeCube, state.addCube]);
        const [boxRef] = useBox(() => ({ type: "Static", position }));

        const handlePointerMove = useCallback((e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            setIsHovered(true);
        }, []);

        const handlePointerOut = useCallback((e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            setIsHovered(false);
        }, []);

        const handleClick = useCallback(
            (e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                // If the user holds down the ‘Alt’ key, deletes the cube.
                if (e.button === 0 || e.altKey) removeCube(id);
                else if (e.button === 2) {
                    // Detect the clicked face using the face normal.
                    const normal = e.face?.normal;
                    if (normal) {
                        // Calculate the position of the new cube based on the clicked face.
                        const clickedFace = new Vector3(normal.x, normal.y, normal.z);
                        const newCubePosition: [number, number, number] = [
                            position[0] + clickedFace.x,
                            position[1] + clickedFace.y,
                            position[2] + clickedFace.z
                        ];
                        // Add new cube at calculated position.
                        addCube(...newCubePosition);
                    } else {
                        // If there is no face (click on the ground), allow to build on the ground.
                        const newCubePosition: [number, number, number] = [
                            position[0],
                            position[1],
                            position[2]
                        ];
                        // Add new cube at calculated position.
                        addCube(...newCubePosition);
                    }
                }
            },
            [removeCube, id, position, addCube]
        );

        return (
            <mesh
                ref={ref || (boxRef as Ref<Mesh>)}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
                onContextMenu={(e: ThreeEvent<MouseEvent>) => { e.nativeEvent.preventDefault(); e.stopPropagation(); }}
            >
                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial
                    color={isHovered ? "grey" : "white"}
                    transparent
                    map={textures[`${texture}Texture` as keyof typeof textures] as Texture}
                    attach="material"
                />
            </mesh>
        );
    }
);

Cube.displayName = "Cube";