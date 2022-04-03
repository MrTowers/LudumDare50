import { canvas } from "../../main.js";
import { Camera } from "../Camera.js";
import { GameObject } from "../GameObject.js";
import { Vector2 } from "../Vector2.js";

export function getScreenPosition (object: GameObject) : Vector2 {
    return object.transform.position.clone().add(new Vector2(canvas.width / 2, canvas.height / 2).add(Camera.getPosition().mulByNumber(-1)))!;
}