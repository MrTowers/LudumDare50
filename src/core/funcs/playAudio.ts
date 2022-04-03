import { AUDIOSRC } from "../../main.js";

export function playAudio (name: string, volume = 1) {
    let audio = new Audio(AUDIOSRC[name]);
    audio.volume = volume;
    audio.play();
}