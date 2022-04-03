import { canvas, MAINCAMERA } from "../main.js";
import { Camera } from "./Camera.js";
import { Component } from "./Component.js";
import { Rotator } from "./Rotator.js";
import { Vector2 } from "./Vector2.js";

export class DisplayObject extends Component {
    constructor () {
        super();
    }

    protected getRenderPosition () : Vector2 {
        return this.gameObject?.transform.position.clone().add(new Vector2(canvas.width / 2, canvas.height / 2).add(Camera.getPosition().mulByNumber(-1)))!;
    }

    protected getRenderScale () : Vector2 {
        return this.gameObject?.transform.scale.clone()!;
    }

    protected getRenderRotation () : Rotator {
        return this.gameObject?.transform.rotation.clone()!;
    }
}