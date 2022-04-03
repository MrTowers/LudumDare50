import { collisionObjects, OBJECTS, restartScene } from "../main.js";
import { GameObject } from "./GameObject.js";
import { Vector2 } from "./Vector2.js";

export class Game {
    static spawnGameObject (obj: GameObject, position = new Vector2()) {
        OBJECTS.push(obj);
        obj.setPosition(position);
        obj.onstart();
    }

    static destroyGameObject (obj: GameObject) {
        OBJECTS.splice(OBJECTS.indexOf(obj), 1);
        if (collisionObjects.includes(obj)) {
            collisionObjects.splice(collisionObjects.indexOf(obj), 1);
        }
    }

    static enableCollision (obj: GameObject) {
        collisionObjects.push(obj);
    }
}