import { Component } from "../../core/Component.js";
import { getScreenPosition } from "../../core/funcs/getScreenPosition.js";
import { Game } from "../../core/Game.js";
import { GameObject } from "../../core/GameObject.js";
import { Sprite } from "../../core/Sprite.js";
import { Vector2 } from "../../core/Vector2.js";
import { canvas } from "../../main.js";

export class Rainer extends GameObject {
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
        this.tag = "rainer";
        let s = Sprite.from("rainer");
        this.addComponent(s);
        this.setScale(new Vector2(0.2, 0.2));
        this.addComponent(new Rainer.Script());
        Game.enableCollision(this);
    }
}