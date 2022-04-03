import { Component } from "../../core/Component.js";
import { getScreenPosition } from "../../core/funcs/getScreenPosition.js";
import { Game } from "../../core/Game.js";
import { GameObject } from "../../core/GameObject.js";
import { Sprite } from "../../core/Sprite.js";
import { Vector2 } from "../../core/Vector2.js";
import { canvas } from "../../main.js";

export class OB_Static extends GameObject {
    static Script = class extends Component {
        constructor () {
            super();
            this.tag = "scirpt";
        }

        update(): void {
            let pos = getScreenPosition(this.gameObject!);
            if (pos.y > canvas.height) {
                this.gameObject?.destroy();
            }
        }
    }
    constructor () {
        super();
        this.tag = "obstacle";
        this.addComponent(Sprite.from("rect"));
        this.setScale(new Vector2(0.1, 0.1));
        this.addComponent(new OB_Static.Script());
        Game.enableCollision(this);
    }
}