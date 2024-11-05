import { useEffect, useState } from "react";

type Action = "moveForward" | "moveBackward" | "moveLeft" | "moveRight" | "jump" | "dirt" | "grass" | "glass" | "wood" | "log";

const ACTIONS_KEYBOARD_MAP: { [key: string]: Action; } = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log"
};

interface ActionsState {
    moveForward: boolean;
    moveBackward: boolean;
    moveLeft: boolean;
    moveRight: boolean;
    jump: boolean;
    dirt: boolean;
    grass: boolean;
    glass: boolean;
    wood: boolean;
    log: boolean;
}

/**
 * Hook that tracks the state of the user's keyboard.
 *
 * @returns An object with boolean properties for each action that can be
 * performed by the user. The properties are:
 *   - moveForward
 *   - moveBackward
 *   - moveLeft
 *   - moveRight
 *   - jump
 *   - dirt
 *   - grass
 *   - glass
 *   - wood
 *   - log
 *
 * The properties are initially set to false, and are updated to true
 * when the user presses the corresponding key, and to false when the
 * user releases the key.
 */
export const useKeyboard = (isInputFocused: boolean): ActionsState => {
    const [actions, setActions] = useState<ActionsState>({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false
    });

    useEffect(() => {

        /**
         * Handles the keydown event by setting the corresponding action state
         * to true.
         *
         * @param {KeyboardEvent} event - The event that triggered this function.
         */
        const handleKeyDown = (event: KeyboardEvent) => {
            const action = ACTIONS_KEYBOARD_MAP[event.code];
            if (document.activeElement instanceof HTMLInputElement) return;
            if (action) {
                setActions((prevActions) => ({
                    ...prevActions,
                    [action]: true
                }));
            }
        };
        /**
         * Handles the keyup event, setting the corresponding action to false
         * in the state.
         *
         * @param {KeyboardEvent} event - The keyup event.
         */
        const handleKeyUp = (event: KeyboardEvent) => {
            if (document.activeElement instanceof HTMLInputElement) return;
            const action = ACTIONS_KEYBOARD_MAP[event.code];
            if (action) setActions((prevActions) => ({ ...prevActions, [action]: false }));
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [isInputFocused]);

    return actions;
};