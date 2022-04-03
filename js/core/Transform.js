import { Rotator } from "./Rotator.js";
import { Vector2 } from "./Vector2.js";
export class Transform {
    constructor(position = new Vector2(), rotation = new Rotator(), scale = new Vector2(1, 1)) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    clone() {
        return new Transform(this.position.clone(), this.rotation.clone(), this.scale.clone());
    }
}
