import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

/**
 * Function component for handling First Person View (FPV).
 * 
 * This component utilizes PointerLockControls to control the camera view.
 * 
 * @returns {JSX.Element} The FPV component.
 */
export function FPV() {
    const { camera, gl } = useThree();
    return (<PointerLockControls args={[camera, gl.domElement]} />);
};