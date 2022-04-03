import { delta, MAINCAMERA } from "../main.js";
import { Vector2 } from "./Vector2.js";
export class Camera {
    constructor() {
        this.shake = 5;
        this.position = new Vector2();
        this.offset = new Vector2();
    }
    update() {
        if (this.shake > 0) {
            this.shake -= delta / 100;
        }
        else {
            this.shake = 0;
        }
    }
    static getPosition() {
        return MAINCAMERA.position.clone().add(new Vector2((Math.random() * 2) - 1, (Math.random() * 2) - 1).mulByNumber(MAINCAMERA.shake));
    }
    static setPosition(position) {
        MAINCAMERA.position = position;
    }
    static addPosition(position) {
        MAINCAMERA.position = MAINCAMERA.position.add(position);
    }
    static shake(n) {
        MAINCAMERA.shake = n;
    }
}
