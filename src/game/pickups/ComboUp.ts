import { Component } from "../../core/Component.js";
import { getScreenPosition } from "../../core/funcs/getScreenPosition.js";
import { Game } from "../../core/Game.js";
import { GameObject } from "../../core/GameObject.js";
import { Sprite } from "../../core/Sprite.js";
import { Vector2 } from "../../core/Vector2.js";
import { canvas } from "../../main.js";

export class ComboUp extends GameObject {
    static Script = class extends Component {
        constructor () {
            super();
            this.tag = "script";
        }

        update(): void {
            if (getScreenPosition(this.gameObject!).y > canvas.height + 100) {
                this.gameObject?.destroy();
            }
        }
    }
    constructor () {
        super();
        this.tag = "combo";
        let s = Sprite.from("combo");
        this.addComponent(s);
        this.setScale(new Vector2(0.1, 0.1));
        this.addComponent(new ComboUp.Script());
        Game.enableCollision(this);
    }
}