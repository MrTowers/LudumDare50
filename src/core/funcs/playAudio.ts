import { AUDIOSRC } from "../../main.js";

export function playAudio (name: string) {
    let audio = new Audio(AUDIOSRC[name]);
    audio.play();
}