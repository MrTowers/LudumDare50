import { AUDIOSRC, TEXTURES } from "../main.js";

export class Load {
    static image (src: string, name: string) {
        return new Promise((res, rej) => {
            let image = new Image();
            let loaded = false;
            image.addEventListener("load", () => {
                TEXTURES[name] = image;
                loaded = true;
                console.log(`Loaded image ${src}`);
                res(null);
            });
            image.src = src;
            setTimeout(() => {
                if (!loaded) {
                    console.error(`Failed to load image ${src}`);
                    rej("Failed to load");
                }
            }, 5000);
        });
    }

    static audio (src: string, name: string) {
        return new Promise((res, rej) => {
            let audio = new Audio();
            audio.addEventListener("load", () => {
                AUDIOSRC[name] = src;
                console.log(`Loaded audio ${src}`);
                res(null);
            });
            audio.src = src;
        });
    }
}