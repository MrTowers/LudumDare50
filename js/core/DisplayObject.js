import { canvas } from "../main.js";
import { Camera } from "./Camera.js";
import { Component } from "./Component.js";
import { Vector2 } from "./Vector2.js";
export class DisplayObject extends Component {
    constructor() {
        super();
    }
    getRenderPosition() {
        return this.gameObject?.transform.position.clone().add(new Vector2(canvas.width / 2, canvas.height / 2).add(Camera.getPosition().mulByNumber(-1)));
    }
    getRenderScale() {
        return this.gameObject?.transform.scale.clone();
    }
    getRenderRotation() {
        return this.gameObject?.transform.rotation.clone();
    }
}
