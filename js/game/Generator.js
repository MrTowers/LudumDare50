import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { rand } from "../core/funcs/rand.js";
import { Game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { Vector2 } from "../core/Vector2.js";
import { canvas, delta } from "../main.js";
import { OB_Hammer } from "./obstacles/OB_Hammer.js";
import { ComboUp } from "./pickups/ComboUp.js";
import { Timeoid } from "./pickups/Timeoid.js";
export class Generator extends GameObject {
    constructor() {
        super();
        this.tag = "generator";
        this.addComponent(new Generator.Script());
    }
}
Generator.Script = class extends Component {
    constructor() {
        super();
        this.time = 0;
        this.tag = "script";
        this.player = getObjectByTag("player");
    }
    update() {
        this.time += delta / 1000;
        let plpos = this.player.getPosition();
        //console.log(this.time);
        if (this.time > 0.25) {
            Game.spawnGameObject(new OB_Hammer(), new Vector2(rand(-canvas.width, canvas.width), plpos.y - 1000));
            if (Math.random() < 0.1) {
                Game.spawnGameObject(new Timeoid(), new Vector2(rand(-canvas.width, canvas.width), plpos.y - 1000));
            }
            if (Math.random() < 0.05) {
                Game.spawnGameObject(new ComboUp(), new Vector2(rand(-canvas.width, canvas.width), plpos.y - 1000));
            }
            this.time = 0;
        }
    }
};
