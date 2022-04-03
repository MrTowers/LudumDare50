import { collisionObjects, OBJECTS } from "../main.js";
import { Vector2 } from "./Vector2.js";
export class Game {
    static spawnGameObject(obj, position = new Vector2()) {
        OBJECTS.push(obj);
        obj.setPosition(position);
        obj.onstart();
    }
    static destroyGameObject(obj) {
        OBJECTS.splice(OBJECTS.indexOf(obj), 1);
        if (collisionObjects.includes(obj)) {
            collisionObjects.splice(collisionObjects.indexOf(obj), 1);
        }
    }
    static enableCollision(obj) {
        collisionObjects.push(obj);
    }
}
