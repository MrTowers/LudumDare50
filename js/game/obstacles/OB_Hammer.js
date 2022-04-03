import { Component } from "../../core/Component.js";
import { clamp } from "../../core/funcs/clamp.js";
import { getScreenPosition } from "../../core/funcs/getScreenPosition.js";
import { rand } from "../../core/funcs/rand.js";
import { Game } from "../../core/Game.js";
import { GameObject } from "../../core/GameObject.js";
import { Sprite } from "../../core/Sprite.js";
import { Vector2 } from "../../core/Vector2.js";
import { canvas, delta } from "../../main.js";
export class OB_Hammer extends GameObject {
    constructor() {
        super();
        this.tag = "obstacle";
        this.addComponent(Sprite.from("rect"));
        this.setScale(new Vector2(0.1, 0.1));
        this.addComponent(new OB_Hammer.Script());
        Game.enableCollision(this);
    }
}
OB_Hammer.Script = class extends Component {
    constructor() {
        super();
        this.tag = "scirpt";
        this.desiredPos = new Vector2();
        this.time = 0;
    }
    update() {
        let pos = getScreenPosition(this.gameObject);
        if (pos.y > canvas.height) {
            this.gameObject?.destroy();
        }
        this.time += delta / 1000;
        if (this.time >= 2) {
            this.time = 0;
            this.desiredPos.x = rand(-canvas.width / 2, canvas.width / 2);
        }
        this.gameObject.transform.position.x += clamp((this.desiredPos.x - this.gameObject.transform.position.x), -50, 50) * (delta / 10);
    }
};
