import { Rotator } from "./Rotator.js";
import { Vector2 } from "./Vector2.js";

export class Transform {
    position: Vector2;
    rotation: Rotator;
    scale: Vector2;

    constructor (position = new Vector2(), rotation = new Rotator(), scale = new Vector2(1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    clone () : Transform {
        return new Transform(this.position.clone(), this.rotation.clone(), this.scale.clone());
    }
}