import { Mesh, Vector3Tuple } from "three";
import { useBox } from "@react-three/cannon";

// Tipado de las props
interface BarrierProps {
    position: Vector3Tuple;  // Un array de tres números para la posición [x, y, z].
    size: Vector3Tuple;      // Un array de tres números para el tamaño [width, height, depth].
}

// Componente de barrera invisible
export const InvisibleBarrier = ({ position, size }: BarrierProps) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
        args: size
    }));

    return (
        <mesh ref={ref as React.Ref<Mesh>}>
            <boxBufferGeometry args={size} />
            <meshBasicMaterial color="transparent" opacity={0} transparent />
        </mesh>
    );
};