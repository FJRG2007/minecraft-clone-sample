import create from "zustand";
import { nanoid } from "nanoid";

interface Cube {
    id: string;
    pos: [number, number, number];
    texture: string;
}

interface StoreState {
    texture: string;
    cubes: Cube[];
    playerPosition: [number, number, number];
    setPlayerPosition: (position: [number, number, number]) => void;
    addCube: (x: number, y: number, z: number) => void;
    removeCube: (id: string) => void;
    setTexture: (texture: string) => void;
    saveWorld: () => void;
    resetWorld: () => void;
}

export const useStore = create<StoreState>((set) => ({
    texture: "dirt",
    cubes: [
        {
            id: nanoid(),
            pos: [1, 1, 1],
            texture: "dirt"
        },
        {
            id: nanoid(),
            pos: [1, 5, 1],
            texture: "log"
        }
    ],

    playerPosition: [0, 0, 0],
    setPlayerPosition: (position) => set(() => ({ playerPosition: position })),

    /**
     * Adds a new cube to the world at the given position (x, y, z).
     * @param {number} x - The x position of the cube.
     * @param {number} y - The y position of the cube.
     * @param {number} z - The z position of the cube.
     */
    addCube: (x: number, y: number, z: number) => {
        set((state) => ({
            cubes: [
                ...state.cubes,
                {
                    id: nanoid(),
                    texture: state.texture,
                    pos: [x, y, z]
                }
            ]
        }));
    },

    /**
     * Removes a cube from the world by id.
     * @param {string} id - The id of the cube to be removed.
     */
    removeCube: (id: string) => {
        set((state) => ({
            cubes: state.cubes.filter((cube) => cube.id !== id)
        }));
    },

    /**
     * Sets the current texture to be used when adding new cubes.
     * @param {string} texture - The texture to be used.
     */
    setTexture: (texture: string) => set(() => ({ texture })),
    saveWorld: () => { },
    resetWorld: () => { }
}));