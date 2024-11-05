import * as images from "../images/images";
import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";

/**
 * Component for selecting textures.
 * This component allows the user to select a texture from a list of options.
 * The selected texture is displayed visually with an image.
 */
export const TextureSelector = () => {
    const [visible, setVisible] = useState(true);
    const [texture, setTexture] = useStore(state => [state.texture, state.setTexture]);
    const { dirt, grass, glass, wood, log } = useKeyboard(false);
    useEffect(() => {
        const visibilityTimeout = setTimeout(() => setVisible(false), 1000);
        setVisible(true);
        return () => clearTimeout(visibilityTimeout);
    }, [texture]);

    useEffect(() => {
        const options = { dirt, grass, glass, wood, log };
        const selectedTexture = Object.entries(options).find(([_, isEnabled]) => isEnabled);
        if (selectedTexture) setTexture(selectedTexture[0]);
    }, [dirt, grass, glass, wood, log, setTexture]);

    return (
        <div className={`texture-selector ${visible ? "visible" : ""}`}>
            {Object.entries(images).map(([imgKey, img]) => (
                <img
                    className={texture === imgKey.replace("Img", "") ? "selected" : ""}
                    key={imgKey}
                    src={img}
                    alt={imgKey.replace("Img", "")}
                />
            ))}
        </div>
    );
};