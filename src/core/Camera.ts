import { delta, MAINCAMERA } from "../main.js";
import { Vector2 } from "./Vector2.js";

export class Camera {
    position: Vector2;
    offset: Vector2;
    shake: number = 5;

    constructor () {
        this.position = new Vector2();
        this.offset = new Vector2();
    }

    update () {
        if (this.shake > 0) {
            this.shake -= delta / 100;
        }
        else {
            this.shake = 0;
        }
    }

    static getPosition () : Vector2 {
        return MAINCAMERA.position.clone().add(new Vector2((Math.random() * 2) - 1, (Math.random() * 2) - 1).mulByNumber(MAINCAMERA.shake));
    }

    static setPosition (position: Vector2) {
        MAINCAMERA.position = position;
    }

    static addPosition (position: Vector2) {
        MAINCAMERA.position = MAINCAMERA.position.add(position);
    }

    static shake (n: number) {
        MAINCAMERA.shake = n;
    }
}