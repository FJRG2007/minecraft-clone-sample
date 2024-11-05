import { grassImg, dirtImg, logImg, glassImg, woodImg } from "./images";
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";

/**
 * Loads a texture from the given image URL and sets its magFilter to NearestFilter.
 * @param {string} image - The URL of the image to load.
 * @returns {Texture} The loaded texture.
 */
const loadTexture = (image: string): Texture => {
    const texture = new TextureLoader().load(image);
    texture.magFilter = NearestFilter;
    return texture;
};

const grassTexture = loadTexture(grassImg);
const dirtTexture = loadTexture(dirtImg);
const logTexture = loadTexture(logImg);
const glassTexture = loadTexture(glassImg);
const woodTexture = loadTexture(woodImg);
const groundTexture = loadTexture(grassImg);
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export { groundTexture, grassTexture, dirtTexture, logTexture, glassTexture, woodTexture };