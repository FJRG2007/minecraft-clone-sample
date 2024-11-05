import { Vector3, Mesh } from "three";
import { useEffect, useRef } from "react";
import { useStore } from "../hooks/useStore";
import { useSphere } from "@react-three/cannon";
import { useKeyboard } from "../hooks/useKeyboard";
import { useFrame, useThree } from "@react-three/fiber";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;
const CAMERA_HEIGHT_OFFSET = 1.2;

export const Player = () => {
    const { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard(false);
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 1.5, 0],
        args: [0.5]
    }));

    const pos = useRef<[number, number, number]>([0, 0, 0]);
    const vel = useRef<[number, number, number]>([0, 0, 0]);

    const setPlayerPosition = useStore((state) => state.setPlayerPosition);

    useEffect(() => {
        const unsubscribePosition = api.position.subscribe((p) => {
            pos.current = p;
            // Update position in the store.
            setPlayerPosition(p);
        });
        const unsubscribeVelocity = api.velocity.subscribe((v) => { vel.current = v; });
        return () => {
            unsubscribePosition();
            unsubscribeVelocity();
        };
    }, [api.position, api.velocity, setPlayerPosition]);

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1] + CAMERA_HEIGHT_OFFSET, pos.current[2]));
        const direction = new Vector3();
        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(CHARACTER_SPEED).applyEuler(camera.rotation);
        api.velocity.set(direction.x, vel.current[1], direction.z);
        if (jump && Math.abs(vel.current[1]) < 0.05) api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2]);
    });

    return <mesh ref={ref as React.Ref<Mesh>} />;
};