import { Game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { Sprite } from "../core/Sprite.js";
import { Vector2 } from "../core/Vector2.js";
import { PlayerScript } from "./Player.Script.js";
import { PowerProgress } from "./PowerProgress.js";
export class Player extends GameObject {
    constructor() {
        super();
        this.tag = "player";
        let s = Sprite.from("player");
        this.setScale(new Vector2(0.1, 0.1));
        this.addComponent(s);
        let pp = new PowerProgress();
        this.script = new PlayerScript(pp);
        this.addComponent(this.script);
        this.addComponent(pp);
        Game.enableCollision(this);
    }
    addPower(n) {
        if (this.script.power + n < 1) {
            this.script.power += n;
        }
        else {
            this.script.power = 1;
        }
    }
}
